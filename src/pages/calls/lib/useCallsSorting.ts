import { useCallback, useState } from 'react'
import {
  defaultCallsSort,
  getNextSortState,
  mapSortToApiValue,
  type CallsSortState,
  type SortByApiValue,
} from '@/features/sort-calls'

/**
 * Управляет сортировкой таблицы звонков по колонкам.
 * Держит UI-состояние сортировки и маппит его в параметры API (`sortBy`, `order`).
 *
 * @returns Текущая сортировка, значения для запроса и обработчик клика по заголовку колонки.
 */
export const useCallsSorting = () => {
  const [sort, setSort] = useState<CallsSortState>(defaultCallsSort)
  const sortByApiValue = mapSortToApiValue(sort.sortBy)
  const orderApiValue = sortByApiValue === undefined ? undefined : sort.order

  const handleColumnSort = useCallback((column: SortByApiValue) => {
    setSort((current) => getNextSortState(current, column))
  }, [])

  return {
    sort,
    sortByApiValue,
    orderApiValue,
    handleColumnSort,
  }
}
