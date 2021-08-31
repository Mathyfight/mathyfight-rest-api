import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { EditEnemyCommand } from '../../domain/command/edit-enemy.command';
import { EditEnemyErrors } from '../../domain/value-object/edit-enemy.errors';
import { EditEnemyRepository } from '../interface/edit-enemy.repository';
import { EditEnemyInteractorRequest } from './edit-enemy.interactor.request';
import { EditEnemyInteractorResponse } from './edit-enemy.interactor.response';

@Injectable()
export class EditEnemyInteractor {
  constructor(
    private readonly repository: EditEnemyRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(
    request: EditEnemyInteractorRequest,
  ): Promise<EditEnemyInteractorResponse> {
    const user = await this.repository.getUserById(request.userId.val);
    const errors = new EditEnemyErrors();

    const command = EditEnemyCommand.new(
      user,
      request.enemyId.val,
      request.name?.val,
      request.image?.val,
      errors,
    );

    if (command === null) throw new ValidationException(errors);

    const enemyImageUrl =
      command.image !== undefined
        ? await this.storageService.uploadFile(
            command.imageName!,
            command.image,
          )
        : undefined;
    await this.repository.editEnemy(command, enemyImageUrl);
    return new EditEnemyInteractorResponse(enemyImageUrl);
  }
}
