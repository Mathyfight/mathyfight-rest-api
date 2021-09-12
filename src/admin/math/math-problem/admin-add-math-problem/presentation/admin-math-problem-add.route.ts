import {
  Controller,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
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
import { AdminAddMathProblemInteractor } from '../adapter/interactor/admin-add-math-problem.interactor';
import { AdminAddMathProblemInteractorRequest } from '../adapter/interactor/admin-add-math-problem.interactor.request';
import { AdminMathProblemAddRouteBody } from './admin-math-problem-add.route.body';
import { AdminMathProblemAddRouteErrors } from './admin-math-problem-add.route.errors';
import { AdminMathProblemAddRouteResponse } from './admin-math-problem-add.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.problem')
@Controller()
export class AdminMathProblemAddRoute {
  constructor(readonly interactor: AdminAddMathProblemInteractor) {}

  @Post('admin/math/problems')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 201, type: AdminMathProblemAddRouteResponse })
  @ApiResponse({ status: 400, type: AdminMathProblemAddRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @UploadedFile() image: Express.Multer.File | undefined,
    @Body() body: AdminMathProblemAddRouteBody,
  ): Promise<AdminMathProblemAddRouteResponse> {
    const interactorRequest = AdminAddMathProblemInteractorRequest.parse(
      request.user.userId,
      body.difficultyId,
      body.mathTopicId,
      body.description,
      image,
      body.mathAnswersDescription,
      body.mathAnswersIsCorrect,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new AdminMathProblemAddRouteResponse(interactorResponse);
  }
}
