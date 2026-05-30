import dayjs from 'dayjs'
import { periodOrder } from '../model/constants'
import type { DateRange, PeriodPreset } from '../model/types'

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
