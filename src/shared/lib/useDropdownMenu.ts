import { useCallback, useRef, useState } from 'react'
import { useDismissOnClickOutside } from './useDismissOnClickOutside'

/**
 * Состояние и обработчики выпадающего меню: открытие, выбор значения, закрытие с фокусом на триггер.
 * При выборе вызывает `onChange` и закрывает меню; клик снаружи и Escape тоже закрывают.
 *
 * @param onChange — колбэк при выборе пункта меню.
 * @returns Флаг `isOpen`, ref корня и триггера, `handleToggle` и `handleSelect`.
 */
export const useDropdownMenu = <T>(onChange: (value: T) => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus()
  }, [])

  const handleClose = useCallback(() => {
    focusTrigger()
    setIsOpen(false)
  }, [focusTrigger])

  useDismissOnClickOutside({
    isOpen,
    onClose: handleClose,
    containerRef: rootRef,
  })

  const handleToggle = useCallback(() => {
    setIsOpen((current) => {
      if (current) {
        focusTrigger()
      }

      return !current
    })
  }, [focusTrigger])

  const handleSelect = useCallback(
    (nextValue: T) => {
      onChange(nextValue)
      handleClose()
    },
    [handleClose, onChange],
  )

  return {
    isOpen,
    rootRef,
    triggerRef,
    handleToggle,
    handleSelect,
  }
}
