import { describe, expect, it } from 'vitest'
import { getNextSortState, mapOrderToApiValue, mapSortToApiValue } from './sortState'

describe('sortState', () => {
  it('маппит поддерживаемые поля сортировки в значения API', () => {
    expect(mapSortToApiValue('date')).toBe('date')
    expect(mapSortToApiValue('duration')).toBe('duration')
    expect(mapSortToApiValue('none')).toBeUndefined()
  })

  it('не передаёт порядок сортировки в API, когда сортировка выключена', () => {
    expect(mapOrderToApiValue({ sortBy: 'none', order: 'DESC' })).toBeUndefined()
  })

  it('переключает колонку между убыванием, возрастанием и выключенным состоянием', () => {
    const descending = getNextSortState({ sortBy: 'none', order: 'DESC' }, 'date')
    const ascending = getNextSortState(descending, 'date')
    const disabled = getNextSortState(ascending, 'date')

    expect(descending).toEqual({ sortBy: 'date', order: 'DESC' })
    expect(ascending).toEqual({ sortBy: 'date', order: 'ASC' })
    expect(disabled).toEqual({ sortBy: 'none', order: 'DESC' })
  })

  it('сбрасывает порядок к значению по умолчанию при смене колонки сортировки', () => {
    expect(getNextSortState({ sortBy: 'date', order: 'ASC' }, 'duration')).toEqual({
      sortBy: 'duration',
      order: 'DESC',
    })
  })
})
