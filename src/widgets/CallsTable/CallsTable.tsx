import type { Call } from '../../features/calls/types/call'
import { CallRow } from '../../features/calls/components/CallRow'
import styles from './CallsTable.module.scss'

type CallsTableProps = {
  calls: Call[]
  activeRecordId: string | null
  loadingRecordId: string | null
  onToggleRecord: (call: Call) => void
  onDownloadRecord: (call: Call) => void
}

export const CallsTable = ({
  calls,
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
          <th className={styles.timeHeader}>Время</th>
          <th className={styles.employeeHeader}>Сотрудник</th>
          <th className={styles.callHeader}>Звонок</th>
          <th className={styles.sourceHeader}>Источник</th>
          <th className={styles.gradeHeader}>Оценка</th>
          <th className={styles.durationHeader}>Длительность</th>
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
