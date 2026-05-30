import { useCallsPagination } from '@/features/paginate-calls'
import { useCallAudio } from '@/features/play-call-record'
import { CallsPageTable } from '@/widgets/calls-page-table'
import { CallsPageToolbar } from '@/widgets/calls-page-toolbar'
import { useCallsData } from '../../lib/useCallsData'
import { useCallsFilters } from '../../lib/useCallsFilters'
import { useCallsSorting } from '../../lib/useCallsSorting'
import { useResettableCallsPage } from '../../lib/useResettableCallsPage'
import styles from './CallsPage.module.scss'

export const CallsPage = () => {
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

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="Список звонков">
        <CallsPageToolbar
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          period={period}
          onPeriodChange={setPeriod}
          onResetFilters={handleResetFilters}
        />

        <CallsPageTable
          calls={calls}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
          sort={sort}
          onColumnSort={handleColumnSort}
          activeRecordId={activeRecordId}
          loadingRecordId={loadingRecordId}
          recordError={recordError}
          onToggleRecord={handleToggleRecord}
          onDownloadRecord={handleDownloadRecord}
          pagination={pagination}
          onPaginationPrevious={onPaginationPrevious}
          onPaginationNext={onPaginationNext}
        />
      </section>
    </main>
  )
}
