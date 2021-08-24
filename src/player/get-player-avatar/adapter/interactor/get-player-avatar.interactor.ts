import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { GetPlayerAvatarCommand } from '../../domain/command/get-player-avatar.command';
import { GetPlayerAvatarErrors } from '../../domain/value-object/get-player-avatar.errors';
import { GetPlayerAvatarRepository } from '../interface/get-player-avatar.repository';
import { GetPlayerAvatarInteractorRequest } from './get-player-avatar.interactor.request';
import { GetPlayerAvatarInteractorResponse } from './get-player-avatar.interactor.response';

@Injectable()
export class GetPlayerAvatarInteractor {
  constructor(private readonly repository: GetPlayerAvatarRepository) {}

  async invoke(
    request: GetPlayerAvatarInteractorRequest,
  ): Promise<GetPlayerAvatarInteractorResponse> {
    const user = await this.repository.getAvatarByUserId(request.userId.val);

    const errors = new GetPlayerAvatarErrors();
    const cmd = GetPlayerAvatarCommand.new(user, errors);
    if (cmd === null) throw new ValidationException(errors);

    return new GetPlayerAvatarInteractorResponse(cmd.avatar);
  }
}
