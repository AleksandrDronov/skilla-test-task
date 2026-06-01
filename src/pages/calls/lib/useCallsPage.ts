import { type CallsPageTableProps } from '@/widgets/calls-page-table'
import { type CallsPageToolbarProps } from '@/widgets/calls-page-toolbar'
import { useCallsPageTable } from './useCallsPageTable'
import { useCallsPageToolbar } from './useCallsPageToolbar'

/** Пропсы для виджетов тулбара и таблицы страницы звонков. */
interface UseCallsPageResult {
  toolbar: CallsPageToolbarProps
  table: CallsPageTableProps
}

/**
 * Фасад страницы звонков: связывает сфокусированные page-level хуки с UI страницы.
 * Возвращает готовые пропсы для `CallsPageToolbar` и `CallsPageTable`.
 *
 * @returns Объект `{ toolbar, table }` для передачи в виджеты без промежуточной логики в UI.
 */
export const useCallsPage = (): UseCallsPageResult => {
  const { filters, toolbar } = useCallsPageToolbar()
  const table = useCallsPageTable(filters)

  return {
    toolbar,
    table,
  }
}
