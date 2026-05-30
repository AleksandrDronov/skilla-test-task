import { useCallback, useEffect, useMemo, type Dispatch, type SetStateAction } from 'react'
import { env } from '@/shared/config'
import { getPaginationMeta, type PaginationMeta } from './getPaginationMeta'

/** Входные данные для расчёта пагинации списка звонков. */
export interface UseCallsPaginationOptions {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  totalRowsRaw?: string
  currentResultsCount: number
}

/** Результат: размер страницы и, при необходимости, метаданные и обработчики «назад»/«вперёд». */
export interface UseCallsPaginationResult {
  pageSize: number
  pagination?: PaginationMeta
  onPaginationPrevious?: () => void
  onPaginationNext?: () => void
}

/**
 * Пагинация таблицы звонков по ответу API (`total_rows`) и текущей выборке.
 * Синхронизирует номер страницы, если он выходит за допустимый диапазон.
 * Если страниц одна и навигация не нужна — возвращает только `pageSize`.
 *
 * @param options — текущая страница, сеттер, общее число строк и размер текущей порции.
 * @returns Метаданные пагинации и обработчики или минимальный объект без навигации.
 */
export const useCallsPagination = ({
  page,
  setPage,
  totalRowsRaw,
  currentResultsCount,
}: UseCallsPaginationOptions): UseCallsPaginationResult => {
  const pageSize = env.apiCallsLimit

  const pagination = useMemo(
    () => getPaginationMeta(page, pageSize, totalRowsRaw, currentResultsCount),
    [currentResultsCount, page, pageSize, totalRowsRaw],
  )
  const hasPagination =
    pagination.totalPages > 1 || pagination.canGoNext || pagination.canGoPrevious

  useEffect(() => {
    if (page !== pagination.page) {
      setPage(pagination.page)
    }
  }, [page, pagination.page, setPage])

  const handlePaginationPrevious = useCallback(() => {
    setPage((current) => Math.max(1, current - 1))
  }, [setPage])

  const handlePaginationNext = useCallback(() => {
    setPage((current) => current + 1)
  }, [setPage])

  if (!hasPagination) {
    return {
      pageSize,
    }
  }

  return {
    pageSize,
    pagination,
    onPaginationPrevious: handlePaginationPrevious,
    onPaginationNext: handlePaginationNext,
  }
}
