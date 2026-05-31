import { createContext, useContext, type RefObject } from 'react'

export interface DropdownMenuContextValue {
  value: unknown
  isOpen: boolean
  rootRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLButtonElement | null>
  handleToggle: () => void
  handleSelect: (value: unknown) => void
}

export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

/**
 * Доступ к состоянию compound-компонента `DropdownMenu` из `Trigger` и `Panel`.
 *
 * @template T — тип значения выбранной опции.
 * @returns Контекст меню с типизированными `value` и `handleSelect`.
 * @throws Если хук вызван вне `<DropdownMenu>`.
 */
export const useDropdownMenuContext = <T>() => {
  const context = useContext(DropdownMenuContext)

  if (!context) {
    throw new Error('DropdownMenu components must be used within DropdownMenu')
  }

  return {
    ...context,
    value: context.value as T,
    handleSelect: context.handleSelect as (value: T) => void,
  }
}
