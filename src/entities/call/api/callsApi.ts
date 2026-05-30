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
  partnershipId: string
}

const CALL_RECORD_CONTENT_TYPES = new Set([
  'audio/mpeg',
  'audio/x-mpeg',
  'audio/x-mpeg-3',
  'audio/mpeg3',
])

const parseRecordError = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as {
      error?: { description?: string }
    }

    if (data.error?.description) {
      return data.error.description
    }
  } catch {
    // ответ не JSON
  }

  return `Не удалось загрузить запись (код ${response.status})`
}

const parseRecordBlob = async (response: Response): Promise<Blob> => {
  const contentTypeHeader = response.headers.get('Content-Type') ?? ''

  if (!response.ok || contentTypeHeader.includes('application/json')) {
    throw new Error(await parseRecordError(response))
  }

  const data = await response.blob()
  const contentType = contentTypeHeader.split(';')[0]?.trim().toLowerCase()

  if (contentType && CALL_RECORD_CONTENT_TYPES.has(contentType)) {
    return new Blob([data], { type: contentType })
  }

  return new Blob([data], { type: 'audio/mpeg' })
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
          partnership_id: partnershipId,
        },
        responseHandler: parseRecordBlob,
      }),
    }),
  }),
})

export const { useGetCallsQuery, useLazyGetCallRecordQuery } = callsApi
