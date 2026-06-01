import { useMemo } from 'react'
import { useCallsPagination } from '@/features/paginate-calls'
import { useCallAudio } from '@/features/play-call-record'
import type { CallsPageTableFilters, CallsPageTableViewProps } from '../model/types'
import { useCallsData } from './useCallsData'
import { useCallsSorting } from './useCallsSorting'
import { useResettableCallsPage } from './useResettableCallsPage'

/** Собирает состояние таблицы звонков и адаптирует его к пропсам табличного UI. */
export const useCallsPageTable = ({
  typeFilter,
  period,
  dateRange,
}: CallsPageTableFilters): CallsPageTableViewProps => {
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

  const query = useMemo<CallsPageTableViewProps['query']>(
    () => ({ calls, isLoading, isError, onRetry: refetch }),
    [calls, isLoading, isError, refetch],
  )
  const sortProps = useMemo<CallsPageTableViewProps['sort']>(
    () => ({ sort, onColumnSort: handleColumnSort }),
    [sort, handleColumnSort],
  )
  const record = useMemo<CallsPageTableViewProps['record']>(
    () => ({
      activeRecordId,
      loadingRecordId,
      recordError,
      onToggleRecord: handleToggleRecord,
      onDownloadRecord: handleDownloadRecord,
    }),
    [activeRecordId, loadingRecordId, recordError, handleToggleRecord, handleDownloadRecord],
  )
  const paginationProps = useMemo<CallsPageTableViewProps['pagination']>(
    () => ({
      pagination,
      onPrevious: onPaginationPrevious,
      onNext: onPaginationNext,
    }),
    [pagination, onPaginationPrevious, onPaginationNext],
  )

  return {
    query,
    sort: sortProps,
    record,
    pagination: paginationProps,
  }
}
