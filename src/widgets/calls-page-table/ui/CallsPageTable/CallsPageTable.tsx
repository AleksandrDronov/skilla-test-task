import { memo, useCallback } from 'react'
import type { Call } from '@/entities/call'
import { CallsTable } from '@/features/calls-table'
import { CallsPagination, type PaginationMeta } from '@/features/paginate-calls'
import { AudioPlayerPreview } from '@/features/play-call-record'
import { SortableColumnHeader, type CallsSortState, type SortByApiValue } from '@/features/sort-calls'
import styles from './CallsPageTable.module.scss'

interface CallsPageTableProps {
  calls: Call[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  sort: CallsSortState
  onColumnSort: (column: SortByApiValue) => void
  activeRecordId: string | null
  loadingRecordId: string | null
  recordError: string | null
  onToggleRecord: (call: Call) => void
  onDownloadRecord: (call: Call) => void
  pagination?: PaginationMeta
  onPaginationPrevious?: () => void
  onPaginationNext?: () => void
}

const CallsPageTableComponent = ({
  calls,
  isLoading,
  isError,
  onRetry,
  sort,
  onColumnSort,
  activeRecordId,
  loadingRecordId,
  recordError,
  onToggleRecord,
  onDownloadRecord,
  pagination,
  onPaginationPrevious,
  onPaginationNext,
}: CallsPageTableProps) => {
  const renderRecordPlayer = useCallback(
    (call: Call) => (
      <AudioPlayerPreview
        call={call}
        isActive={activeRecordId === call.record}
        isLoading={loadingRecordId === call.record}
        onToggle={onToggleRecord}
        onDownload={onDownloadRecord}
      />
    ),
    [activeRecordId, loadingRecordId, onToggleRecord, onDownloadRecord],
  )

  const tableFooter =
    pagination && onPaginationPrevious && onPaginationNext ? (
      <CallsPagination
        meta={pagination}
        onPrevious={onPaginationPrevious}
        onNext={onPaginationNext}
      />
    ) : null

  return (
    <>
      {isLoading ? <div className={styles.state}>Загрузка звонков...</div> : null}

      {isError ? (
        <div className={styles.state}>
          <p>Не удалось загрузить список звонков</p>
          <button className={styles.retryButton} type="button" onClick={onRetry}>
            Повторить
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && calls.length === 0 ? (
        <div className={styles.state}>Нет звонков за выбранный период</div>
      ) : null}

      {recordError ? (
        <div className={styles.state} role="alert">
          {recordError}
        </div>
      ) : null}

      {!isLoading && !isError && calls.length > 0 ? (
        <CallsTable
          calls={calls}
          timeColumnHeader={
            <SortableColumnHeader
              label="Время"
              sortKey="date"
              sort={sort}
              onColumnSort={onColumnSort}
            />
          }
          durationColumnHeader={
            <SortableColumnHeader
              label="Длительность"
              sortKey="duration"
              sort={sort}
              align="right"
              onColumnSort={onColumnSort}
            />
          }
          renderRecordPlayer={renderRecordPlayer}
          footer={tableFooter}
        />
      ) : null}
    </>
  )
}

export const CallsPageTable = memo(CallsPageTableComponent)
