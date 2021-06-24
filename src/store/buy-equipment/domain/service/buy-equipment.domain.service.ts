import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors-prop';
import { AddEquipmentToAvatar } from '../command/add-equipment-to-avatar';
import { BuyEquipmentCommand } from '../command/buy-equipment.command';
import { DecreasePlayerGold } from '../command/decrease-player-gold';
import { Equipment } from '../entity/equipment';
import { User } from '../entity/user';

export class BuyEquipmentDomainService {
  userDoesntExist = 'el usuario debe existir';
  playerDoesntExist = 'el usuario debe tener un jugador';
  equipmentDoesntExist = 'el equipamiento debe existir';
  playerAlreadyHasEquipment = 'el jugador ya tiene el equipamiento';
  playerNeedsToHave = (gold: number): string =>
    `el jugador debe tener ${gold} de oro más`;

  invoke(
    user: User | null,
    equipment: Equipment | null,
    errors: DomainErrors,
  ): BuyEquipmentCommand | null {
    if (equipment === null)
      errors.add(this.equipmentDoesntExist, DomainErrorsProp.equipmentId);

    if (user === null) {
      errors.add(this.userDoesntExist, DomainErrorsProp.userId);
      return null;
    }

    if (user.player === null) {
      errors.add(this.playerDoesntExist, DomainErrorsProp.userId);
      return null;
    }

    if (equipment === null) return null;

    const alreadyHasEquipment = user.player.inventory.find(
      (e) => e.id === equipment.id,
    );
    if (alreadyHasEquipment) {
      errors.add(this.playerAlreadyHasEquipment, DomainErrorsProp.errors);
      return null;
    }

    const remainingGold = user.player.gold - equipment.buyPrice;
    if (remainingGold < 0) {
      errors.add(
        this.playerNeedsToHave(-remainingGold),
        DomainErrorsProp.errors,
      );
      return null;
    }

    return new BuyEquipmentCommand(
      new DecreasePlayerGold(user.player.id, equipment.buyPrice),
      new AddEquipmentToAvatar(equipment.id, user.player.avatarId),
    );
  }
}
