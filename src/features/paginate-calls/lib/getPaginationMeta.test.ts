import { describe, expect, it } from 'vitest'
import { getPaginationMeta } from './getPaginationMeta'

describe('getPaginationMeta', () => {
  it('считает диапазон страницы и навигацию, когда общее число строк известно', () => {
    const meta = getPaginationMeta(2, 50, '125', 50)

    expect(meta).toEqual({
      page: 2,
      pageSize: 50,
      totalRows: 125,
      totalPages: 3,
      rangeStart: 51,
      rangeEnd: 100,
      canGoPrevious: true,
      canGoNext: true,
    })
  })

  it('ограничивает запрошенную страницу последней доступной', () => {
    const meta = getPaginationMeta(4, 50, '125', 25)

    expect(meta.page).toBe(3)
    expect(meta.rangeStart).toBe(101)
    expect(meta.rangeEnd).toBe(125)
    expect(meta.canGoNext).toBe(false)
  })

  it('оценивает доступность следующей страницы, когда общее число строк неизвестно', () => {
    const meta = getPaginationMeta(1, 50, undefined, 50)

    expect(meta.totalRows).toBe(0)
    expect(meta.totalPages).toBe(2)
    expect(meta.rangeStart).toBe(1)
    expect(meta.rangeEnd).toBe(50)
    expect(meta.canGoNext).toBe(true)
  })

  it('возвращает пустой диапазон, когда на текущей странице нет звонков', () => {
    const meta = getPaginationMeta(1, 50, undefined, 0)

    expect(meta.rangeStart).toBe(0)
    expect(meta.rangeEnd).toBe(-1)
    expect(meta.canGoPrevious).toBe(false)
    expect(meta.canGoNext).toBe(false)
  })
})
