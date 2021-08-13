import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MathTopicLevelTypeOrmMySql } from './math-topic-level.typeorm.mysql';

@Entity('enemy')
export class EnemyTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 64, nullable: false })
  name: string;

  @Column('varchar', { name: 'image_url', length: 2048, nullable: false })
  imageUrl: string;

  @OneToMany(
    () => MathTopicLevelTypeOrmMySql,
    (mathTopicLevel) => mathTopicLevel.mathTopic,
  )
  mathTopicLevels: MathTopicLevelTypeOrmMySql[];

  constructor(
    id: string,
    name: string,
    imageUrl: string,
    mathTopicLevels: MathTopicLevelTypeOrmMySql[],
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.mathTopicLevels = mathTopicLevels;
  }
}
