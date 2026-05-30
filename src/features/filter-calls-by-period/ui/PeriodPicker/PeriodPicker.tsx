import { getNextPreset, getPreviousPreset } from '../../lib/periodRange'
import { periodLabels } from '../../model/constants'
import type { PeriodPreset } from '../../model/types'
import styles from './PeriodPicker.module.scss'

interface PeriodPickerProps {
  value: PeriodPreset
  onChange: (value: PeriodPreset) => void
}

export const PeriodPicker = ({ value, onChange }: PeriodPickerProps) => {
  const handlePrevious = () => onChange(getPreviousPreset(value))
  const handleNext = () => onChange(getNextPreset(value))

  return (
    <div className={styles.root} aria-label="Период звонков">
      <button
        className={styles.navButton}
        type="button"
        aria-label="Предыдущий период"
        onClick={handlePrevious}
      >
        ‹
      </button>
      <button
        className={styles.valueButton}
        type="button"
        aria-label={`Текущий период: ${periodLabels[value]}`}
      >
        <span className={styles.calendarIcon} />
        {periodLabels[value]}
      </button>
      <button
        className={styles.navButton}
        type="button"
        aria-label="Следующий период"
        onClick={handleNext}
      >
        ›
      </button>
    </div>
  )
}
