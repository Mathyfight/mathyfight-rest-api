import { ApiProperty } from '@nestjs/swagger';
import {
  GetPlayerAvatarEquipmentInteractorResponse,
  GetPlayerAvatarInteractorResponse,
} from '../adapter/interactor/get-player-avatar.interactor.response';

export class PlayerGetAvatarEquipmentRouteResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly attack: number;

  @ApiProperty()
  readonly defense: number;

  @ApiProperty()
  readonly imageUrl: string;

  constructor(response: GetPlayerAvatarEquipmentInteractorResponse) {
    this.id = response.id;
    this.attack = response.attack;
    this.defense = response.defense;
    this.imageUrl = response.imageUrl;
  }
}

export class PlayerGetAvatarExperienceRouteResponse {
  @ApiProperty()
  readonly current: number;

  @ApiProperty()
  readonly total: number;

  constructor(current: number, total: number) {
    this.current = current;
    this.total = total;
  }
}

export class PlayerGetAvatarRouteResponse {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly maxHealth: number;

  @ApiProperty()
  readonly attack: number;

  @ApiProperty()
  readonly raceId: string;

  @ApiProperty()
  readonly defense: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly color: string;

  @ApiProperty()
  readonly level: number;

  @ApiProperty()
  readonly experience: PlayerGetAvatarExperienceRouteResponse;

  @ApiProperty({ type: PlayerGetAvatarEquipmentRouteResponse })
  readonly helmet: PlayerGetAvatarEquipmentRouteResponse | null;

  @ApiProperty({ type: PlayerGetAvatarEquipmentRouteResponse })
  readonly chestplate: PlayerGetAvatarEquipmentRouteResponse | null;

  @ApiProperty({ type: PlayerGetAvatarEquipmentRouteResponse })
  readonly leggings: PlayerGetAvatarEquipmentRouteResponse | null;

  @ApiProperty({ type: PlayerGetAvatarEquipmentRouteResponse })
  readonly boots: PlayerGetAvatarEquipmentRouteResponse | null;

  @ApiProperty({ type: PlayerGetAvatarEquipmentRouteResponse })
  readonly shield: PlayerGetAvatarEquipmentRouteResponse | null;

  @ApiProperty({ type: PlayerGetAvatarEquipmentRouteResponse })
  readonly weapon: PlayerGetAvatarEquipmentRouteResponse | null;

  constructor(response: GetPlayerAvatarInteractorResponse) {
    this.raceId = response.raceId;
    this.attack = response.attack;
    this.color = response.color;
    this.defense = response.defense;
    this.level = response.level;
    this.experience = new PlayerGetAvatarExperienceRouteResponse(
      response.currentExperience,
      response.totalExperience,
    );
    this.imageUrl = response.imageUrl;
    this.maxHealth = response.maxHealth;
    this.name = response.name;
    this.helmet =
      response.helmet === null
        ? null
        : new PlayerGetAvatarEquipmentRouteResponse(response.helmet);
    this.chestplate =
      response.chestplate === null
        ? null
        : new PlayerGetAvatarEquipmentRouteResponse(response.chestplate);
    this.leggings =
      response.leggings === null
        ? null
        : new PlayerGetAvatarEquipmentRouteResponse(response.leggings);
    this.boots =
      response.boots === null
        ? null
        : new PlayerGetAvatarEquipmentRouteResponse(response.boots);
    this.shield =
      response.shield === null
        ? null
        : new PlayerGetAvatarEquipmentRouteResponse(response.shield);
    this.weapon =
      response.weapon === null
        ? null
        : new PlayerGetAvatarEquipmentRouteResponse(response.weapon);
  }
}
