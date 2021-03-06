import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AvatarEquipmentTypeOrmMySql } from './avatar-equipment.typeorm.mysql';

@Entity('equipment')
export class EquipmentTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 50, nullable: false })
  name: string;

  @Column('varchar', { name: 'image_url', length: 2048, nullable: false })
  imageUrl: string;

  @Column('varchar', { name: 'description', length: 200, nullable: false })
  description: string;

  @Column('enum', { name: 'type', enum: EquipmentType, nullable: false })
  type: EquipmentType;

  @Column('int', { name: 'attack', unsigned: true, nullable: false })
  attack: number;

  @Column('int', { name: 'defense', unsigned: true, nullable: false })
  defense: number;

  @Column('int', { name: 'buy_price', unsigned: true, nullable: false })
  buyPrice: number;

  @Column('bool', { name: 'is_active', nullable: false })
  isActive: boolean;

  @OneToMany(
    () => AvatarEquipmentTypeOrmMySql,
    (avatarEquipment) => avatarEquipment.equipment,
  )
  avatars: AvatarEquipmentTypeOrmMySql[];

  constructor(
    id: string,
    name: string,
    imageUrl: string,
    description: string,
    type: EquipmentType,
    attack: number,
    defense: number,
    buyPrice: number,
    isActive: boolean,
    avatars: AvatarEquipmentTypeOrmMySql[],
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.type = type;
    this.attack = attack;
    this.defense = defense;
    this.buyPrice = buyPrice;
    this.isActive = isActive;
    this.avatars = avatars;
  }
}
