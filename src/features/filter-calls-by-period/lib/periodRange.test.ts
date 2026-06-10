import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getDateRange, getNextPreset, getPreviousPreset } from './periodRange'

describe('periodRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-10T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('считает диапазоны дат включительно от текущего дня', () => {
    expect(getDateRange('threeDays')).toEqual({
      dateStart: '2026-06-08',
      dateEnd: '2026-06-10',
    })
    expect(getDateRange('week')).toEqual({
      dateStart: '2026-06-04',
      dateEnd: '2026-06-10',
    })
  })

  it('не переключает предыдущий пресет дальше первой опции', () => {
    expect(getPreviousPreset('threeDays')).toBe('threeDays')
    expect(getPreviousPreset('month')).toBe('week')
  })

  it('не переключает следующий пресет дальше последней опции', () => {
    expect(getNextPreset('month')).toBe('year')
    expect(getNextPreset('year')).toBe('year')
  })
})
