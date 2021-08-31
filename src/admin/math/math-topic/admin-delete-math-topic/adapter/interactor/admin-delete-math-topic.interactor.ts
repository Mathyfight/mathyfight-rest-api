import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/shared/adapter/interface/storage.service';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { getFileNameFromUrl } from 'src/shared/domain/value-object/util/util';
import { AdminDeleteMathTopicCommand } from '../../domain/command/admin-delete-math-topic.command';
import { AdminDeleteMathTopicErrors } from '../../domain/value-object/admin-delete-math-topic.errors';
import { AdminDeleteMathTopicRepository } from '../interface/admin-delete-math-topic.repository';
import { AdminDeleteMathTopicInteractorRequest } from './admin-delete-math-topic.interactor.request';

@Injectable()
export class AdminDeleteMathTopicInteractor {
  constructor(
    private readonly repository: AdminDeleteMathTopicRepository,
    private readonly storageService: StorageService,
  ) {}

  async invoke(request: AdminDeleteMathTopicInteractorRequest): Promise<void> {
    const user = await this.repository.getUserById(request.userId.val);
    const mathTopic = await this.repository.getMathTopicById(
      request.mathTopicId.val,
    );

    const errors = new AdminDeleteMathTopicErrors();
    const cmd = AdminDeleteMathTopicCommand.new(user, mathTopic, errors);
    if (cmd === null) throw new ValidationException(errors);

    await this.storageService.deleteFile(
      getFileNameFromUrl(cmd.mathTopic.imageUrl),
    );
    await this.repository.deleteMathTopic(cmd);
  }
}
