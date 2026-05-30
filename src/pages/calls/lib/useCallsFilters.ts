import { useCallback, useMemo, useState } from 'react'
import { getDateRange, type PeriodPreset } from '@/features/filter-calls-by-period'
import { type CallTypeFilter } from '@/features/filter-calls-by-type'

/**
 * Управляет фильтрами страницы звонков: тип звонка и период.
 * Диапазон дат для API вычисляется из выбранного пресета периода.
 *
 * @returns Состояние фильтров, сеттеры и сброс типа к значению «все».
 */
export const useCallsFilters = () => {
  const [typeFilter, setTypeFilter] = useState<CallTypeFilter>('all')
  const [period, setPeriod] = useState<PeriodPreset>('threeDays')
  const dateRange = useMemo(() => getDateRange(period), [period])

  const handleResetFilters = useCallback(() => {
    setTypeFilter('all')
  }, [])

  return {
    typeFilter,
    setTypeFilter,
    period,
    setPeriod,
    dateRange,
    handleResetFilters,
  }
}
