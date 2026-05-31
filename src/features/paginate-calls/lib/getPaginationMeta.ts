export interface PaginationMeta {
  page: number
  pageSize: number
  totalRows: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
  canGoPrevious: boolean
  canGoNext: boolean
}

const parseTotalRows = (totalRowsRaw?: string): number => {
  if (!totalRowsRaw) {
    return 0
  }

  const parsed = Number.parseInt(totalRowsRaw, 10)

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0
  }

  return parsed
}

/**
 * Считает метаданные пагинации для таблицы звонков.
 *
 * Если `totalRowsRaw` задан и больше нуля — используется точное общее число строк
 * из ответа API (`total_rows`). Иначе число страниц и возможность «вперёд»
 * оцениваются по размеру текущей выборки: полная страница (`currentResultsCount === pageSize`)
 * означает, что может существовать следующая.
 *
 * Номер страницы ограничивается диапазоном `[1, totalPages]`.
 * При пустой выборке `rangeStart` равен 0.
 *
 * @param page — запрошенный номер страницы (1-based).
 * @param pageSize — размер страницы (число строк на странице).
 * @param totalRowsRaw — необязательная строка `total_rows` из API; при отсутствии или невалидном значении считается неизвестным.
 * @param currentResultsCount — фактическое число строк на текущей странице.
 * @returns Нормализованные метаданные: безопасная страница, диапазон отображения и флаги навигации.
 */
export const getPaginationMeta = (
  page: number,
  pageSize: number,
  totalRowsRaw?: string,
  currentResultsCount = 0,
): PaginationMeta => {
  const totalRows = parseTotalRows(totalRowsRaw)
  const hasKnownTotal = totalRows > 0
  const totalPages = hasKnownTotal
    ? Math.max(1, Math.ceil(totalRows / pageSize))
    : Math.max(1, page + (currentResultsCount === pageSize ? 1 : 0))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const rangeStart = currentResultsCount === 0 ? 0 : (safePage - 1) * pageSize + 1
  const rangeEnd = hasKnownTotal
    ? Math.min(safePage * pageSize, totalRows)
    : rangeStart + currentResultsCount - 1

  return {
    page: safePage,
    pageSize,
    totalRows,
    totalPages,
    rangeStart,
    rangeEnd,
    canGoPrevious: safePage > 1,
    canGoNext: hasKnownTotal ? safePage < totalPages : currentResultsCount === pageSize,
  }
}
