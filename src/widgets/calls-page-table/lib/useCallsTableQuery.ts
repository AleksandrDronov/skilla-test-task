import { useCallsData } from '@/features/calls-table'
import { mapFilterToApiValue } from '@/features/filter-calls-by-type'
import { useCallsPagination, useResettableCallsPage } from '@/features/paginate-calls'
import { useCallsSorting } from '@/features/sort-calls'
import type { CallsPageTableFilters, CallsTableQueryResult } from '../model/types'

/** Загрузка, сортировка и пагинация таблицы звонков. */
export const useCallsTableQuery = ({
  typeFilter,
  period,
  dateRange,
}: CallsPageTableFilters): CallsTableQueryResult => {
  const { sort, handleColumnSort } = useCallsSorting()
  const resetPageKey = `${typeFilter}-${sort.sortBy}-${sort.order}-${period}`
  const { page, offset, setPage } = useResettableCallsPage(resetPageKey)
  const { calls, totalRowsRaw, isLoading, isError, refetch } = useCallsData({
    inOut: mapFilterToApiValue(typeFilter),
    dateStart: dateRange.dateStart,
    dateEnd: dateRange.dateEnd,
    offset,
  })
  const { pagination, onPaginationPrevious, onPaginationNext } = useCallsPagination({
    page,
    setPage,
    totalRowsRaw,
    currentResultsCount: calls.length,
  })

  return {
    query: { calls, isLoading, isError, onRetry: refetch },
    sort: { sort, onColumnSort: handleColumnSort },
    pagination: {
      pagination,
      onPrevious: onPaginationPrevious,
      onNext: onPaginationNext,
    },
  }
}
