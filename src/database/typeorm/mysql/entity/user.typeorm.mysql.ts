import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { PlayerTypeOrmMySql } from './player.typeorm.mysql';
import { ResetPasswordTokenTypeOrmMySql } from './reset-password-token.typeorm.mysql';

@Entity('user')
export class UserTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', {
    name: 'email',
    length: 320,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    name: 'username',
    length: 20,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column('varchar', { name: 'hashed_password', length: 72, nullable: false })
  hashedPassword: string;

  @Column('boolean', { name: 'is_admin', nullable: false })
  isAdmin: boolean;

  @OneToOne(() => PlayerTypeOrmMySql, (player) => player.user)
  player: PlayerTypeOrmMySql | null;

  @OneToMany(() => ResetPasswordTokenTypeOrmMySql, (token) => token.user)
  tokens: ResetPasswordTokenTypeOrmMySql[];

  constructor(
    id: string,
    email: string,
    username: string,
    hashedPassword: string,
    isAdmin: boolean,
    tokens: ResetPasswordTokenTypeOrmMySql[],
    player: PlayerTypeOrmMySql | null,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.isAdmin = isAdmin;
    this.tokens = tokens;
    this.player = player;
  }
}
