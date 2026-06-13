import type { Call } from '@/entities/call'
import type { DateRange, PeriodPreset } from '@/features/filter-calls-by-period'
import type { CallTypeFilter } from '@/features/filter-calls-by-type'
import type { PaginationMeta } from '@/features/paginate-calls'
import type { CallsSortState, SortByApiValue } from '@/features/sort-calls'

export interface CallsPageTableFilters {
  typeFilter: CallTypeFilter
  period: PeriodPreset
  dateRange: DateRange
}

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

export interface CallsTableQueryResult {
  query: CallsQueryProps
  sort: CallsSortProps
  pagination: CallsPaginationProps
}

export interface CallsPageTableViewProps {
  query: CallsQueryProps
  sort: CallsSortProps
  record: CallsRecordProps
  pagination: CallsPaginationProps
}

export interface CallsPageTableProps {
  filters: CallsPageTableFilters
}
