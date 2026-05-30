import { useCallback, useState, type SetStateAction } from 'react'
import { env } from '@/shared/config'

interface PageState {
  resetKey: string
  page: number
}

export const useResettableCallsPage = (resetPageKey: string) => {
  const [pageState, setPageState] = useState<PageState>(() => ({
    resetKey: resetPageKey,
    page: 1,
  }))
  const page = pageState.resetKey === resetPageKey ? pageState.page : 1
  const offset = (page - 1) * env.apiCallsLimit

  const setPage = useCallback(
    (value: SetStateAction<number>) => {
      setPageState((current) => {
        const currentPage = current.resetKey === resetPageKey ? current.page : 1
        const nextPage = typeof value === 'function' ? value(currentPage) : value

        return {
          resetKey: resetPageKey,
          page: nextPage,
        }
      })
    },
    [resetPageKey],
  )

  return {
    page,
    offset,
    setPage,
  }
}
