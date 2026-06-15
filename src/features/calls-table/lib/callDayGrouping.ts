import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import type { Call } from '@/entities/call'

dayjs.locale('ru')

export interface WithinDaySort {
  sortBy: 'date' | 'duration'
  order: 'ASC' | 'DESC'
}

interface CallDayGroup {
  dayKey: string
  label: string
  calls: Call[]
  showHeader: boolean
}

const getCallDayKey = (call: Call): string => {
  if (call.date_notime) {
    return call.date_notime
  }

  const parsedDate = dayjs(call.date)

  if (!parsedDate.isValid()) {
    return ''
  }

  return parsedDate.format('YYYY-MM-DD')
}

const isTodayDayKey = (dayKey: string, referenceDate = dayjs()): boolean => {
  const date = dayjs(dayKey)

  if (!date.isValid()) {
    return false
  }

  return date.isSame(referenceDate.startOf('day'), 'day')
}

const formatCallDayLabel = (dayKey: string, referenceDate = dayjs()): string => {
  const date = dayjs(dayKey)

  if (!date.isValid()) {
    return dayKey
  }

  const today = referenceDate.startOf('day')
  const yesterday = today.subtract(1, 'day')

  if (date.isSame(yesterday, 'day')) {
    return 'Вчера'
  }

  return date.format('D MMMM')
}

const sortCallsByDuration = (calls: Call[], order: WithinDaySort['order']) => {
  const direction = order === 'ASC' ? 1 : -1

  return [...calls].sort((left, right) => ((left.time ?? 0) - (right.time ?? 0)) * direction)
}

const sortCallsByDate = (calls: Call[], order: WithinDaySort['order']) => {
  const direction = order === 'ASC' ? 1 : -1

  return [...calls].sort((left, right) => {
    const leftTime = dayjs(left.date).valueOf()
    const rightTime = dayjs(right.date).valueOf()

    if (Number.isNaN(leftTime) || Number.isNaN(rightTime)) {
      return 0
    }

    return (leftTime - rightTime) * direction
  })
}

const sortCallsWithinDay = (calls: Call[], withinDaySort?: WithinDaySort) => {
  if (!withinDaySort) {
    return calls
  }

  if (withinDaySort.sortBy === 'duration') {
    return sortCallsByDuration(calls, withinDaySort.order)
  }

  return sortCallsByDate(calls, withinDaySort.order)
}

export const groupCallsByDay = (calls: Call[], withinDaySort?: WithinDaySort): CallDayGroup[] => {
  const groupsByDay = new Map<string, Call[]>()

  calls.forEach((call) => {
    const dayKey = getCallDayKey(call)
    const dayCalls = groupsByDay.get(dayKey)

    if (dayCalls) {
      dayCalls.push(call)
      return
    }

    groupsByDay.set(dayKey, [call])
  })

  const groups = [...groupsByDay.entries()]
    .sort(([leftDay], [rightDay]) => rightDay.localeCompare(leftDay))
    .map(([dayKey, dayCalls]) => ({
      dayKey,
      label: formatCallDayLabel(dayKey),
      calls: sortCallsWithinDay(dayCalls, withinDaySort),
      showHeader: !isTodayDayKey(dayKey),
    }))

  return groups
}
