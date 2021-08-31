import { EquipmentDescription } from 'src/admin/equipment/core/domain/value-object/equipment-description';
import { EquipmentName } from 'src/admin/equipment/core/domain/value-object/equipment-name';
import { EquipmentType } from 'src/shared/domain/value-object/equipment/equipment-type';
import { FormImage } from 'src/shared/domain/value-object/general/form-image';
import { Uuid } from 'src/shared/domain/value-object/general/uuid';
import { ValidationException } from 'src/shared/domain/value-object/general/validation-exception';
import { Integer } from 'src/shared/domain/value-object/primitive/number/integer';
import { PositiveInteger } from 'src/shared/domain/value-object/primitive/number/positive-integer';
import { DomainErrorsProp } from 'src/shared/domain/value-object/util/domain-errors';
import { AdminAddEquipmentErrors } from '../../domain/value-object/admin-add-equipment.errors';

export class AdminAddEquipmentInteractorRequest {
  constructor(
    readonly userId: Uuid,
    readonly image: FormImage,
    readonly name: EquipmentName,
    readonly description: EquipmentDescription,
    readonly buyPrice: PositiveInteger,
    readonly attack: Integer,
    readonly defense: Integer,
    readonly equipmentType: EquipmentType,
  ) {}

  static parse(
    userId: string,
    image: Express.Multer.File | undefined,
    name: string,
    description: string,
    buyPrice: number,
    attack: number,
    defense: number,
    equipmentType: EquipmentType,
  ): AdminAddEquipmentInteractorRequest {
    const errors = new AdminAddEquipmentErrors();

    const userIdV = Uuid.parse(userId, errors, DomainErrorsProp.userId);
    const nameV = EquipmentName.parse(name, errors, DomainErrorsProp.name);
    const descriptionV = EquipmentDescription.parse(
      description,
      errors,
      DomainErrorsProp.description,
    );
    const buyPriceV = PositiveInteger.parse(
      buyPrice,
      errors,
      DomainErrorsProp.buyPrice,
    );
    const attackV = Integer.parse(attack, errors, DomainErrorsProp.attack);
    const defenseV = Integer.parse(defense, errors, DomainErrorsProp.defense);
    const imageV = FormImage.parse(image, errors, DomainErrorsProp.image);

    if (
      userIdV === null ||
      nameV === null ||
      descriptionV === null ||
      buyPriceV === null ||
      attackV === null ||
      defenseV === null ||
      imageV === null
    )
      throw new ValidationException(errors);

    return new AdminAddEquipmentInteractorRequest(
      userIdV,
      imageV,
      nameV,
      descriptionV,
      buyPriceV,
      attackV,
      defenseV,
      equipmentType,
    );
  }
}
