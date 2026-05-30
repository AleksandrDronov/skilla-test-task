import { useState } from 'react'
import { useGetCallsQuery } from '@/entities/call'
import {
  CallTypeSelect,
  callTypeLabels,
  mapFilterToApiValue,
  type CallTypeFilter,
} from '@/features/filter-calls-by-type'
import { getDateRange, PeriodPicker, type PeriodPreset } from '@/features/filter-calls-by-period'
import { useCallAudio } from '@/features/play-call-record'
import {
  defaultCallsSort,
  getNextSortState,
  mapOrderToApiValue,
  mapSortToApiValue,
  type CallsSortState,
  type SortByApiValue,
} from '@/features/sort-calls'
import { CallsTable } from '@/widgets/calls-table'
import styles from './CallsPage.module.scss'

export const CallsPage = () => {
  const [typeFilter, setTypeFilter] = useState<CallTypeFilter>('all')
  const [sort, setSort] = useState<CallsSortState>(defaultCallsSort)
  const [period, setPeriod] = useState<PeriodPreset>('threeDays')
  const dateRange = getDateRange(period)
  const { data, isLoading, isError, refetch } = useGetCallsQuery({
    inOut: mapFilterToApiValue(typeFilter),
    dateStart: dateRange.dateStart,
    dateEnd: dateRange.dateEnd,
    sortBy: mapSortToApiValue(sort.sortBy),
    order: mapOrderToApiValue(sort),
  })
  const { activeRecordId, loadingRecordId, handleToggleRecord, handleDownloadRecord } =
    useCallAudio()
  const calls = data?.results ?? []

  const handleResetFilters = () => {
    setTypeFilter('all')
  }

  const handleColumnSort = (column: SortByApiValue) => {
    setSort((current) => getNextSortState(current, column))
  }

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="Список звонков">
        <div className={styles.toolbar}>
          <div className={styles.filterGroup}>
            <CallTypeSelect value={typeFilter} onChange={setTypeFilter} />
            {typeFilter !== 'all' ? (
              <button className={styles.resetButton} type="button" onClick={handleResetFilters}>
                {callTypeLabels[typeFilter]}
                <span aria-hidden="true">×</span>
              </button>
            ) : null}
          </div>
          <PeriodPicker value={period} onChange={setPeriod} />
        </div>

        {isLoading ? <div className={styles.state}>Загрузка звонков...</div> : null}

        {isError ? (
          <div className={styles.state}>
            <p>Не удалось загрузить список звонков</p>
            <button className={styles.retryButton} type="button" onClick={() => refetch()}>
              Повторить
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && calls.length === 0 ? (
          <div className={styles.state}>Нет звонков за выбранный период</div>
        ) : null}

        {!isLoading && !isError && calls.length > 0 ? (
          <CallsTable
            calls={calls}
            sort={sort}
            onColumnSort={handleColumnSort}
            activeRecordId={activeRecordId}
            loadingRecordId={loadingRecordId}
            onToggleRecord={handleToggleRecord}
            onDownloadRecord={handleDownloadRecord}
          />
        ) : null}
      </section>
    </main>
  )
}
