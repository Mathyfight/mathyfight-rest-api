import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { AdminGetMathAreasCommand } from '../../domain/command/admin-get-math-areas.command';
import { AdminGetMathAreasErrors } from '../../domain/value-object/admin-get-math-areas.errors';
import { AdminGetMathAreasRepository } from '../interface/admin-get-math-areas.repository';
import { AdminGetMathAreasInteractorRequest } from './admin-get-math-areas.interactor.request';
import {
  AdminGetMathAreasInteractorResponse,
  AdminGetMathAreasTopicInteractorResponse,
} from './admin-get-math-areas.interactor.response';

@Injectable()
export class AdminGetMathAreasInteractor {
  constructor(private readonly repository: AdminGetMathAreasRepository) {}

  async invoke(
    request: AdminGetMathAreasInteractorRequest,
  ): Promise<AdminGetMathAreasInteractorResponse[]> {
    const user = await this.repository.getUserById(request.userId.val);

    const errors = new AdminGetMathAreasErrors();
    const cmd = AdminGetMathAreasCommand.new(user, errors);
    if (cmd === null) throw new ValidationException(errors);

    const mathAreas = await this.repository.getMathAreas();
    return mathAreas.map(
      (ma) =>
        new AdminGetMathAreasInteractorResponse(
          ma.id,
          ma.name,
          ma.mathTopics.map(
            (mt) =>
              new AdminGetMathAreasTopicInteractorResponse(
                mt.id,
                mt.name,
                mt.imageUrl,
              ),
          ),
        ),
    );
  }
}
