import { useEffect, useRef, type RefObject } from 'react'

interface UseDismissOnClickOutsideParams {
  isOpen: boolean
  onClose: () => void
  containerRef: RefObject<HTMLElement | null>
}

export const useDismissOnClickOutside = ({
  isOpen,
  onClose,
  containerRef,
}: UseDismissOnClickOutsideParams) => {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return
      onCloseRef.current()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      onCloseRef.current()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, containerRef])
}
