import styles from './Chip.module.scss'

interface ChipProps {
  label: string
  onDismiss: () => void
  dismissAriaLabel?: string
}

export const Chip = ({ label, onDismiss, dismissAriaLabel }: ChipProps) => {
  const closeLabel = dismissAriaLabel ?? label

  return (
    <div className={styles.root}>
      <span className={styles.label}>{label}</span>
      <button type="button" className={styles.dismiss} aria-label={closeLabel} onClick={onDismiss}>
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}
