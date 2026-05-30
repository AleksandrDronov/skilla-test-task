import clsx from 'clsx'
import type { Call } from '../types/call'
import styles from './CallIcon.module.scss'

type CallIconProps = {
  call: Call
}

export const CallIcon = ({ call }: CallIconProps) => {
  const isIncoming = call.in_out === 1
  const isMissed = /не|fail/i.test(call.status)

  return (
    <span
      className={clsx(styles.icon, {
        [styles.incoming]: isIncoming && !isMissed,
        [styles.outgoing]: !isIncoming && !isMissed,
        [styles.missed]: isMissed,
      })}
      aria-label={isMissed ? 'Пропущенный звонок' : isIncoming ? 'Входящий звонок' : 'Исходящий звонок'}
      role="img"
    >
      <span className={styles.arrow} />
    </span>
  )
}
