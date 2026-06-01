import { memo, useCallback } from 'react'
import type { Call } from '@/entities/call'
import { CallsTable } from '@/features/calls-table'
import { CallsPagination } from '@/features/paginate-calls'
import { AudioPlayerPreview } from '@/features/play-call-record'
import { SortableColumnHeader } from '@/features/sort-calls'
import { useCallsPageTable } from '../../lib/useCallsPageTable'
import type { CallsPageTableProps, CallsPageTableViewProps } from '../../model/types'
import { CallsTableStatus } from '../CallsTableStatus/CallsTableStatus'

const CallsPageTableView = ({
  query: { calls, isLoading, isError, onRetry },
  sort: { sort, onColumnSort },
  record: { activeRecordId, loadingRecordId, recordError, onToggleRecord, onDownloadRecord },
  pagination: { pagination, onPrevious, onNext },
}: CallsPageTableViewProps) => {
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

const CallsPageTableComponent = ({ filters }: CallsPageTableProps) => {
  const table = useCallsPageTable(filters)

  return <CallsPageTableView {...table} />
}

export const CallsPageTable = memo(CallsPageTableComponent)
