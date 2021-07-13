import { InjectRepository } from '@nestjs/typeorm';
import { AvatarTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar.typeorm.mysql';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { EquipmentSortingOrder } from 'src/store/get-equipments/domain/value-object/equipment-sorting-order';
import { SortingOrderCriteria } from 'src/shared/domain/value-object/general/sorting-order-criteria';
import { Repository } from 'typeorm';
import { GetEquipmentsRepository } from '../adapter/interface/get-equipments.repository';
import { Equipment } from '../domain/entity/equipment';
import { GetEquipmentsCommand } from '../domain/command/get-equipments.command';

export class GetEquipmentTypeOrmMySqlRepository
  implements GetEquipmentsRepository
{
  constructor(
    @InjectRepository(EquipmentTypeOrmMySql)
    readonly equipmentRepository: Repository<EquipmentTypeOrmMySql>,
    @InjectRepository(AvatarTypeOrmMySql)
    readonly avatarRepository: Repository<AvatarTypeOrmMySql>,
  ) {}

  async getAvatarIdByUserId(userId: string): Promise<string | null> {
    const ormAvatar = await this.avatarRepository
      .createQueryBuilder('avatar')
      .innerJoinAndSelect('avatar.player', 'player')
      .innerJoinAndSelect('player.user', 'user')
      .where('user.id = :userId', { userId: userId })
      .getOne();
    if (ormAvatar === undefined) return null;
    return ormAvatar.id;
  }

  async getEquipments(
    cmd: GetEquipmentsCommand,
  ): Promise<[Equipment[], number]> {
    const order =
      cmd.equipmentSortingOrder === EquipmentSortingOrder.Attack
        ? 'baseAttack'
        : cmd.equipmentSortingOrder === EquipmentSortingOrder.Defense
        ? 'baseDefense'
        : cmd.equipmentSortingOrder === EquipmentSortingOrder.Name
        ? 'name'
        : 'buyPrice';

    const orderCriteria =
      cmd.sortingOrderCriteria === SortingOrderCriteria.Ascendant
        ? 'ASC'
        : 'DESC';

    const [ormEquipments, count] = await this.equipmentRepository
      .createQueryBuilder('equipment')
      .leftJoin(
        'equipment.avatars',
        'avatars',
        'avatars.avatar_id = :avatarId',
        { avatarId: cmd.avatarId },
      )
      .where('avatars.avatar_id is null')
      .andWhere('equipment.type = :equipmentType', {
        equipmentType: cmd.equipmentType,
      })
      .orderBy(`equipment.${order}`, orderCriteria)
      .skip((cmd.page - 1) * cmd.elementsPerPage)
      .take(cmd.elementsPerPage)
      .getManyAndCount();

    const equipments = ormEquipments.map(
      (e) =>
        new Equipment(
          e.id,
          e.name,
          e.baseAttack,
          e.baseDefense,
          e.imageUrl,
          e.description,
          e.buyPrice,
        ),
    );
    return [equipments, count];
  }
}
