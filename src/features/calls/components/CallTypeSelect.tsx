import { useState } from 'react'
import clsx from 'clsx'
import type { CallTypeFilter } from '../model/callsFilters'
import { callTypeLabels } from '../model/callsFilters'
import styles from './CallTypeSelect.module.scss'

type CallTypeSelectProps = {
  value: CallTypeFilter
  onChange: (value: CallTypeFilter) => void
}

const options: CallTypeFilter[] = ['all', 'incoming', 'outgoing']

export const CallTypeSelect = ({ value, onChange }: CallTypeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (nextValue: CallTypeFilter) => {
    onChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div className={styles.root}>
      <button className={styles.trigger} type="button" onClick={() => setIsOpen((current) => !current)}>
        {callTypeLabels[value]}
        <span className={clsx(styles.arrow, isOpen && styles.arrowOpen)} />
      </button>

      {isOpen ? (
        <div className={styles.menu} role="listbox" aria-label="Тип звонка">
          {options.map((option) => (
            <button
              className={clsx(styles.option, option === value && styles.optionActive)}
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              onClick={() => handleSelect(option)}
            >
              {callTypeLabels[option]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
