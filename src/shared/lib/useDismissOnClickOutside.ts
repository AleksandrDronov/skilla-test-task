import { useEffect, useRef, type RefObject } from 'react'

/** Параметры закрытия оверлея по клику вне области или Escape. */
interface UseDismissOnClickOutsideParams {
  isOpen: boolean
  onClose: () => void
  containerRef: RefObject<HTMLElement | null>
}

/**
 * Закрывает открытый UI при клике вне `containerRef` или нажатии Escape.
 * Слушатели вешаются только пока `isOpen === true`.
 *
 * @param params — флаг открытия, колбэк закрытия и ref контейнера, клики внутри которого игнорируются.
 */
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
