import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
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
import { AdminAddMathTopicInteractor } from '../adapter/interactor/admin-add-math-topic.interactor';
import { AdminAddMathTopicInteractorRequest } from '../adapter/interactor/admin-add-math-topic.interactor.request';
import { AdminMathTopicAddRouteBody } from './admin-math-topic-add.route.body';
import { AdminMathTopicAddRouteErrors } from './admin-math-topic-add.route.errors';
import { AdminMathTopicAddRouteResponse } from './admin-math-topic-add.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.math.topic')
@Controller()
export class AdminMathTopicAddRoute {
  constructor(readonly interactor: AdminAddMathTopicInteractor) {}

  @Post('admin/math/topics')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 201, type: AdminMathTopicAddRouteResponse })
  @ApiResponse({ status: 400, type: AdminMathTopicAddRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @UploadedFile() image: Express.Multer.File,
    @Body() body: AdminMathTopicAddRouteBody,
  ): Promise<AdminMathTopicAddRouteResponse> {
    const interactorRequest = AdminAddMathTopicInteractorRequest.parse(
      request.user.userId,
      body.name,
      body.description,
      image,
      body.mathAreaId,
      body.enemyIds,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new AdminMathTopicAddRouteResponse(interactorResponse);
  }
}
