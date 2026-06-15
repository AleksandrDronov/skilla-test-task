import { memo } from 'react'
import styles from './CallsTableDayHeader.module.scss'

interface CallsTableDayHeaderProps {
  label: string
  count: number
}

const CallsTableDayHeaderComponent = ({ label, count }: CallsTableDayHeaderProps) => (
  <tr className={styles.row}>
    <td colSpan={7} className={styles.cell}>
      <span className={styles.label}>{label}</span>
      <span className={styles.count} aria-label={`${count} звонков`}>
        {count}
      </span>
    </td>
  </tr>
)

export const CallsTableDayHeader = memo(CallsTableDayHeaderComponent)
