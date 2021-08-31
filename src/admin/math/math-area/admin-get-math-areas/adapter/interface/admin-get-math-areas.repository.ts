import { MathArea } from '../../domain/entity/math-area';
import { User } from '../../domain/entity/user';

export abstract class AdminGetMathAreasRepository {
  abstract getUserById(userId: string): Promise<User | null>;
  abstract getMathAreas(): Promise<MathArea[]>;
}
