import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { GetPlayerStatisticsCommand } from '../../domain/command/get-player-statistics.command';
import { GetPlayerStatisticsErrors } from '../../domain/value-object/get-player-statistics.errors';
import { GetPlayerStatisticsRepository } from '../interface/get-player-statistics.repository';
import { GetPlayerStatisticsInteractorRequest } from './get-player-statistics.interactor.request';
import { GetPlayerStatisticsInteractorResponse } from './get-player-statistics.interactor.response';

@Injectable()
export class GetPlayerStatisticsInteractor {
  constructor(private readonly repository: GetPlayerStatisticsRepository) {}

  async invoke(
    request: GetPlayerStatisticsInteractorRequest,
  ): Promise<GetPlayerStatisticsInteractorResponse> {
    const user = await this.repository.getUserById(request.userId.val);

    const errors = new GetPlayerStatisticsErrors();
    const cmd = GetPlayerStatisticsCommand.new(user, errors);
    if (cmd === null) throw new ValidationException(errors);

    const battleStats = await this.repository.getBattleStatistics(cmd.user.id);
    const battleMathProblemStats =
      await this.repository.getBattleMathProblemStatistics(cmd.user.id);
    const battleMathProblemAreaStats =
      await this.repository.getBattleMathProblemByMathAreaStatistics(
        cmd.user.id,
      );
    const battleMathProblemTopicStats =
      await this.repository.getBattleMathProblemByMathTopicStatistics(
        cmd.user.id,
      );

    return new GetPlayerStatisticsInteractorResponse(
      battleStats,
      battleMathProblemStats,
      battleMathProblemAreaStats,
      battleMathProblemTopicStats,
    );
  }
}
