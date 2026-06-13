import { useMemo } from 'react'
import { type CallsPageTableFilters } from '@/widgets/calls-page-table'
import { type CallsPageToolbarProps } from '@/widgets/calls-page-toolbar'
import { useCallsFilters } from './useCallsFilters'

interface UseCallsPageToolbarResult {
  filters: CallsPageTableFilters
  toolbar: CallsPageToolbarProps
}

/** Управляет фильтрами страницы и адаптирует их к пропсам тулбара. */
export const useCallsPageToolbar = (): UseCallsPageToolbarResult => {
  const { typeFilter, setTypeFilter, period, setPeriod, dateRange, handleResetFilters } =
    useCallsFilters()

  const filters = useMemo(
    () => ({
      typeFilter,
      period,
      dateRange,
    }),
    [typeFilter, period, dateRange],
  )

  const toolbar = {
    typeFilter,
    onTypeFilterChange: setTypeFilter,
    period,
    onPeriodChange: setPeriod,
    onResetFilters: handleResetFilters,
  }

  return {
    filters,
    toolbar,
  }
}
