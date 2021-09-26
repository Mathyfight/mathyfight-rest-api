import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/avatar-equipment.typeorm.mysql';
import { EquipmentTypeOrmMySql } from 'src/database/typeorm/mysql/entity/equipment.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Repository } from 'typeorm';
import { AdminEditEquipmentRepository } from '../adapter/interface/admin-edit-equipment.repository';
import { PersistEquipment } from '../domain/command/persist-equipment';
import { User } from '../domain/entity/user';

export class AdminEditEquipmentTypeOrmMySqlRepository
  implements AdminEditEquipmentRepository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    private userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(EquipmentTypeOrmMySql)
    private equipmentRepository: Repository<EquipmentTypeOrmMySql>,
    @InjectRepository(AvatarEquipmentTypeOrmMySql)
    private avatarEquipmentRepository: Repository<AvatarEquipmentTypeOrmMySql>,
  ) {}

  async getImageUrlFromEquipment(equipmentId: string): Promise<string | null> {
    const ormEquipment = await this.equipmentRepository.findOne(equipmentId);
    if (ormEquipment === undefined) return null;
    return ormEquipment.imageUrl;
  }

  async getUserById(userId: string): Promise<User | null> {
    const ormUser = await this.userRepository.findOne(userId);
    if (ormUser === undefined) return null;
    return new User(ormUser.isAdmin);
  }

  async persistEquipment(cmd: PersistEquipment): Promise<void> {
    const ormUpdateFields: {
      attack?: number;
      buyPrice?: number;
      defense?: number;
      description?: string;
      name?: string;
      imageUrl?: string;
      isActive?: boolean;
    } = {};

    if (cmd.name !== undefined) ormUpdateFields.name = cmd.name;
    if (cmd.attack !== undefined) ormUpdateFields.attack = cmd.attack;
    if (cmd.buyPrice !== undefined) ormUpdateFields.buyPrice = cmd.buyPrice;
    if (cmd.defense !== undefined) ormUpdateFields.defense = cmd.defense;
    if (cmd.description !== undefined)
      ormUpdateFields.description = cmd.description;
    if (cmd.imageUrl !== undefined) ormUpdateFields.imageUrl = cmd.imageUrl;
    if (cmd.isActive !== undefined) ormUpdateFields.isActive = cmd.isActive;

    if (
      ormUpdateFields.attack !== undefined ||
      ormUpdateFields.buyPrice !== undefined ||
      ormUpdateFields.defense !== undefined ||
      ormUpdateFields.description !== undefined ||
      ormUpdateFields.imageUrl !== undefined ||
      ormUpdateFields.name !== undefined ||
      ormUpdateFields.isActive !== undefined
    ) {
      await this.equipmentRepository.update({ id: cmd.id }, ormUpdateFields);
      if (!ormUpdateFields.isActive) {
        await this.avatarEquipmentRepository.update(
          { equipment: { id: cmd.id } },
          { equipped: false },
        );
      }
    }
  }
}
