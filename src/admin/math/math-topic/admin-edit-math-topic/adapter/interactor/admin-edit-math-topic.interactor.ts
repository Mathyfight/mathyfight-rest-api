import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { getFileNameFromUrl } from 'src/shared/domain/value-object/util/util';
import { AdminEditMathTopicCommand } from '../../domain/command/admin-edit-math-topic.command';
import { AdminEditMathTopicErrors } from '../../domain/value-object/admin-edit-math-topic.errors';
import { AdminEditMathTopicRepository } from '../interface/admin-edit-math-topic.repository';
import { AdminEditMathTopicInteratorRequest } from './admin-edit-math-topic.interactor.request';
import { AdminEditMathTopicInteratorResponse } from './admin-edit-math-topic.interactor.response';

@Injectable()
export class AdminEditMathTopicInterator {
  constructor(
    private readonly repository: AdminEditMathTopicRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(
    req: AdminEditMathTopicInteratorRequest,
  ): Promise<AdminEditMathTopicInteratorResponse> {
    const user = await this.repository.getUserById(req.userId.val);
    const mathTopic = await this.repository.getMathTopicById(
      req.mathTopicId.val,
    );
    const mathArea =
      req.mathAreaId === undefined
        ? undefined
        : await this.repository.getMathAreaById(req.mathAreaId.val);
    const enemies =
      req.enemyIds === undefined
        ? undefined
        : await this.repository.getEnemies(req.enemyIds, req.mathTopicId.val);

    const errors = new AdminEditMathTopicErrors();
    const cmd = AdminEditMathTopicCommand.new(
      user,
      mathTopic,
      errors,
      mathArea,
      enemies,
      req.name?.val,
      req.description?.val,
      req.image,
    );
    if (cmd === null) throw new ValidationException(errors);

    if (cmd.uploadImage !== undefined) {
      const oldImageUrl = await this.repository.getImageUrlFromMathTopic(
        cmd.persistMathTopic.id,
      );
      const oldImageName = getFileNameFromUrl(oldImageUrl!);
      await this.storageService.deleteFile(oldImageName);
      await this.storageService.uploadFile(
        cmd.uploadImage.imageName,
        cmd.uploadImage.image,
      );
    }
    await this.repository.persistMathTopic(cmd.persistMathTopic);

    return new AdminEditMathTopicInteratorResponse(
      cmd.persistMathTopic.imageUrl === undefined
        ? null
        : cmd.persistMathTopic.imageUrl,
    );
  }
}
