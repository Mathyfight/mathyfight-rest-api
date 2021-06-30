import { SortingOrderCriteria } from '../domain/value-object/general/sorting-order-criteria';

export class TypeOrmMySqlMapper {
  static sortingOrderCriteriaToSqlCriteria(
    order?: SortingOrderCriteria,
  ): 'ASC' | 'DESC' {
    return order === SortingOrderCriteria.Ascendant ? 'ASC' : 'DESC';
  }
}
