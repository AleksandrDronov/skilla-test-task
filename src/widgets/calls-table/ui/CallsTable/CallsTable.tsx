import type { Call } from '@/entities/call'
import {
  SortableColumnHeader,
  type CallsSortState,
  type SortByApiValue,
} from '@/features/sort-calls'
import { CallRow } from '../CallRow/CallRow'
import styles from './CallsTable.module.scss'

interface CallsTableProps {
  calls: Call[]
  sort: CallsSortState
  onColumnSort: (column: SortByApiValue) => void
  activeRecordId: string | null
  loadingRecordId: string | null
  onToggleRecord: (call: Call) => void
  onDownloadRecord: (call: Call) => void
}

export const CallsTable = ({
  calls,
  sort,
  onColumnSort,
  activeRecordId,
  loadingRecordId,
  onToggleRecord,
  onDownloadRecord,
}: CallsTableProps) => (
  <div className={styles.root}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.typeHeader}>Тип</th>
          <th className={styles.timeHeader}>
            <SortableColumnHeader
              label="Время"
              sortKey="date"
              sort={sort}
              onColumnSort={onColumnSort}
            />
          </th>
          <th className={styles.employeeHeader}>Сотрудник</th>
          <th className={styles.callHeader}>Звонок</th>
          <th className={styles.sourceHeader}>Источник</th>
          <th className={styles.gradeHeader}>Оценка</th>
          <th className={styles.durationHeader}>
            <SortableColumnHeader
              label="Длительность"
              sortKey="duration"
              sort={sort}
              align="right"
              onColumnSort={onColumnSort}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <CallRow
            key={call.id}
            call={call}
            activeRecordId={activeRecordId}
            loadingRecordId={loadingRecordId}
            onToggleRecord={onToggleRecord}
            onDownloadRecord={onDownloadRecord}
          />
        ))}
      </tbody>
    </table>
  </div>
)
