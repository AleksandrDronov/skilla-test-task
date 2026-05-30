import type { CallsSortState, SortByApiValue, SortByFilter, SortOrder } from '../model/types'

export const mapSortToApiValue = (sort: SortByFilter): SortByApiValue | undefined => {
  if (sort === 'date' || sort === 'duration') {
    return sort
  }

  return undefined
}

export const mapOrderToApiValue = (sort: CallsSortState): SortOrder | undefined => {
  if (mapSortToApiValue(sort.sortBy) === undefined) {
    return undefined
  }

  return sort.order
}

export const getNextSortState = (
  current: CallsSortState,
  column: SortByApiValue,
  defaultOrder: SortOrder = 'DESC',
): CallsSortState => {
  if (current.sortBy !== column) {
    return { sortBy: column, order: defaultOrder }
  }

  if (current.order === 'DESC') {
    return { sortBy: column, order: 'ASC' }
  }

  return { sortBy: 'none', order: defaultOrder }
}
