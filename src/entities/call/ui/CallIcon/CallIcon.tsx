import clsx from 'clsx'
import type { Call } from '../../model/types'
import styles from './CallIcon.module.scss'

interface CallIconProps {
  call: Call
}

type CallIconVariant = 'incoming' | 'outgoing' | 'missed' | 'noAnswer'

const isFailedCall = (status: Call['status']) => /не|fail/i.test(status)

const getCallIconVariant = (call: Call): CallIconVariant => {
  const isIncoming = call.in_out === 1

  if (isFailedCall(call.status)) {
    return isIncoming ? 'missed' : 'noAnswer'
  }

  return isIncoming ? 'incoming' : 'outgoing'
}

const ariaLabels: Record<CallIconVariant, string> = {
  incoming: 'Входящий звонок',
  outgoing: 'Исходящий звонок',
  missed: 'Пропущенный звонок',
  noAnswer: 'Недозвон',
}

const IncomingArrow = () => (
  <svg
    className={styles.arrow}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12.5 3.5L3.5 12.5M3.5 12.5H7.5M3.5 12.5V8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const OutgoingArrow = () => (
  <svg
    className={styles.arrow}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3.5 12.5L12.5 3.5M12.5 3.5H8.5M12.5 3.5V7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CallIcon = ({ call }: CallIconProps) => {
  const variant = getCallIconVariant(call)
  const isIncomingDirection = variant === 'incoming' || variant === 'missed'

  return (
    <span
      className={clsx(styles.icon, styles[variant])}
      aria-label={ariaLabels[variant]}
      role="img"
    >
      {isIncomingDirection ? <IncomingArrow /> : <OutgoingArrow />}
    </span>
  )
}
