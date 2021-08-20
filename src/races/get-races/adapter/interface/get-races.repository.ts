import { Race } from '../../domain/entity/race';

export abstract class GetRacesRepository {
  abstract getallRaces(): Promise<Race[]>;
}
