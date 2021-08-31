import { ApiProperty } from '@nestjs/swagger';
import { AdminGetMathAreasErrors } from '../domain/value-object/admin-get-math-areas.errors';

export class AdminMathGetAreasRouteErrors implements AdminGetMathAreasErrors {
  @ApiProperty()
  userId!: string[];
}
