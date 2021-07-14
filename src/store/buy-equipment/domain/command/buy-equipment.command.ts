import { Equipment } from '../entity/equipment';
import { User } from '../entity/user';
import { BuyEquipmentErrors } from '../value-object/buy-equipment.errors';
import { AddEquipmentToAvatar } from './add-equipment-to-avatar';
import { DecreasePlayerGold } from './decrease-player-gold';

export class BuyEquipmentCommand {
  static userDoesntExist = 'el usuario debe existir';
  static playerDoesntExist = 'el usuario debe tener un jugador';
  static equipmentDoesntExist = 'el equipamiento debe existir';
  static playerAlreadyHasEquipment = 'el jugador ya tiene el equipamiento';
  static playerNeedsToHave = (gold: number): string =>
    `el jugador debe tener ${gold} de oro más`;

  private constructor(
    readonly decreasePlayerGold: DecreasePlayerGold,
    readonly addEquipmentToAvatar: AddEquipmentToAvatar,
  ) {}

  static new(
    user: User | null,
    equipment: Equipment | null,
    errors: BuyEquipmentErrors,
  ): BuyEquipmentCommand | null {
    if (equipment === null) errors.equipmentId.push(this.equipmentDoesntExist);

    if (user === null) {
      errors.userId.push(this.userDoesntExist);
      return null;
    }

    if (user.player === null) {
      errors.userId.push(this.playerDoesntExist);
      return null;
    }

    if (equipment === null) return null;

    const alreadyHasEquipment = user.player.inventory.find(
      (e) => e.id === equipment.id,
    );
    if (alreadyHasEquipment) {
      errors.errors.push(this.playerAlreadyHasEquipment);
      return null;
    }

    const remainingGold = user.player.gold - equipment.buyPrice;
    if (remainingGold < 0) {
      errors.errors.push(this.playerNeedsToHave(-remainingGold));
      return null;
    }

    return new BuyEquipmentCommand(
      new DecreasePlayerGold(user.player.id, equipment.buyPrice),
      new AddEquipmentToAvatar(equipment.id, user.player.avatarId),
    );
  }
}
