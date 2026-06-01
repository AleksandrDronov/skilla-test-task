import { type DateRange, type PeriodPreset } from '@/features/filter-calls-by-period'
import { type CallTypeFilter } from '@/features/filter-calls-by-type'
import { type CallsPageToolbarProps } from '@/widgets/calls-page-toolbar'
import { useCallsFilters } from './useCallsFilters'

interface CallsPageFilters {
  typeFilter: CallTypeFilter
  period: PeriodPreset
  dateRange: DateRange
}

interface UseCallsPageToolbarResult {
  filters: CallsPageFilters
  toolbar: CallsPageToolbarProps
}

/** Управляет фильтрами страницы и адаптирует их к пропсам тулбара. */
export const useCallsPageToolbar = (): UseCallsPageToolbarResult => {
  const { typeFilter, setTypeFilter, period, setPeriod, dateRange, handleResetFilters } =
    useCallsFilters()

  const filters = {
    typeFilter,
    period,
    dateRange,
  }

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
