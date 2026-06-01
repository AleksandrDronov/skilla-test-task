import { type DateRange } from '@/features/filter-calls-by-period'
import { mapFilterToApiValue, type CallTypeFilter } from '@/features/filter-calls-by-type'
import { type SortByApiValue, type SortOrder } from '@/features/sort-calls'
import { type Call, type GetCallsQueryParams, useGetCallsQuery } from '@/entities/call'

const EMPTY_CALLS: Call[] = []

/** Параметры запроса списка звонков для страницы. */
interface UseCallsDataParams {
  typeFilter: CallTypeFilter
  dateRange: DateRange
  offset: number
  sortByApiValue?: SortByApiValue
  orderApiValue?: SortOrder
}

/**
 * Загружает страницу звонков через RTK Query с учётом фильтров, пагинации и сортировки.
 *
 * @param params — фильтр типа, диапазон дат, offset и опциональная сортировка для API.
 * @returns Список звонков, общее число строк, флаги загрузки/ошибки и повтор запроса.
 */
export const useCallsData = ({
  typeFilter,
  dateRange,
  offset,
  sortByApiValue,
  orderApiValue,
}: UseCallsDataParams) => {
  const queryArgs: GetCallsQueryParams = {
    inOut: mapFilterToApiValue(typeFilter),
    dateStart: dateRange.dateStart,
    dateEnd: dateRange.dateEnd,
    offset,
    sortBy: sortByApiValue,
    order: orderApiValue,
  }

  const { data, isLoading, isError, refetch } = useGetCallsQuery(queryArgs)
  const calls = data?.results ?? EMPTY_CALLS

  return {
    calls,
    totalRowsRaw: data?.total_rows,
    isLoading,
    isError,
    refetch,
  }
}
