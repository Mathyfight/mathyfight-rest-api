import {
  Body,
  Request,
  Controller,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { AdminEditMathProblemInteractor } from '../adapter/interactor/admin-edit-math-problem.interactor';
import { AdminEditMathProblemInteractorRequest } from '../adapter/interactor/admin-edit-math-problem.interactor.request';
import { AdminMathProblemEditRouteBody } from './admin-math-problem-edit.route.body';
import { AdminMathProblemEditRouteErrors } from './admin-math-problem-edit.route.errors';
import { AdminMathProblemEditRouteParams } from './admin-math-problem-edit.route.params';
import { AdminMathProblemEditRouteResponse } from './admin-math-problem-edit.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.problem')
@Controller()
export class AdminMathProblemEditRoute {
  constructor(readonly interactor: AdminEditMathProblemInteractor) {}

  @Patch('admin/math/problems/:mathProblemId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminMathProblemEditRouteResponse })
  @ApiResponse({ status: 400, type: AdminMathProblemEditRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @UploadedFile() image: Express.Multer.File | undefined,
    @Body() body: AdminMathProblemEditRouteBody,
    @Param() params: AdminMathProblemEditRouteParams,
  ): Promise<AdminMathProblemEditRouteResponse> {
    const interactorRequest = AdminEditMathProblemInteractorRequest.parse(
      params.mathProblemId,
      request.user.userId,
      body.difficultyId,
      body.description,
      image,
      body.mathAnswersId,
      body.mathAnswersDescription,
      body.mathAnswersIsCorrect,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new AdminMathProblemEditRouteResponse(interactorResponse);
  }
}
