import { describe, expect, it } from 'vitest'
import { mapFilterToApiValue } from './mapFilterToApi'

describe('mapFilterToApiValue', () => {
  it('маппит входящие звонки в значение API', () => {
    expect(mapFilterToApiValue('incoming')).toBe(1)
  })

  it('маппит исходящие звонки в значение API', () => {
    expect(mapFilterToApiValue('outgoing')).toBe(0)
  })

  it('не передаёт фильтр в API, когда выбраны все типы звонков', () => {
    expect(mapFilterToApiValue('all')).toBeUndefined()
  })
})
