import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminAddMathTopicCommand } from '../../domain/command/admin-add-math-topic.command';
import { AdminAddMathTopicErrors } from '../../domain/value-object/admin-add-math-topic.errors';
import { AdminAddMathTopicRepository } from '../interface/admin-add-math-topic.repository';
import { AdminAddMathTopicInteractorRequest } from './admin-add-math-topic.interactor.request';
import { AdminAddMathTopicInteractorResponse } from './admin-add-math-topic.interactor.response';

@Injectable()
export class AdminAddMathTopicInteractor {
  constructor(
    private readonly repository: AdminAddMathTopicRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(
    request: AdminAddMathTopicInteractorRequest,
  ): Promise<AdminAddMathTopicInteractorResponse> {
    const user = await this.repository.getUserById(request.userId.val);
    const mathArea = await this.repository.getMathAreaById(
      request.mathAreaId.val,
    );
    const levels = await this.repository.getAllLevels();
    const players = await this.repository.getAllPlayers();
    const unusedEnemies = await this.repository.getUnusedEnemies();

    const errors = new AdminAddMathTopicErrors();
    const cmd = AdminAddMathTopicCommand.new(
      user,
      mathArea,
      request.name.val,
      request.description.val,
      request.image,
      request.enemyIds,
      unusedEnemies,
      levels,
      players,
      errors,
    );
    if (cmd === null) throw new ValidationException(errors);

    await this.storageService.uploadFile(
      cmd.uploadMathTopicImage.imageName,
      cmd.uploadMathTopicImage.image,
    );
    await this.repository.persistMathTopic(cmd.persistMathTopic);

    return new AdminAddMathTopicInteractorResponse(
      cmd.persistMathTopic.id,
      cmd.persistMathTopic.imageUrl,
    );
  }
}
