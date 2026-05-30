import type { PeriodPreset } from '../model/callsFilters'
import { getNextPreset, getPreviousPreset, periodLabels } from '../model/callsFilters'
import styles from './PeriodPicker.module.scss'

type PeriodPickerProps = {
  value: PeriodPreset
  onChange: (value: PeriodPreset) => void
}

export const PeriodPicker = ({ value, onChange }: PeriodPickerProps) => {
  const handlePrevious = () => onChange(getPreviousPreset(value))
  const handleNext = () => onChange(getNextPreset(value))

  return (
    <div className={styles.root} aria-label="Период звонков">
      <button className={styles.navButton} type="button" aria-label="Предыдущий период" onClick={handlePrevious}>
        ‹
      </button>
      <button className={styles.valueButton} type="button" aria-label={`Текущий период: ${periodLabels[value]}`}>
        <span className={styles.calendarIcon} />
        {periodLabels[value]}
      </button>
      <button className={styles.navButton} type="button" aria-label="Следующий период" onClick={handleNext}>
        ›
      </button>
    </div>
  )
}
