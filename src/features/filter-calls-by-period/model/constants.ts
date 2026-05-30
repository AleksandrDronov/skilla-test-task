import type { PeriodPreset } from './types'

export const periodLabels: Record<PeriodPreset, string> = {
  threeDays: '3 дня',
  week: 'Неделя',
  month: 'Месяц',
  year: 'Год',
}

export const periodOrder: PeriodPreset[] = ['threeDays', 'week', 'month', 'year']
