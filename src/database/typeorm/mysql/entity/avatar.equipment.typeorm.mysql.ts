import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AvatarTypeOrmMySql } from './avatar.typeorm.mysql';
import { EquipmentTypeOrmMySql } from './equipment.typeorm.mysql';

@Entity('avatar_equipment')
export class AvatarEquipmentTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('int', { name: 'level', unsigned: true, nullable: false, default: 1 })
  level: number;

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
    level: number,
    equipped: boolean,
    equipment: EquipmentTypeOrmMySql,
    avatar: AvatarTypeOrmMySql,
  ) {
    this.id = id;
    this.level = level;
    this.equipped = equipped;
    this.equipment = equipment;
    this.avatar = avatar;
  }
}