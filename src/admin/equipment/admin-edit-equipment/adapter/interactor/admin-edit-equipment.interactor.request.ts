import { EquipmentDescription } from 'src/admin/equipment/core/domain/value-object/equipment-description';
import { EquipmentName } from 'src/admin/equipment/core/domain/value-object/equipment-name';
import { FormImage } from 'src/shared/domain/value-object/general/form-image';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Integer } from 'src/shared/domain/value-object/primitive/number/integer';
import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminEditEquipmentErrors } from '../../domain/value-object/admin-edit-equipment.errors';

export class AdminEditEquipmentInteractorRequest {
  constructor(
    readonly userId: Uuid,
    readonly equipmentId: Uuid,
    readonly image: FormImage | undefined,
    readonly name: EquipmentName | undefined,
    readonly description: EquipmentDescription | undefined,
    readonly buyPrice: PositiveInteger | undefined,
    readonly attack: Integer | undefined,
    readonly defense: Integer | undefined,
    readonly isActive: boolean | undefined,
  ) {}

  static readonly noDataEditedMsg = 'debes editar al menos un campo';

  static parse(
    userId: string,
    equipmentId: string,
    image: Express.Multer.File | undefined,
    name: string | undefined,
    description: string | undefined,
    buyPrice: number | undefined,
    attack: number | undefined,
    defense: number | undefined,
    isActive: boolean | undefined,
  ): AdminEditEquipmentInteractorRequest {
    const errors = new AdminEditEquipmentErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const equipmentIdV = Uuid.parse(
      equipmentId,
      errors,
      DomainErrorsProp.equipmentId,
    );
    const nameV =
      name === undefined
        ? undefined
        : EquipmentName.parse(name, errors, DomainErrorsProp.name);
    const descriptionV =
      description === undefined
        ? undefined
        : EquipmentDescription.parse(
            description,
            errors,
            DomainErrorsProp.description,
          );
    const buyPriceV =
      buyPrice === undefined
        ? undefined
        : PositiveInteger.parse(buyPrice, errors, DomainErrorsProp.buyPrice);
    const attackV =
      attack === undefined
        ? undefined
        : Integer.parse(attack, errors, DomainErrorsProp.attack);
    const defenseV =
      defense === undefined
        ? undefined
        : Integer.parse(defense, errors, DomainErrorsProp.defense);
    const imageV =
      image === undefined
        ? undefined
        : FormImage.parse(image, errors, DomainErrorsProp.image);

    const noDataEdited =
      image === undefined &&
      name === undefined &&
      description === undefined &&
      buyPrice === undefined &&
      attack === undefined &&
      defense === undefined &&
      isActive === undefined;
    if (noDataEdited) errors.errors.push(this.noDataEditedMsg);

    if (
      userIdV === null ||
      equipmentIdV === null ||
      nameV === null ||
      descriptionV === null ||
      buyPriceV === null ||
      attackV === null ||
      defenseV === null ||
      imageV === null ||
      noDataEdited
    )
      throw new ValidationException(errors);

    return new AdminEditEquipmentInteractorRequest(
      userIdV,
      equipmentIdV,
      imageV,
      nameV,
      descriptionV,
      buyPriceV,
      attackV,
      defenseV,
      isActive,
    );
  }
}
