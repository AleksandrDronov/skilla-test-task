import { type Call, type GetCallsQueryParams, useGetCallsQuery } from '@/entities/call'

const EMPTY_CALLS: Call[] = []

/**
 * Загружает звонки через RTK Query по параметрам API.
 *
 * @param queryArgs — параметры запроса списка звонков.
 * @returns Список звонков, общее число строк, флаги загрузки/ошибки и повтор запроса.
 */
export const useCallsData = (queryArgs: GetCallsQueryParams) => {
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
