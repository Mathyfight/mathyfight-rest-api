import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AvatarEquipmentTypeOrmMySql } from './avatar-equipment.typeorm.mysql';
import { PlayerTypeOrmMySql } from './player.typeorm.mysql';
import { RaceTypeOrmMySql } from './race.typeorm.mysql';

@Entity('avatar')
export class AvatarTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 64, nullable: false })
  name: string;

  @Column('int', { name: 'base_attack', unsigned: true, nullable: false })
  baseAttack: number;

  @Column('int', { name: 'base_defense', unsigned: true, nullable: false })
  baseDefense: number;

  @Column('int', { name: 'max_health', unsigned: true, nullable: false })
  maxHealth: number;

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

  @ManyToOne(() => RaceTypeOrmMySql, (race) => race.avatars, {
    nullable: false,
  })
  @JoinColumn({ name: 'race_id' })
  race: RaceTypeOrmMySql;

  @OneToOne(() => PlayerTypeOrmMySql, (player) => player.avatar, {
    nullable: false,
  })
  @JoinColumn({ name: 'player_id' })
  player: PlayerTypeOrmMySql;

  @OneToMany(
    () => AvatarEquipmentTypeOrmMySql,
    (avatarEquipment) => avatarEquipment.avatar,
  )
  equipments: AvatarEquipmentTypeOrmMySql[];

  constructor(
    id: string,
    name: string,
    baseAttack: number,
    baseDefense: number,
    maxHealth: number,
    level: number,
    currentExperience: number,
    color: string,
    race: RaceTypeOrmMySql,
    equipments: AvatarEquipmentTypeOrmMySql[],
    player: PlayerTypeOrmMySql,
  ) {
    this.id = id;
    this.name = name;
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;
    this.maxHealth = maxHealth;
    this.level = level;
    this.currentExperience = currentExperience;
    this.color = color;
    this.race = race;
    this.equipments = equipments;
    this.player = player;
  }
}
