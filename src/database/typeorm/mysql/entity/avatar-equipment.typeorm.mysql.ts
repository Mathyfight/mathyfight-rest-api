import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { AvatarTypeOrmMySql } from './avatar.typeorm.mysql';
import { EquipmentTypeOrmMySql } from './equipment.typeorm.mysql';

@Entity('avatar_equipment')
@Unique(['avatar', 'equipment'])
export class AvatarEquipmentTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('boolean', {
    name: 'equipped',
    nullable: false,
  })
  equipped: boolean;

  @ManyToOne(() => EquipmentTypeOrmMySql, (equipment) => equipment.avatars, {
    nullable: false,
  })
  @JoinColumn({ name: 'equipment_id' })
  equipment: EquipmentTypeOrmMySql;

  @ManyToOne(() => AvatarTypeOrmMySql, (avatar) => avatar.equipments, {
    nullable: false,
  })
  @JoinColumn({ name: 'avatar_id' })
  avatar: AvatarTypeOrmMySql;

  constructor(
    id: string,
    equipped: boolean,
    equipment: EquipmentTypeOrmMySql,
    avatar: AvatarTypeOrmMySql,
  ) {
    this.id = id;
    this.equipped = equipped;
    this.equipment = equipment;
    this.avatar = avatar;
  }
}
