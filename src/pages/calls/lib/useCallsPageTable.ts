import { useMemo } from 'react'
import { type DateRange, type PeriodPreset } from '@/features/filter-calls-by-period'
import { type CallTypeFilter } from '@/features/filter-calls-by-type'
import { useCallsPagination } from '@/features/paginate-calls'
import { useCallAudio } from '@/features/play-call-record'
import { type CallsPageTableProps } from '@/widgets/calls-page-table'
import { useCallsData } from './useCallsData'
import { useCallsSorting } from './useCallsSorting'
import { useResettableCallsPage } from './useResettableCallsPage'

interface UseCallsPageTableParams {
  typeFilter: CallTypeFilter
  period: PeriodPreset
  dateRange: DateRange
}

/** Собирает состояние таблицы звонков и адаптирует его к пропсам табличного виджета. */
export const useCallsPageTable = ({
  typeFilter,
  period,
  dateRange,
}: UseCallsPageTableParams): CallsPageTableProps => {
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

  const query = useMemo<CallsPageTableProps['query']>(
    () => ({ calls, isLoading, isError, onRetry: refetch }),
    [calls, isLoading, isError, refetch],
  )
  const sortProps = useMemo<CallsPageTableProps['sort']>(
    () => ({ sort, onColumnSort: handleColumnSort }),
    [sort, handleColumnSort],
  )
  const record = useMemo<CallsPageTableProps['record']>(
    () => ({
      activeRecordId,
      loadingRecordId,
      recordError,
      onToggleRecord: handleToggleRecord,
      onDownloadRecord: handleDownloadRecord,
    }),
    [activeRecordId, loadingRecordId, recordError, handleToggleRecord, handleDownloadRecord],
  )
  const paginationProps = useMemo<CallsPageTableProps['pagination']>(
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
