import type { KeyboardEvent } from 'react'
import clsx from 'clsx'
import type { CallsSortState, SortByApiValue } from '../../model/types'
import styles from './SortableColumnHeader.module.scss'

interface SortableColumnHeaderProps {
  label: string
  sortKey: SortByApiValue
  sort: CallsSortState
  onColumnSort: (column: SortByApiValue) => void
  align?: 'left' | 'right'
}

const sortOrderLabels = {
  ASC: 'по возрастанию',
  DESC: 'по убыванию',
} as const

export const SortableColumnHeader = ({
  label,
  sortKey,
  sort,
  onColumnSort,
  align = 'left',
}: SortableColumnHeaderProps) => {
  const isActive = sort.sortBy === sortKey

  const handleClick = () => {
    onColumnSort(sortKey)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    handleClick()
  }

  return (
    <button
      className={clsx(
        styles.root,
        align === 'right' && styles.rootRight,
        isActive && styles.rootActive,
      )}
      type="button"
      aria-pressed={isActive}
      aria-label={
        isActive
          ? `Сортировка по ${label.toLowerCase()} ${sortOrderLabels[sort.order]}`
          : `Сортировать по ${label.toLowerCase()}`
      }
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span>{label}</span>
      <span
        className={clsx(
          styles.icon,
          isActive && sort.order === 'ASC' && styles.iconAsc,
          isActive && sort.order === 'DESC' && styles.iconDesc,
        )}
        aria-hidden="true"
      />
    </button>
  )
}
