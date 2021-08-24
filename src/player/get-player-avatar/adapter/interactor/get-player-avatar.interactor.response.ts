import { Avatar } from '../../domain/entity/avatar';
import { Equipment } from '../../domain/entity/equipment';

export class GetPlayerAvatarInteractorResponse {
  readonly name: string;
  readonly raceId: string;
  readonly maxHealth: number;
  readonly attack: number;
  readonly defense: number;
  readonly imageUrl: string;
  readonly color: string;
  readonly level: number;
  readonly currentExperience: number;
  readonly helmet: GetPlayerAvatarEquipmentInteractorResponse | null;
  readonly chestplate: GetPlayerAvatarEquipmentInteractorResponse | null;
  readonly leggings: GetPlayerAvatarEquipmentInteractorResponse | null;
  readonly boots: GetPlayerAvatarEquipmentInteractorResponse | null;
  readonly shield: GetPlayerAvatarEquipmentInteractorResponse | null;
  readonly weapon: GetPlayerAvatarEquipmentInteractorResponse | null;

  get totalExperience(): number {
    return this.level * 100;
  }

  constructor(avatar: Avatar) {
    this.attack = avatar.attack;
    this.raceId = avatar.raceId;
    this.color = avatar.color;
    this.defense = avatar.defense;
    this.imageUrl = avatar.imageUrl;
    this.maxHealth = avatar.maxHealth;
    this.name = avatar.name;
    this.level = avatar.level;
    this.currentExperience = avatar.currentExperience;
    this.helmet =
      avatar.helmet === null
        ? null
        : new GetPlayerAvatarEquipmentInteractorResponse(avatar.helmet);
    this.chestplate =
      avatar.chestplate === null
        ? null
        : new GetPlayerAvatarEquipmentInteractorResponse(avatar.chestplate);
    this.leggings =
      avatar.leggings === null
        ? null
        : new GetPlayerAvatarEquipmentInteractorResponse(avatar.leggings);
    this.boots =
      avatar.boots === null
        ? null
        : new GetPlayerAvatarEquipmentInteractorResponse(avatar.boots);
    this.shield =
      avatar.shield === null
        ? null
        : new GetPlayerAvatarEquipmentInteractorResponse(avatar.shield);
    this.weapon =
      avatar.weapon === null
        ? null
        : new GetPlayerAvatarEquipmentInteractorResponse(avatar.weapon);
  }
}

export class GetPlayerAvatarEquipmentInteractorResponse {
  readonly id: string;
  readonly attack: number;
  readonly defense: number;
  readonly imageUrl: string;

  constructor(equipment: Equipment) {
    this.id = equipment.id;
    this.attack = equipment.attack;
    this.defense = equipment.defense;
    this.imageUrl = equipment.imageUrl;
  }
}
