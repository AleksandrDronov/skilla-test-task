import { describe, expect, it, vi } from 'vitest'
import { getDateRange, getNextPreset, getPreviousPreset, mapFilterToApiValue } from './callsFilters'

describe('calls filters', () => {
  it('maps call type filter to API in_out values', () => {
    expect(mapFilterToApiValue('all')).toBeUndefined()
    expect(mapFilterToApiValue('incoming')).toBe(1)
    expect(mapFilterToApiValue('outgoing')).toBe(0)
  })

  it('builds date range for active period presets', () => {
    vi.setSystemTime(new Date('2026-05-30T12:00:00.000Z'))

    expect(getDateRange('threeDays')).toEqual({
      dateStart: '2026-05-28',
      dateEnd: '2026-05-30',
    })

    expect(getDateRange('week')).toEqual({
      dateStart: '2026-05-24',
      dateEnd: '2026-05-30',
    })

    vi.useRealTimers()
  })

  it('switches period presets in Figma date picker order', () => {
    expect(getPreviousPreset('week')).toBe('threeDays')
    expect(getNextPreset('week')).toBe('month')
    expect(getPreviousPreset('threeDays')).toBe('threeDays')
    expect(getNextPreset('year')).toBe('year')
  })
})
