import { InjectRepository } from '@nestjs/typeorm';
import { RaceTypeOrmMySql } from 'src/database/typeorm/mysql/entity/race.typeorm.mysql';
import { Repository } from 'typeorm';
import { GetRacesRepository } from '../adapter/interface/get-races.repository';
import { Race } from '../domain/entity/race';

export class GetRacesTypeOrmMySqlRepository implements GetRacesRepository {
  constructor(
    @InjectRepository(RaceTypeOrmMySql)
    private readonly raceRepository: Repository<RaceTypeOrmMySql>,
  ) {}

  async getallRaces(): Promise<Race[]> {
    const ormRaces = await this.raceRepository.find();
    return ormRaces.map((r) => new Race(r.id, r.name, r.gender, r.imageUrl));
  }
}
