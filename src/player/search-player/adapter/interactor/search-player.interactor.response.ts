export class SearchPlayerInteractorResponse {
  constructor(
    readonly userId: string,
    readonly username: string,
    readonly imageUrl: string,
    readonly color: string,
    readonly helmetImageUrl: string | null,
    readonly chestplateImageUrl: string | null,
    readonly leggingsImageUrl: string | null,
    readonly bootsImageUrl: string | null,
    readonly weaponImageUrl: string | null,
    readonly shieldImageUrl: string | null,
  ) {}
}
