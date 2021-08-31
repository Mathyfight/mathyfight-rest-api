import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
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
import { AdminAddEquipmentInteractor } from '../adapter/interactor/admin-add-equipment.interactor';
import { AdminAddEquipmentInteractorRequest } from '../adapter/interactor/admin-add-equipment.interactor.request';
import { AdminEquipmentAddRouteBody } from './admin-equipment-add.route.body';
import { AdminEquipmentAddRouteErrors } from './admin-equipment-add.route.errors';
import { AdminEquipmentAddRouteResponse } from './admin-equipment-add.route.response';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('admin.equipment')
@Controller()
export class AdminEquipmentAddRoute {
  constructor(readonly interactor: AdminAddEquipmentInteractor) {}

  @Post('admin/equipments')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 201, type: AdminEquipmentAddRouteResponse })
  @ApiResponse({ status: 400, type: AdminEquipmentAddRouteErrors })
  async route(
    @Request() request: { user: JwtPayload },
    @UploadedFile() image: Express.Multer.File | undefined,
    @Body() body: AdminEquipmentAddRouteBody,
  ): Promise<AdminEquipmentAddRouteResponse> {
    const intReq = AdminAddEquipmentInteractorRequest.parse(
      request.user.userId,
      image,
      body.name,
      body.description,
      body.buyPrice,
      body.attack,
      body.defense,
      body.equipmentType,
    );
    const intRes = await this.interactor.invoke(intReq);
    return new AdminEquipmentAddRouteResponse(intRes);
  }
}
