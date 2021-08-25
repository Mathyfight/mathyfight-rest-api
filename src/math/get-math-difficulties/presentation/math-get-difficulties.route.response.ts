import { ApiProperty } from '@nestjs/swagger';
import { GetMathDifficultiesInteractorResponse } from '../adapter/interactor/get-math-difficulties.interactor.response';

export class MathGetDifficultiesRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly damageMultiplier: number;

  @ApiProperty()
  readonly maxSeconds: number;

  constructor(response: GetMathDifficultiesInteractorResponse) {
    this.id = response.id;
    this.damageMultiplier = response.damageMultiplier;
    this.maxSeconds = response.maxSeconds;
    this.name = response.name;
  }
}
