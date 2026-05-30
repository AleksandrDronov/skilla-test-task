import dayjs from 'dayjs'

export type CallTypeFilter = 'all' | 'incoming' | 'outgoing'
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
