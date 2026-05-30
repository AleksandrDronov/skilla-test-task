import { describe, expect, it, vi } from 'vitest'
import {
  getDateRange,
  getNextPreset,
  getNextSortState,
  getPreviousPreset,
  mapFilterToApiValue,
  mapOrderToApiValue,
  mapSortToApiValue,
} from './callsFilters'

describe('calls filters', () => {
  it('maps call type filter to API in_out values', () => {
    expect(mapFilterToApiValue('all')).toBeUndefined()
    expect(mapFilterToApiValue('incoming')).toBe(1)
    expect(mapFilterToApiValue('outgoing')).toBe(0)
  })

  it('maps sort filter to API sort_by values', () => {
    expect(mapSortToApiValue('none')).toBeUndefined()
    expect(mapSortToApiValue('date')).toBe('date')
    expect(mapSortToApiValue('duration')).toBe('duration')
  })

  it('maps sort order to API order only when sort_by is active', () => {
    expect(mapOrderToApiValue({ sortBy: 'none', order: 'DESC' })).toBeUndefined()
    expect(mapOrderToApiValue({ sortBy: 'date', order: 'ASC' })).toBe('ASC')
    expect(mapOrderToApiValue({ sortBy: 'duration', order: 'DESC' })).toBe('DESC')
  })

  it('cycles column sort through DESC, ASC and off', () => {
    expect(getNextSortState({ sortBy: 'none', order: 'DESC' }, 'date')).toEqual({
      sortBy: 'date',
      order: 'DESC',
    })

    expect(getNextSortState({ sortBy: 'date', order: 'DESC' }, 'date')).toEqual({
      sortBy: 'date',
      order: 'ASC',
    })

    expect(getNextSortState({ sortBy: 'date', order: 'ASC' }, 'date')).toEqual({
      sortBy: 'none',
      order: 'DESC',
    })

    expect(getNextSortState({ sortBy: 'date', order: 'ASC' }, 'duration')).toEqual({
      sortBy: 'duration',
      order: 'DESC',
    })
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
