import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/shared/config'
import type { CallListSortField, CallListSortOrder, CallsResponse } from '../model/types'

export interface GetCallsQueryParams {
  inOut?: 0 | 1
  dateStart: string
  dateEnd: string
  sortBy?: CallListSortField
  order?: CallListSortOrder
}

interface GetRecordParams {
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
    results: candidate.results,
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
    getCalls: builder.query<CallsResponse, GetCallsQueryParams>({
      query: ({ inOut, dateStart, dateEnd, sortBy, order }) => ({
        url: '/mango/getList',
        method: 'POST',
        params: {
          date_start: dateStart,
          date_end: dateEnd,
          limit: env.apiCallsLimit,
          ...(inOut === undefined ? {} : { in_out: inOut }),
          ...(sortBy === undefined ? {} : { sort_by: sortBy }),
          ...(order === undefined ? {} : { order }),
        },
      }),
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
