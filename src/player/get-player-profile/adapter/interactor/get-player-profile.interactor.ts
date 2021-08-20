import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { GetPlayerProfileCommand } from '../../domain/command/get-player-profile.command';
import { GetPlayerProfileErrors } from '../../domain/value-object/get-player-profile.errors';
import { GetPlayerProfileRepository } from '../interface/get-player-profile.repository';
import { GetPlayerProfileInteractorRequest } from './get-player-profile.interactor.request';
import { GetPlayerProfileInteractorResponse } from './get-player-profile.interactor.response';

@Injectable()
export class GetPlayerProfileInteractor {
  constructor(private readonly repository: GetPlayerProfileRepository) {}

  async invoke(
    request: GetPlayerProfileInteractorRequest,
  ): Promise<GetPlayerProfileInteractorResponse> {
    const errors = new GetPlayerProfileErrors();
    const user = await this.repository.getUserById(request.userId.val);

    const cmd = GetPlayerProfileCommand.new(user, errors);
    if (cmd === null) throw new ValidationException(errors);

    return new GetPlayerProfileInteractorResponse(
      cmd.user.username,
      cmd.user.email,
    );
  }
}
