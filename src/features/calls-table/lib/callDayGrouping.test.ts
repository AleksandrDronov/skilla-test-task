import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import type { Call } from '@/entities/call'
import { groupCallsByDay } from './callDayGrouping'

const createCall = (overrides: Partial<Call>): Call => ({
  id: 1,
  in_out: 1,
  status: 'Дозвонился',
  date: '2026-06-14 10:00:00',
  date_notime: '2026-06-14',
  ...overrides,
})

describe('groupCallsByDay', () => {
  it('groups calls by day in descending day order', () => {
    const today = dayjs().format('YYYY-MM-DD')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    const calls = [
      createCall({ id: 1, date_notime: today, date: `${today} 12:00:00` }),
      createCall({ id: 2, date_notime: today, date: `${today} 11:00:00` }),
      createCall({ id: 3, date_notime: yesterday, date: `${yesterday} 18:00:00` }),
    ]

    const groups = groupCallsByDay(calls)

    expect(groups).toHaveLength(2)
    expect(groups[0]).toMatchObject({
      dayKey: today,
      showHeader: false,
      calls: [calls[0], calls[1]],
    })
    expect(groups[1]).toMatchObject({
      dayKey: yesterday,
      showHeader: true,
      label: 'Вчера',
      calls: [calls[2]],
    })
  })

  it('uses date_notime when available', () => {
    const groups = groupCallsByDay([createCall({ id: 1, date_notime: '2026-06-13' })])

    expect(groups[0]?.dayKey).toBe('2026-06-13')
  })

  it('falls back to date when date_notime is missing', () => {
    const groups = groupCallsByDay([
      createCall({
        id: 1,
        date: '2026-06-12 15:30:00',
        date_notime: undefined,
      }),
    ])

    expect(groups[0]?.dayKey).toBe('2026-06-12')
  })

  it('formats labels for yesterday and older days without header for today', () => {
    const today = dayjs().format('YYYY-MM-DD')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

    const groups = groupCallsByDay([
      createCall({ id: 1, date_notime: today }),
      createCall({ id: 2, date_notime: yesterday }),
      createCall({ id: 3, date_notime: '2026-06-10' }),
    ])

    expect(groups[0]?.showHeader).toBe(false)
    expect(groups[1]?.label).toBe('Вчера')
    expect(groups[1]?.showHeader).toBe(true)
    expect(groups[2]?.label).toBe('10 июня')
    expect(groups[2]?.showHeader).toBe(true)
  })

  it('sorts calls by duration within each day group', () => {
    const day = '2026-06-10'
    const calls = [
      createCall({ id: 1, date_notime: day, time: 120 }),
      createCall({ id: 2, date_notime: day, time: 30 }),
      createCall({ id: 3, date_notime: day, time: 60 }),
    ]

    const groups = groupCallsByDay(calls, { sortBy: 'duration', order: 'ASC' })

    expect(groups[0]?.calls.map((call) => call.id)).toEqual([2, 3, 1])
  })

  it('sorts calls by time within each day group', () => {
    const day = '2026-06-10'
    const calls = [
      createCall({ id: 1, date: `${day} 12:00:00` }),
      createCall({ id: 2, date: `${day} 09:00:00` }),
      createCall({ id: 3, date: `${day} 15:30:00` }),
    ]

    const groups = groupCallsByDay(calls, { sortBy: 'date', order: 'ASC' })

    expect(groups[0]?.calls.map((call) => call.id)).toEqual([2, 1, 3])
  })

  it('merges non-consecutive calls of the same day into one group', () => {
    const day = '2026-06-10'
    const calls = [
      createCall({ id: 1, date_notime: day }),
      createCall({ id: 2, date_notime: '2026-06-09' }),
      createCall({ id: 3, date_notime: day }),
    ]

    const groups = groupCallsByDay(calls)

    expect(groups).toHaveLength(2)
    expect(groups[0]?.calls.map((call) => call.id)).toEqual([1, 3])
    expect(groups[1]?.calls.map((call) => call.id)).toEqual([2])
  })
})
