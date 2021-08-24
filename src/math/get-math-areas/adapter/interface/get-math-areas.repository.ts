import { MathArea } from '../../domain/entity/math-area';

export abstract class GetMathAreasRepository {
  abstract getMathAreas(): Promise<MathArea[]>;
}
