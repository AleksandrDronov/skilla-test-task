import { memo, type ReactNode } from 'react'
import type { Call } from '@/entities/call'
import { CallRow } from '../CallRow/CallRow'
import styles from './CallsTable.module.scss'

interface CallsTableProps {
  calls: Call[]
  timeColumnHeader: ReactNode
  durationColumnHeader: ReactNode
  renderRecordPlayer?: (call: Call) => ReactNode
  footer?: ReactNode
}

const CallsTableComponent = ({
  calls,
  timeColumnHeader,
  durationColumnHeader,
  renderRecordPlayer,
  footer,
}: CallsTableProps) => (
  <div className={styles.root}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.typeHeader}>Тип</th>
          <th className={styles.timeHeader}>{timeColumnHeader}</th>
          <th className={styles.employeeHeader}>Сотрудник</th>
          <th className={styles.callHeader}>Звонок</th>
          <th className={styles.sourceHeader}>Источник</th>
          <th className={styles.gradeHeader}>Оценка</th>
          <th className={styles.durationHeader}>{durationColumnHeader}</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <CallRow
            key={call.id}
            call={call}
            recordPlayer={call.record && renderRecordPlayer ? renderRecordPlayer(call) : undefined}
          />
        ))}
      </tbody>
    </table>

    {footer}
  </div>
)

export const CallsTable = memo(CallsTableComponent)
