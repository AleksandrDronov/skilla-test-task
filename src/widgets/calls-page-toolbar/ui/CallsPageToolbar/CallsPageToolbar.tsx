import { memo } from 'react'
import { CallTypeSelect, type CallTypeFilter } from '@/features/filter-calls-by-type'
import { PeriodPicker, type PeriodPreset } from '@/features/filter-calls-by-period'
import { Chip } from '@/shared/ui'
import styles from './CallsPageToolbar.module.scss'

export interface CallsPageToolbarProps {
  typeFilter: CallTypeFilter
  onTypeFilterChange: (value: CallTypeFilter) => void
  period: PeriodPreset
  onPeriodChange: (value: PeriodPreset) => void
  onResetFilters: () => void
}

const CallsPageToolbarComponent = ({
  typeFilter,
  onTypeFilterChange,
  period,
  onPeriodChange,
  onResetFilters,
}: CallsPageToolbarProps) => (
  <header className={styles.toolbar}>
    <div className={styles.filterGroup}>
      <CallTypeSelect value={typeFilter} onChange={onTypeFilterChange} />
      {typeFilter !== 'all' ? <Chip label="Сбросить фильтры" onDismiss={onResetFilters} /> : null}
    </div>
    <PeriodPicker value={period} onChange={onPeriodChange} />
  </header>
)

export const CallsPageToolbar = memo(CallsPageToolbarComponent)
