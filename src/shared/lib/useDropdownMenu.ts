import { useRef, useState } from 'react'
import { useDismissOnClickOutside } from './useDismissOnClickOutside'

export const useDropdownMenu = <T>(onChange: (value: T) => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useDismissOnClickOutside({
    isOpen,
    onClose: () => setIsOpen(false),
    containerRef: rootRef,
  })

  const handleToggle = () => {
    setIsOpen((current) => !current)
  }

  const handleSelect = (value: T) => {
    onChange(value)
    setIsOpen(false)
  }

  return {
    isOpen,
    rootRef,
    handleToggle,
    handleSelect,
  }
}
