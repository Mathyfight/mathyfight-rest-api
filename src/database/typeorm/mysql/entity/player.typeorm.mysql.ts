import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { AvatarTypeOrmMySql } from './avatar.typeorm.mysql';
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

  constructor(
    id: string,
    gold: number,
    user: UserTypeOrmMySql,
    avatar: AvatarTypeOrmMySql,
  ) {
    this.id = id;
    this.gold = gold;
    this.user = user;
    this.avatar = avatar;
  }
}
