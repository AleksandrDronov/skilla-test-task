import { useRef, useState } from 'react'
import { useDismissOnClickOutside } from './useDismissOnClickOutside'

export const useDropdownMenu = <T>(onChange: (value: T) => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const focusTrigger = () => {
    triggerRef.current?.focus()
  }

  const handleClose = () => {
    focusTrigger()
    setIsOpen(false)
  }

  useDismissOnClickOutside({
    isOpen,
    onClose: handleClose,
    containerRef: rootRef,
  })

  const handleToggle = () => {
    setIsOpen((current) => {
      if (current) {
        focusTrigger()
      }

      return !current
    })
  }

  const handleSelect = (value: T) => {
    onChange(value)
    handleClose()
  }

  return {
    isOpen,
    rootRef,
    triggerRef,
    handleToggle,
    handleSelect,
  }
}
