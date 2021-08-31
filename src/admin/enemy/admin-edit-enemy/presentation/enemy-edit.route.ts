import {
  Controller,
  UseGuards,
  Request,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  Patch,
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
import { EditEnemyInteractor } from '../adapter/interactor/edit-enemy.interactor';
import { EditEnemyInteractorRequest } from '../adapter/interactor/edit-enemy.interactor.request';
import { AdminEnemyEditRouteBody } from './enemy-edit.route.body';
import { AdminEnemyEditRouteErrors } from './enemy-edit.route.errors';
import { EnemyEditRouteResponse } from './enemy-edit.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.enemy')
@Controller()
export class EnemyEditRoute {
  constructor(readonly interactor: EditEnemyInteractor) {}

  @Patch('admin/enemies/:enemyId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('enemyImage'))
  @ApiResponse({ status: 200, type: EnemyEditRouteResponse })
  @ApiResponse({ status: 400, type: AdminEnemyEditRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param('enemyId') enemyId: string,
    @UploadedFile() enemyImage: Express.Multer.File | undefined,
    @Body() body: AdminEnemyEditRouteBody,
  ): Promise<EnemyEditRouteResponse> {
    const interactorRequest = EditEnemyInteractorRequest.parse(
      body.name,
      enemyImage,
      enemyId,
      request.user.userId,
    );
    const intRes = await this.interactor.invoke(interactorRequest);
    return new EnemyEditRouteResponse(intRes.imageUrl);
  }
}
