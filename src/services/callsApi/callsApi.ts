import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Call, CallsResponse } from '../../features/calls/types/call'
import type { CallTypeFilter, CallsSortState, PeriodPreset } from '../../features/calls/model/callsFilters'
import {
  getDateRange,
  mapFilterToApiValue,
  mapOrderToApiValue,
  mapSortToApiValue,
} from '../../features/calls/model/callsFilters'
import { env } from '../../shared/config/env'

type GetCallsParams = {
  typeFilter: CallTypeFilter
  period: PeriodPreset
  sort: CallsSortState
}

type GetRecordParams = {
  recordId: string
  partnershipId?: string
}

const normalizeCallsResponse = (response: unknown): CallsResponse => {
  if (!response || typeof response !== 'object') {
    return { results: [] }
  }

  const candidate = response as Partial<CallsResponse>

  if (!Array.isArray(candidate.results)) {
    return { results: [] }
  }

  return {
    total_rows: candidate.total_rows,
    results: candidate.results as Call[],
  }
}

export const callsApi = createApi({
  reducerPath: 'callsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${env.apiToken}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCalls: builder.query<CallsResponse, GetCallsParams>({
      query: ({ typeFilter, period, sort }) => {
        const inOut = mapFilterToApiValue(typeFilter)
        const sortByApi = mapSortToApiValue(sort.sortBy)
        const orderApi = mapOrderToApiValue(sort)
        const dateRange = getDateRange(period)

        return {
          url: '/mango/getList',
          method: 'POST',
          params: {
            date_start: dateRange.dateStart,
            date_end: dateRange.dateEnd,
            limit: env.apiCallsLimit,
            ...(inOut === undefined ? {} : { in_out: inOut }),
            ...(sortByApi === undefined ? {} : { sort_by: sortByApi }),
            ...(orderApi === undefined ? {} : { order: orderApi }),
          },
        }
      },
      transformResponse: normalizeCallsResponse,
    }),
    getCallRecord: builder.query<Blob, GetRecordParams>({
      query: ({ recordId, partnershipId }) => ({
        url: '/mango/getRecord',
        method: 'POST',
        params: {
          record: recordId,
          ...(partnershipId ? { partnership_id: partnershipId } : {}),
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
})

export const { useGetCallsQuery, useLazyGetCallRecordQuery } = callsApi
