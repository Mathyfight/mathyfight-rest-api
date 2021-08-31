import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { AdminAddEquipmentRepository } from '../adapter/interface/admin-add-equipment.repository';
import { PersistEquipment } from '../domain/command/persist-equipment';
import { User } from '../domain/entity/user';

export class AdminAddEquipmentTypeOrmMySqlRepository
  implements AdminAddEquipmentRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(EquipmentTypeOrmMySql)
    private equipmentRepository: Repository<EquipmentTypeOrmMySql>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async persistEquipment(cmd: PersistEquipment): Promise<void> {
    await this.equipmentRepository.insert({
      id: cmd.id,
      attack: cmd.attack,
      buyPrice: cmd.buyPrice,
      defense: cmd.defense,
      description: cmd.description,
      imageUrl: cmd.imageUrl,
      name: cmd.name,
      type: cmd.type,
    });
  }
}
