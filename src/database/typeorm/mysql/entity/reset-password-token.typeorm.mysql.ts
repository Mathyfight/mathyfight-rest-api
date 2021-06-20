import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserTypeOrmMySql } from './user.typeorm.mysql';

@Entity('reset_password_token')
export class ResetPasswordTokenTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('datetime', { name: 'created_at', nullable: false })
  createdAt: string;

  @Column('boolean', { name: 'has_been_used', nullable: false })
  hasBeenUsed: boolean;

  @ManyToOne(() => UserTypeOrmMySql, (user) => user.tokens, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmMySql;

  constructor(
    id: string,
    createdAt: string,
    hasBeenUsed: boolean,
    user: UserTypeOrmMySql,
  ) {
    this.id = id;
    this.user = user;
    this.createdAt = createdAt;
    this.hasBeenUsed = hasBeenUsed;
  }
}
