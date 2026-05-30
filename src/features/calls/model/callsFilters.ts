import dayjs from 'dayjs'

export type CallTypeFilter = 'all' | 'incoming' | 'outgoing'
export type SortByFilter = 'none' | 'date' | 'duration'
export type SortByApiValue = 'date' | 'duration'
export type SortOrder = 'ASC' | 'DESC'

export type CallsSortState = {
  sortBy: SortByFilter
  order: SortOrder
}

export const defaultCallsSort: CallsSortState = {
  sortBy: 'none',
  order: 'DESC',
}
export type PeriodPreset = 'threeDays' | 'week' | 'month' | 'year'

export type DateRange = {
  dateStart: string
  dateEnd: string
}

export const callTypeLabels: Record<CallTypeFilter, string> = {
  all: 'Все типы',
  incoming: 'Входящие',
  outgoing: 'Исходящие',
}

export const periodLabels: Record<PeriodPreset, string> = {
  threeDays: '3 дня',
  week: 'Неделя',
  month: 'Месяц',
  year: 'Год',
}

export const periodOrder: PeriodPreset[] = ['threeDays', 'week', 'month', 'year']

export const mapFilterToApiValue = (filter: CallTypeFilter) => {
  if (filter === 'incoming') {
    return 1
  }

  if (filter === 'outgoing') {
    return 0
  }

  return undefined
}

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

export const getDateRange = (preset: PeriodPreset): DateRange => {
  const dateEnd = dayjs()
  const daysBackByPreset: Record<PeriodPreset, number> = {
    threeDays: 2,
    week: 6,
    month: 30,
    year: 365,
  }

  return {
    dateStart: dateEnd.subtract(daysBackByPreset[preset], 'day').format('YYYY-MM-DD'),
    dateEnd: dateEnd.format('YYYY-MM-DD'),
  }
}

export const getPreviousPreset = (preset: PeriodPreset) => {
  const currentIndex = periodOrder.indexOf(preset)

  return periodOrder[Math.max(0, currentIndex - 1)]
}

export const getNextPreset = (preset: PeriodPreset) => {
  const currentIndex = periodOrder.indexOf(preset)

  return periodOrder[Math.min(periodOrder.length - 1, currentIndex + 1)]
}
