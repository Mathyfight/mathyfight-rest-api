import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar-equipment.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { EquipmentStats } from 'src/shared/domain/value-object/equipment/equipment-stats';
import { TypeOrmMySqlMapper } from 'src/shared/infrastructure/typeorm.mysql.mapper';
import { Repository } from 'typeorm';
import { GetEquipmentsRepository } from '../adapter/interface/get-equipments.repository';
import { GetEquipmentsCommand } from '../domain/command/get-equipments.command';
import { Avatar } from '../domain/entity/avatar';
import { Equipment } from '../domain/entity/equipment';
import { User } from '../domain/entity/user';
import { GetEquipmentsTypeOrmMySqlMapper } from './typeorm.mysql.mapper';

export class GetEquipmentTypeOrmMySqlRepository
  implements GetEquipmentsRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(AvatarEquipmentTypeOrmMySql)
    readonly avatarEquipmentRepository: Repository<AvatarEquipmentTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId, {
      relations: ['player', 'player.avatar'],
    });
    if (ormUser === undefined) return null;
    return new User(
      ormUser.player === null ? null : new Avatar(ormUser.player.avatar.id),
    );
  }

  async getEquipments(
    command: GetEquipmentsCommand,
  ): Promise<[Equipment[], number]> {
    const sortingOrder =
      GetEquipmentsTypeOrmMySqlMapper.equipmentSortingOrderToColumn(
        command.equipmentSortingOrder,
      );
    const sortingCriteria =
      TypeOrmMySqlMapper.sortingOrderCriteriaToSqlCriteria(
        command.sortingOrderCriteria,
      );

    const ormAvatarEquipments = await this.avatarEquipmentRepository
      .createQueryBuilder('ae')
      .innerJoinAndSelect('ae.equipment', 'e')
      .where('ae.avatar_id = :avatarId', { avatarId: command.avatarId })
      .andWhere('e.type = :equipmentType', {
        equipmentType: command.equipmentType,
      })
      .orderBy(`${sortingOrder}`, sortingCriteria)
      .offset((command.page - 1) * command.elementsPerPage)
      .limit(command.elementsPerPage)
      .getMany();

    const equipments = ormAvatarEquipments.map(
      (e) =>
        new Equipment(
          e.id,
          e.equipment.name,
          e.equipment.description,
          e.equipment.imageUrl,
          new EquipmentStats(
            e.equipment.attack,
            e.equipment.defense,
            e.equipment.buyPrice,
          ),
        ),
    );

    const totalRows = await this.avatarEquipmentRepository
      .createQueryBuilder('ae')
      .innerJoin('ae.equipment', 'e')
      .where('ae.avatar_id = :avatarId', { avatarId: command.avatarId })
      .andWhere('e.type = :equipmentType', {
        equipmentType: command.equipmentType,
      })
      .getCount();
    return [equipments, totalRows];
  }
}
