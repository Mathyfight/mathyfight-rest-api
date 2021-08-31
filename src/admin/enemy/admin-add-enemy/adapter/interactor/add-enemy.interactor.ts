import { BadRequestException, Injectable } from '@nestjs/common';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { AddEnemyCommand } from '../../domain/command/add-enemy.command';
import { AddEnemyErrors } from '../../domain/value-object/add-enemy.errors';
import { AddEnemyRepository } from '../interface/add-enemy.repository';
import { AddEnemyInteractorRequest } from './add-enemy.interactor.request';
import { AddEnemyInteractorResponse } from './add-enemy.interactor.response';

@Injectable()
export class AddEnemyInteractor {
  constructor(
    private readonly addEnemyRepository: AddEnemyRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(
    request: AddEnemyInteractorRequest,
  ): Promise<AddEnemyInteractorResponse> {
    const user = await this.addEnemyRepository.getUserById(request.userId.val);
    const errors = new AddEnemyErrors();

    const command = AddEnemyCommand.new(
      user,
      request.name.val,
      request.image.val,
      errors,
    );

    if (command === null) {
      throw new BadRequestException({ errors: errors });
    }

    const imageUrl = await this.storageService.uploadFile(
      command.imageName,
      command.image,
    );
    await this.addEnemyRepository.addEnemy(command, imageUrl);

    return new AddEnemyInteractorResponse(command.id, imageUrl);
  }
}
