import { useState } from 'react'
import { useCallAudio } from '../../features/calls/hooks/useCallAudio'
import { CallTypeSelect } from '../../features/calls/components/CallTypeSelect'
import { PeriodPicker } from '../../features/calls/components/PeriodPicker'
import type { CallTypeFilter, PeriodPreset, SortByApiValue } from '../../features/calls/model/callsFilters'
import { callTypeLabels, defaultCallsSort, getNextSortState } from '../../features/calls/model/callsFilters'
import { useGetCallsQuery } from '../../services/callsApi/callsApi'
import { CallsTable } from '../../widgets/CallsTable/CallsTable'
import styles from './CallsPage.module.scss'

export const CallsPage = () => {
  const [typeFilter, setTypeFilter] = useState<CallTypeFilter>('all')
  const [sort, setSort] = useState(defaultCallsSort)
  const [period, setPeriod] = useState<PeriodPreset>('threeDays')
  const { data, isLoading, isError, refetch } = useGetCallsQuery({ typeFilter, period, sort })
  const { activeRecordId, loadingRecordId, handleToggleRecord, handleDownloadRecord } = useCallAudio()
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
