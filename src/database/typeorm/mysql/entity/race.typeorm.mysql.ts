import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AvatarTypeOrmMySql } from './avatar.typeorm.mysql';

@Entity('race')
export class RaceTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 32, nullable: false })
  name: string;

  @Column('varchar', { name: 'gender', length: 32, nullable: false })
  gender: string;

  @Column('varchar', { name: 'image_url', length: 2048, nullable: false })
  imageUrl: string;

  @OneToMany(() => AvatarTypeOrmMySql, (avatar) => avatar.race)
  avatars: AvatarTypeOrmMySql[];

  constructor(
    id: string,
    name: string,
    gender: string,
    imageUrl: string,
    avatars: AvatarTypeOrmMySql[],
  ) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.imageUrl = imageUrl;
    this.avatars = avatars;
  }
}
