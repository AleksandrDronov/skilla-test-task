import { memo, useCallback } from 'react'
import type { Call } from '@/entities/call'
import { CallsTable } from '@/features/calls-table'
import { CallsPagination, type PaginationMeta } from '@/features/paginate-calls'
import { AudioPlayerPreview } from '@/features/play-call-record'
import {
  SortableColumnHeader,
  type CallsSortState,
  type SortByApiValue,
} from '@/features/sort-calls'
import { CallsTableStatus } from '../CallsTableStatus/CallsTableStatus'

export interface CallsQueryProps {
  calls: Call[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export interface CallsSortProps {
  sort: CallsSortState
  onColumnSort: (column: SortByApiValue) => void
}

export interface CallsRecordProps {
  activeRecordId: string | null
  loadingRecordId: string | null
  recordError: string | null
  onToggleRecord: (call: Call) => void
  onDownloadRecord: (call: Call) => void
}

export interface CallsPaginationProps {
  pagination?: PaginationMeta
  onPrevious?: () => void
  onNext?: () => void
}

export interface CallsPageTableProps {
  query: CallsQueryProps
  sort: CallsSortProps
  record: CallsRecordProps
  pagination: CallsPaginationProps
}

const CallsPageTableComponent = ({
  query: { calls, isLoading, isError, onRetry },
  sort: { sort, onColumnSort },
  record: { activeRecordId, loadingRecordId, recordError, onToggleRecord, onDownloadRecord },
  pagination: { pagination, onPrevious, onNext },
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
    pagination && onPrevious && onNext ? (
      <CallsPagination meta={pagination} onPrevious={onPrevious} onNext={onNext} />
    ) : null

  const hasData = !isLoading && !isError && calls.length > 0

  return (
    <>
      <CallsTableStatus
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && calls.length === 0}
        recordError={recordError}
        onRetry={onRetry}
      />

      {hasData ? (
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
