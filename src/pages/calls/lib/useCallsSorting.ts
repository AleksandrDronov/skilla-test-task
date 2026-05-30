import { useCallback, useState } from 'react'
import {
  defaultCallsSort,
  getNextSortState,
  mapSortToApiValue,
  type CallsSortState,
  type SortByApiValue,
} from '@/features/sort-calls'

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
