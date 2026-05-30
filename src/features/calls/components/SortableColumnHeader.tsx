import type { KeyboardEvent } from 'react'
import clsx from 'clsx'
import type { CallsSortState, SortByApiValue } from '../model/callsFilters'
import styles from './SortableColumnHeader.module.scss'

type SortableColumnHeaderProps = {
  label: string
  sortKey: SortByApiValue
  sort: CallsSortState
  align?: 'left' | 'right'
  onColumnSort: (column: SortByApiValue) => void
}

const sortOrderLabels = {
  ASC: 'по возрастанию',
  DESC: 'по убыванию',
} as const

export const SortableColumnHeader = ({
  label,
  sortKey,
  sort,
  align = 'left',
  onColumnSort,
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
      className={clsx(styles.root, align === 'right' && styles.rootRight, isActive && styles.rootActive)}
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
      {align === 'right' ? (
        <span
          className={clsx(
            styles.icon,
            isActive && sort.order === 'ASC' && styles.iconAsc,
            isActive && sort.order === 'DESC' && styles.iconDesc,
          )}
          aria-hidden="true"
        />
      ) : null}
      <span>{label}</span>
      {align === 'left' ? (
        <span
          className={clsx(
            styles.icon,
            isActive && sort.order === 'ASC' && styles.iconAsc,
            isActive && sort.order === 'DESC' && styles.iconDesc,
          )}
          aria-hidden="true"
        />
      ) : null}
    </button>
  )
}
