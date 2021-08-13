import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MathTopicTypeOrmMySql } from './math-topic.typeorm.mysql';

@Entity('math_area')
export class MathAreaTypeOrmMySql {
  @PrimaryColumn('varchar', { name: 'id', length: 36, nullable: false })
  id: string;

  @Column('varchar', { name: 'name', length: 64, nullable: false })
  name: string;

  @Column('varchar', { name: 'description', length: 200, nullable: false })
  description: string;

  @Column('varchar', { name: 'image_url', length: 2048, nullable: false })
  imageUrl: string;

  @OneToMany(() => MathTopicTypeOrmMySql, (topic) => topic.mathArea)
  mathTopics: MathTopicTypeOrmMySql[];

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    mathTopics: MathTopicTypeOrmMySql[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.mathTopics = mathTopics;
  }
}
