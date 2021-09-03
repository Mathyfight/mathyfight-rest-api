import {
  Controller,
  Request,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
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
import { AdminEditMathTopicInterator } from '../adapter/interactor/admin-edit-math-topic.interactor';
import { AdminEditMathTopicInteratorRequest } from '../adapter/interactor/admin-edit-math-topic.interactor.request';
import { AdminMathTopicEditRouteBody } from './admin-math-topic-edit.route.body';
import { AdminMathTopicEditRouteErrors } from './admin-math-topic-edit.route.errors';
import { AdminMathTopicEditRouteParams } from './admin-math-topic-edit.route.params';
import { AdminMathTopicEditRouteResponse } from './admin-math-topic-edit.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.topic')
@Controller()
export class AdminMathTopicEditRoute {
  constructor(readonly interactor: AdminEditMathTopicInterator) {}

  @Patch('admin/math/topics/:mathTopicId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminMathTopicEditRouteResponse })
  @ApiResponse({ status: 400, type: AdminMathTopicEditRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @UploadedFile() image: Express.Multer.File | undefined,
    @Body() body: AdminMathTopicEditRouteBody,
    @Param() params: AdminMathTopicEditRouteParams,
  ): Promise<AdminMathTopicEditRouteResponse> {
    const interactorRequest = AdminEditMathTopicInteratorRequest.parse(
      request.user.userId,
      params.mathTopicId,
      body.name,
      body.description,
      body.mathAreaId,
      body.enemyIds,
      image,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new AdminMathTopicEditRouteResponse(interactorResponse);
  }
}
