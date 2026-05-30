import { memo, type ReactNode } from 'react'
import { CallIcon, EmployeeAvatar, type Call } from '@/entities/call'
import { formatCallDuration, formatCallTime, formatPhoneNumber } from '@/shared/lib'
import styles from './CallRow.module.scss'

interface CallRowProps {
  call: Call
  recordPlayer?: ReactNode
}

const getCallContact = (call: Call) => {
  if (call.contact_name) {
    return call.contact_name
  }

  return formatPhoneNumber(call.in_out === 1 ? (call.from_number ?? '') : (call.to_number ?? ''))
}

const CallRowComponent = ({ call, recordPlayer }: CallRowProps) => {
  const contact = getCallContact(call)
  const company = call.contact_company

  return (
    <tr className={styles.row}>
      <td className={styles.typeCell}>
        <CallIcon call={call} />
      </td>
      <td className={styles.timeCell}>{formatCallTime(call.date)}</td>
      <td className={styles.avatarCell}>
        <EmployeeAvatar src={call.person_avatar} name={call.person_name} />
      </td>
      <td className={styles.callCell}>
        <span className={styles.contact}>{contact}</span>
        {company ? <span className={styles.company}>{company}</span> : null}
      </td>
      <td className={styles.sourceCell}>{call.source}</td>
      <td className={styles.gradeCell} aria-label="Оценка" />
      <td className={styles.durationCell}>
        <span className={styles.duration}>{formatCallDuration(call.time)}</span>
        {recordPlayer ? <div className={styles.player}>{recordPlayer}</div> : null}
      </td>
    </tr>
  )
}

export const CallRow = memo(CallRowComponent)
