import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Repository } from 'typeorm';
import { AdminGetEquipmentsRepository } from '../adapter/interface/admin-get-equipments.repository';
import { Equipment } from '../domain/entity/equipment';
import { User } from '../domain/entity/user';

export class AdminGetEquipmentsTypeOrmMySqlRepository
  implements AdminGetEquipmentsRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(EquipmentTypeOrmMySql)
    private readonly equipmentRepository: Repository<EquipmentTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async getEquipments(equipmentType: EquipmentType): Promise<Equipment[]> {
    const ormEquipments = await this.equipmentRepository.find({
      where: { type: equipmentType },
    });
    return ormEquipments.map(
      (e) =>
        new Equipment(
          e.id,
          e.imageUrl,
          e.name,
          e.description,
          e.buyPrice,
          e.attack,
          e.defense,
          e.isActive,
        ),
    );
  }
}
