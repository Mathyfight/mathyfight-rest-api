import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminEnemyAddRouteBody {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ type: 'file' })
  enemyImage!: any;
}
