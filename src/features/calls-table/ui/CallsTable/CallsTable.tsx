import { Fragment, memo, useMemo, type ReactNode } from 'react'
import type { Call } from '@/entities/call'
import { groupCallsByDay, type WithinDaySort } from '../../lib/callDayGrouping'
import { CallRow } from '../CallRow/CallRow'
import { CallsTableDayHeader } from '../CallsTableDayHeader/CallsTableDayHeader'
import styles from './CallsTable.module.scss'

interface CallsTableProps {
  calls: Call[]
  withinDaySort?: WithinDaySort
  timeColumnHeader: ReactNode
  durationColumnHeader: ReactNode
  renderRecordPlayer?: (call: Call) => ReactNode
  footer?: ReactNode
}

const CallsTableComponent = ({
  calls,
  withinDaySort,
  timeColumnHeader,
  durationColumnHeader,
  renderRecordPlayer,
  footer,
}: CallsTableProps) => {
  const dayGroups = useMemo(() => groupCallsByDay(calls, withinDaySort), [calls, withinDaySort])

  return (
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
          {dayGroups.map((group) => (
            <Fragment key={`${group.dayKey}-${group.calls[0]?.id}`}>
              {group.showHeader ? (
                <CallsTableDayHeader label={group.label} count={group.calls.length} />
              ) : null}
              {group.calls.map((call) => (
                <CallRow
                  key={call.id}
                  call={call}
                  recordPlayer={
                    call.record && renderRecordPlayer ? renderRecordPlayer(call) : undefined
                  }
                />
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>

      {footer}
    </div>
  )
}

export const CallsTable = memo(CallsTableComponent)
