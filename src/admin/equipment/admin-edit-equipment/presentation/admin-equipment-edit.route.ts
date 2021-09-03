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
import { AdminEditEquipmentInteractor } from '../adapter/interactor/admin-edit-equipment.interactor';
import { AdminEditEquipmentInteractorRequest } from '../adapter/interactor/admin-edit-equipment.interactor.request';
import { AdminEquipmentEditRouteBody } from './admin-equipment-edit.route.body';
import { AdminEquipmentEditRouteErrors } from './admin-equipment-edit.route.errors';
import { AdminEquipmentEditRouteParams } from './admin-equipment-edit.route.params';
import { AdminEquipmentEditRouteResponse } from './admin-equipment-edit.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.equipment')
@Controller()
export class AdminEquipmentEditRoute {
  constructor(readonly interactor: AdminEditEquipmentInteractor) {}

  @Patch('admin/equipments/:equipmentId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, type: AdminEquipmentEditRouteResponse })
  @ApiResponse({ status: 400, type: AdminEquipmentEditRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @UploadedFile() image: Express.Multer.File | undefined,
    @Body() body: AdminEquipmentEditRouteBody,
    @Param() params: AdminEquipmentEditRouteParams,
  ): Promise<AdminEquipmentEditRouteResponse> {
    const intReq = AdminEditEquipmentInteractorRequest.parse(
      request.user.userId,
      params.equipmentId,
      image,
      body.name,
      body.description,
      body.buyPrice,
      body.attack,
      body.defense,
    );
    const intRes = await this.interactor.invoke(intReq);
    return new AdminEquipmentEditRouteResponse(intRes);
  }
}
