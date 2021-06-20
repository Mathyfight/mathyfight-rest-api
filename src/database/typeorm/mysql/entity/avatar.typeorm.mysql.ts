import { RaceType } from 'src/shared/domain/value-object/avatar/race-type';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AvatarEquipmentTypeOrmMySql } from './avatar.equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from './player.typeorm.mysql';

@Entity('avatar')
export class AvatarTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 64, nullable: false })
  name: string;

  @Column('int', { name: 'attack', unsigned: true, nullable: false })
  attack: number;

  @Column('int', { name: 'defense', unsigned: true, nullable: false })
  defense: number;

  @Column('int', { name: 'health', unsigned: true, nullable: false })
  health: number;

  @Column('int', { name: 'level', unsigned: true, nullable: false })
  level: number;

  @Column('int', {
    name: 'current_experience',
    unsigned: true,
    nullable: false,
  })
  currentExperience: number;

  @Column('varchar', { name: 'color', length: 6, nullable: false })
  color: string;

  @Column('enum', { name: 'race', enum: RaceType, nullable: false })
  race: RaceType;

  @OneToMany(
    () => AvatarEquipmentTypeOrmMySql,
    (avatarEquipment) => avatarEquipment.avatar,
  )
  equipments: AvatarEquipmentTypeOrmMySql[];

  @OneToOne(() => PlayerTypeOrmMySql, (player) => player.avatar, {
    nullable: false,
  })
  @JoinColumn({ name: 'player_id' })
  player: PlayerTypeOrmMySql;

  constructor(
    id: string,
    name: string,
    attack: number,
    defense: number,
    health: number,
    level: number,
    currentExperience: number,
    color: string,
    race: RaceType,
    equipments: AvatarEquipmentTypeOrmMySql[],
    player: PlayerTypeOrmMySql,
  ) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.health = health;
    this.level = level;
    this.currentExperience = currentExperience;
    this.color = color;
    this.race = race;
    this.equipments = equipments;
    this.player = player;
  }
}
