import { Controller, Request, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminDeleteMathProblemInteractor } from '../adapter/interactor/admin-delete-math-problem.interactor';
import { AdminDeleteMathProblemInteractorRequest } from '../adapter/interactor/admin-delete-math-problem.interactor.request';
import { AdminMathProblemDeleteRouteErrors } from './admin-math-problem-delete.route.errors';
import { AdminMathProblemDeleteRouteParams } from './admin-math-problem-delete.route.params';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.problem')
@Controller()
export class AdminMathProblemDeleteRoute {
  constructor(readonly interactor: AdminDeleteMathProblemInteractor) {}

  @Delete('admin/math/problems/:mathProblemId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: AdminMathProblemDeleteRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param() params: AdminMathProblemDeleteRouteParams,
  ): Promise<void> {
    const intReq = AdminDeleteMathProblemInteractorRequest.parse(
      request.user.userId,
      params.mathProblemId,
    );
    await this.interactor.invoke(intReq);
  }
}
