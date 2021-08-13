import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AvatarTypeOrmMySql } from './avatar.typeorm.mysql';
import { PlayerUnlockedMathTopicLevelTypeOrmMySql } from './player-unlocked-math-topic-level.typeorm.mysql';
import { UserTypeOrmMySql } from './user.typeorm.mysql';

@Entity('player')
export class PlayerTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('int', { name: 'gold', unsigned: true, nullable: false })
  gold: number;

  @OneToOne(() => UserTypeOrmMySql, (user) => user.player, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmMySql;

  @OneToOne(() => AvatarTypeOrmMySql, (avatar) => avatar.player)
  avatar: AvatarTypeOrmMySql;

  @OneToMany(
    () => PlayerUnlockedMathTopicLevelTypeOrmMySql,
    (unlockedTopicLevels) => unlockedTopicLevels.player,
  )
  unlockedMathTopicLevels: PlayerUnlockedMathTopicLevelTypeOrmMySql[];

  constructor(
    id: string,
    gold: number,
    user: UserTypeOrmMySql,
    avatar: AvatarTypeOrmMySql,
    unlockedMathTopicLevels: PlayerUnlockedMathTopicLevelTypeOrmMySql[],
  ) {
    this.id = id;
    this.gold = gold;
    this.user = user;
    this.avatar = avatar;
    this.unlockedMathTopicLevels = unlockedMathTopicLevels;
  }
}
