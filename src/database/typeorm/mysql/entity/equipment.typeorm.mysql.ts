import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AvatarEquipmentTypeOrmMySql } from './avatar.equipment.typeorm.mysql';

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

  @Column('int', { name: 'base_attack', unsigned: true, nullable: false })
  baseAttack: number;

  @Column('int', { name: 'base_defense', unsigned: true, nullable: false })
  baseDefense: number;

  @Column('int', { name: 'buy_price', unsigned: true, nullable: false })
  buyPrice: number;

  @Column('int', { name: 'base_sell_price', unsigned: true, nullable: false })
  baseSellPrice: number;

  @Column('decimal', {
    name: 'level_attack_rate',
    precision: 3,
    scale: 2,
    nullable: false,
  })
  levelAttackRate: number;

  @Column('decimal', {
    name: 'level_defense_rate',
    precision: 3,
    scale: 2,
    nullable: false,
  })
  levelDefenseRate: number;

  @Column('decimal', {
    name: 'level_sell_rate',
    precision: 3,
    scale: 2,
    nullable: false,
  })
  levelSellRate: number;

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
    baseAttack: number,
    baseDefense: number,
    buyPrice: number,
    baseSellPrice: number,
    levelAttackRate: number,
    levelDefenseRate: number,
    levelSellRate: number,
    avatars: AvatarEquipmentTypeOrmMySql[],
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.type = type;
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;
    this.buyPrice = buyPrice;
    this.baseSellPrice = baseSellPrice;
    this.levelAttackRate = levelAttackRate;
    this.levelDefenseRate = levelDefenseRate;
    this.levelSellRate = levelSellRate;
    this.avatars = avatars;
  }
}
