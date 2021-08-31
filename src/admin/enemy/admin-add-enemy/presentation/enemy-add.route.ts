import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
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
import { AddEnemyInteractor } from '../adapter/interactor/add-enemy.interactor';
import { AddEnemyInteractorRequest } from '../adapter/interactor/add-enemy.interactor.request';
import { AdminEnemyAddRouteBody } from './enemy-add.route.body';
import { AdminEnemyAddRouteErrors } from './enemy-add.route.errors';
import { AdminEnemyAddRouteResponse } from './enemy-add.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.enemy')
@Controller()
export class EnemyAddRoute {
  constructor(readonly interactor: AddEnemyInteractor) {}

  @Post('admin/enemies')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('enemyImage'))
  @ApiResponse({ status: 201, type: AdminEnemyAddRouteResponse })
  @ApiResponse({ status: 400, type: AdminEnemyAddRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @UploadedFile() enemyImage: Express.Multer.File | undefined,
    @Body() body: AdminEnemyAddRouteBody,
  ): Promise<AdminEnemyAddRouteResponse> {
    const interactorRequest = AddEnemyInteractorRequest.parse(
      body.name,
      enemyImage,
      request.user.userId,
    );
    const interactorResponse = await this.interactor.invoke(interactorRequest);
    return new AdminEnemyAddRouteResponse(interactorResponse);
  }
}
