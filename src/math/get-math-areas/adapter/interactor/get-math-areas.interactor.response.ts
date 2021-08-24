import { MathArea } from '../../domain/entity/math-area';

export class GetMathAreasInteractorResponse {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;

  constructor(mathArea: MathArea) {
    this.id = mathArea.id;
    this.description = mathArea.description;
    this.imageUrl = mathArea.imageUrl;
    this.name = mathArea.name;
  }
}
