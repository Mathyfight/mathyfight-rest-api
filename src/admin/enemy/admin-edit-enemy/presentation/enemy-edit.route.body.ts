import { ApiProperty } from '@nestjs/swagger';

export class AdminEnemyEditRouteBody {
  @ApiProperty({ type: String, required: false })
  name!: string | undefined;

  @ApiProperty({ type: 'file', required: false })
  enemyImage!: any;
}
