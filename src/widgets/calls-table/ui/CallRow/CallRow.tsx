import { AudioPlayerPreview } from '@/features/play-call-record'
import { CallIcon, EmployeeAvatar, type Call } from '@/entities/call'
import { formatCallDuration, formatCallTime, formatPhoneNumber } from '@/shared/lib'
import styles from './CallRow.module.scss'

interface CallRowProps {
  call: Call
  activeRecordId: string | null
  loadingRecordId: string | null
  onToggleRecord: (call: Call) => void
  onDownloadRecord: (call: Call) => void
}

const getCallContact = (call: Call) => {
  if (call.contact_name) {
    return call.contact_name
  }

  return formatPhoneNumber(call.in_out === 1 ? (call.from_number ?? '') : (call.to_number ?? ''))
}

export const CallRow = ({
  call,
  activeRecordId,
  loadingRecordId,
  onToggleRecord,
  onDownloadRecord,
}: CallRowProps) => {
  const contact = getCallContact(call)
  const company = call.contact_company
  const hasRecord = Boolean(call.record)

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
        {hasRecord ? (
          <div className={styles.player}>
            <AudioPlayerPreview
              call={call}
              isActive={activeRecordId === call.record}
              isLoading={loadingRecordId === call.record}
              onToggle={onToggleRecord}
              onDownload={onDownloadRecord}
            />
          </div>
        ) : null}
      </td>
    </tr>
  )
}
