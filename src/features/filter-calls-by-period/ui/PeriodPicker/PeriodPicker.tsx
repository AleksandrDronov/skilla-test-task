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
        <svg
          className={styles.calendarIcon}
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
            fill="currentColor"
          />
        </svg>
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
