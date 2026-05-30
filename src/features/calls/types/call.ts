export type CallDirection = 0 | 1

export type CallStatus = 'Дозвонился' | 'Не дозвонился' | 'Success' | 'Fail' | string

export type Call = {
  id: number
  in_out: CallDirection
  status: CallStatus
  date: string
  date_notime?: string
  from_number?: string
  to_number?: string
  source?: string
  person_avatar?: string
  person_name?: string
  contact_name?: string
  contact_company?: string
  time?: number
  record?: string
  partnership_id?: string
}

export type CallsResponse = {
  total_rows?: string
  results: Call[]
}
