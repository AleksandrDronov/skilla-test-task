import { useCallsPagination } from '@/features/paginate-calls'
import type {
  CallsPageTableFilters,
  CallsPaginationProps,
  CallsQueryProps,
  CallsSortProps,
} from '../model/types'
import { useCallsData } from './useCallsData'
import { useCallsSorting } from './useCallsSorting'
import { useResettableCallsPage } from './useResettableCallsPage'

export interface CallsTableQueryResult {
  query: CallsQueryProps
  sort: CallsSortProps
  pagination: CallsPaginationProps
}

/** Загрузка, сортировка и пагинация таблицы звонков. */
export const useCallsTableQuery = ({
  typeFilter,
  period,
  dateRange,
}: CallsPageTableFilters): CallsTableQueryResult => {
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
