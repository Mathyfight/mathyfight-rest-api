import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteEnemyCommand } from '../../domain/command/delete-enemy.command';
import { DeleteEnemyErrors } from '../../domain/value-object/delete-enemy.errors';
import { DeleteEnemyRespository } from '../interface/delete-enemy.respository';
import { DeleteEnemyInteractorRequest } from './delete-enemy.interactor.request';

@Injectable()
export class DeleteEnemyInteractor {
  constructor(private repository: DeleteEnemyRespository) {}

  async invoke(request: DeleteEnemyInteractorRequest): Promise<void> {
    const user = await this.repository.getUserById(request.userId.val);
    const mathTopicLevel = await this.repository.getMathTopicLevel(
      request.enemyId.val,
    );

    const errors = new DeleteEnemyErrors();

    const command = DeleteEnemyCommand.new(
      user,
      mathTopicLevel,
      request.enemyId.val,
      errors,
    );

    if (command === null) {
      throw new BadRequestException({ errors: errors });
    }

    await this.repository.deleteEnemy(command);
    return;
  }
}
