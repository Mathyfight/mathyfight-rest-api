export class UpgradeEquipmentLevel {
  constructor(readonly avatarEquipmentId: string) {}

  get amount(): number {
    return 1;
  }
}
