import { useCallback, useState } from 'react'
import { defaultCallsSort, type CallsSortState, type SortByApiValue } from '../model/types'
import { getNextSortState } from './sortState'

/**
 * Управляет клиентской сортировкой таблицы звонков по колонкам.
 *
 * @returns Текущая сортировка и обработчик клика по заголовку колонки.
 */
export const useCallsSorting = () => {
  const [sort, setSort] = useState<CallsSortState>(defaultCallsSort)

  const handleColumnSort = useCallback((column: SortByApiValue) => {
    setSort((current) => getNextSortState(current, column))
  }, [])

  return {
    sort,
    handleColumnSort,
  }
}
