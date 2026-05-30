import clsx from 'clsx'
import { DropdownMenu } from '@/shared/ui'
import { getNextPreset, getPreviousPreset } from '../../lib/periodRange'
import { periodLabels, periodOrder } from '../../model/constants'
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
    <DropdownMenu
      value={value}
      onChange={onChange}
      className={styles.root}
      ariaLabel="Период звонков"
    >
      <button
        className={styles.navButton}
        type="button"
        aria-label="Предыдущий период"
        onClick={handlePrevious}
      >
        <span className={clsx(styles.chevron, styles.chevronLeft)} aria-hidden />
      </button>

      <DropdownMenu.Trigger
        className={styles.valueButton}
        ariaLabel={`Текущий период: ${periodLabels[value]}`}
      >
        <span className={styles.calendarIcon} aria-hidden />
        {periodLabels[value]}
      </DropdownMenu.Trigger>

      <button
        className={styles.navButton}
        type="button"
        aria-label="Следующий период"
        onClick={handleNext}
      >
        <span className={clsx(styles.chevron, styles.chevronRight)} aria-hidden />
      </button>

      <DropdownMenu.Panel
        options={periodOrder}
        getOptionLabel={(preset) => periodLabels[preset]}
        ariaLabel="Выбор периода"
        placement="right"
      />
    </DropdownMenu>
  )
}
