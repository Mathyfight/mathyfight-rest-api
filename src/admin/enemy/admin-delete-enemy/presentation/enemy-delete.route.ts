import { Controller, UseGuards, Request, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminEnemyEditRouteErrors } from 'src/admin/enemy/admin-edit-enemy/presentation/enemy-edit.route.errors';
import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtAuthGuard } from 'src/shared/presentation/jwt-auth.guard';
import { DeleteEnemyInteractor } from '../adapter/interactor/delete-enemy.interactor';
import { DeleteEnemyInteractorRequest } from '../adapter/interactor/delete-enemy.interactor.request';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.enemy')
@Controller()
export class EnemyDeleteRoute {
  constructor(readonly interactor: DeleteEnemyInteractor) {}

  @Delete('admin/enemy/:enemyId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: AdminEnemyEditRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @Param('enemyId') enemyId: string,
  ): Promise<void> {
    const interactorRequest = DeleteEnemyInteractorRequest.parse(
      enemyId,
      request.user.userId,
    );
    await this.interactor.invoke(interactorRequest);
    return;
  }
}
