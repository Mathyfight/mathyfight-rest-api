import { Equipment } from '../../domain/entity/equipment';

export class GetEquipmentsInteractorResponse {
  readonly nextPage: number | null;
  readonly equipments: GetEquipmentsEquipmentInteractorResponse[];

  constructor(
    page: number,
    elementsPerPage: number,
    totalRows: number,
    equipments: Equipment[],
  ) {
    const lastEquipmentRow = (page - 1) * elementsPerPage + equipments.length;
    this.nextPage =
      equipments.length < elementsPerPage
        ? null
        : lastEquipmentRow === totalRows
        ? null
        : page + 1;

    this.equipments = equipments.map(
      (e) =>
        new GetEquipmentsEquipmentInteractorResponse(
          e.id,
          e.name,
          e.equipmentStats.attack,
          e.equipmentStats.defense,
          e.imageUrl,
          e.description,
          e.equipmentStats.sellPrice,
          e.equipmentStats.level,
          e.equipmentStats.canUpgrade
            ? new GetEquipmentsEquipmentUpgradeInteractorResponse(
                e.equipmentStats.upgradePrice,
                e.equipmentStats.improvedAttack,
                e.equipmentStats.improvedDefense,
              )
            : null,
        ),
    );
  }
}

export class GetEquipmentsEquipmentInteractorResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly attack: number,
    readonly defense: number,
    readonly imageUrl: string,
    readonly description: string,
    readonly sellPrice: number,
    readonly level: number,
    readonly upgrade: GetEquipmentsEquipmentUpgradeInteractorResponse | null,
  ) {}
}

export class GetEquipmentsEquipmentUpgradeInteractorResponse {
  constructor(
    readonly price: number,
    readonly improvedAttack: number,
    readonly improvedDefense: number,
  ) {}
}
