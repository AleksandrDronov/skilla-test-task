import clsx from 'clsx'
import type { Call } from '../../model/types'
import styles from './CallIcon.module.scss'

interface CallIconProps {
  call: Call
}

export const CallIcon = ({ call }: CallIconProps) => {
  const isIncoming = call.in_out === 1
  const isMissed = /не|fail/i.test(call.status)

  const getAriaLabel = () => {
    if (isMissed) {
      return 'Пропущенный звонок'
    }

    if (isIncoming) {
      return 'Входящий звонок'
    }

    return 'Исходящий звонок'
  }

  return (
    <span
      className={clsx(styles.icon, {
        [styles.incoming]: isIncoming && !isMissed,
        [styles.outgoing]: !isIncoming && !isMissed,
        [styles.missed]: isMissed,
      })}
      aria-label={getAriaLabel()}
      role="img"
    >
      <span className={styles.arrow} />
    </span>
  )
}
