import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { UpdatePlayerAvatarCommand } from '../../domain/command/update-player-avatar.command';
import { UpdatePlayerAvatarErrors } from '../../domain/value-object/update-player-avatar.errors';
import { UpdatePlayerAvatarRepository } from '../interface/update-player-avatar.repository';
import { UpdatePlayerAvatarInteractorRequest } from './update-player-avatar.interactor.request';

@Injectable()
export class UpdatePlayerAvatarInteractor {
  constructor(private readonly repository: UpdatePlayerAvatarRepository) {}

  async invoke(request: UpdatePlayerAvatarInteractorRequest): Promise<void> {
    const user = await this.repository.getUserById(request.userId.val);
    const race =
      request.raceId === undefined
        ? undefined
        : await this.repository.getRaceById(request.raceId.val);

    const errors = new UpdatePlayerAvatarErrors();
    const cmd = UpdatePlayerAvatarCommand.new(
      user,
      race,
      request.color === undefined ? undefined : request.color.val,
      errors,
    );
    if (cmd === null) throw new ValidationException(errors);

    await this.repository.updatePlayerAvatar(cmd);
  }
}
