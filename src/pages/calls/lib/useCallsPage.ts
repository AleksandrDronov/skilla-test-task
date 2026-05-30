import { useCallsPagination } from '@/features/paginate-calls'
import { useCallAudio } from '@/features/play-call-record'
import { type CallsPageTableProps } from '@/widgets/calls-page-table'
import { type CallsPageToolbarProps } from '@/widgets/calls-page-toolbar'
import { useCallsData } from './useCallsData'
import { useCallsFilters } from './useCallsFilters'
import { useCallsSorting } from './useCallsSorting'
import { useResettableCallsPage } from './useResettableCallsPage'

/** Пропсы для виджетов тулбара и таблицы страницы звонков. */
interface UseCallsPageResult {
  toolbar: CallsPageToolbarProps
  table: CallsPageTableProps
}

/**
 * Фасад страницы звонков: собирает фильтры, сортировку, пагинацию, данные и аудиозаписи.
 * Возвращает готовые пропсы для `CallsPageToolbar` и `CallsPageTable`.
 *
 * @returns Объект `{ toolbar, table }` для передачи в виджеты без промежуточной логики в UI.
 */
export const useCallsPage = (): UseCallsPageResult => {
  const { typeFilter, setTypeFilter, period, setPeriod, dateRange, handleResetFilters } =
    useCallsFilters()
  const { sort, sortByApiValue, orderApiValue, handleColumnSort } = useCallsSorting()
  const resetPageKey = `${typeFilter}-${sort.sortBy}-${sort.order}-${period}`
  const { page, offset, setPage } = useResettableCallsPage(resetPageKey)
  const { calls, totalRowsRaw, isLoading, isError, refetch } = useCallsData({
    typeFilter,
    dateRange,
    offset,
    sortByApiValue,
    orderApiValue,
  })
  const { activeRecordId, loadingRecordId, recordError, handleToggleRecord, handleDownloadRecord } =
    useCallAudio()
  const { pagination, onPaginationPrevious, onPaginationNext } = useCallsPagination({
    page,
    setPage,
    totalRowsRaw,
    currentResultsCount: calls.length,
  })

  return {
    toolbar: {
      typeFilter,
      onTypeFilterChange: setTypeFilter,
      period,
      onPeriodChange: setPeriod,
      onResetFilters: handleResetFilters,
    },
    table: {
      query: { calls, isLoading, isError, onRetry: refetch },
      sort: { sort, onColumnSort: handleColumnSort },
      record: {
        activeRecordId,
        loadingRecordId,
        recordError,
        onToggleRecord: handleToggleRecord,
        onDownloadRecord: handleDownloadRecord,
      },
      pagination: {
        pagination,
        onPrevious: onPaginationPrevious,
        onNext: onPaginationNext,
      },
    },
  }
}
