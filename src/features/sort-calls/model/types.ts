export type SortByFilter = 'none' | 'date' | 'duration'
export type SortByApiValue = 'date' | 'duration'
export type SortOrder = 'ASC' | 'DESC'

export interface CallsSortState {
  sortBy: SortByFilter
  order: SortOrder
}

export const defaultCallsSort: CallsSortState = {
  sortBy: 'none',
  order: 'DESC',
}
