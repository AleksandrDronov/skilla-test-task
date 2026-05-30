import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from 'react'
import clsx from 'clsx'
import { useDropdownMenu } from '@/shared/lib'
import styles from './DropdownMenu.module.scss'

type DropdownMenuContextValue = {
  value: unknown
  isOpen: boolean
  rootRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLButtonElement | null>
  handleToggle: () => void
  handleSelect: (value: unknown) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

export const useDropdownMenuContext = <T,>() => {
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

interface DropdownMenuProps<T> {
  value: T
  onChange: (value: T) => void
  children: ReactNode
  className?: string
  ariaLabel?: string
}

const DropdownMenuRoot = <T,>({
  value,
  onChange,
  children,
  className,
  ariaLabel,
}: DropdownMenuProps<T>) => {
  const { isOpen, rootRef, triggerRef, handleToggle, handleSelect } = useDropdownMenu(onChange)

  return (
    <DropdownMenuContext.Provider
      value={{
        value,
        isOpen,
        rootRef,
        triggerRef,
        handleToggle,
        handleSelect: (nextValue) => handleSelect(nextValue as T),
      }}
    >
      <div className={clsx(styles.root, className)} ref={rootRef} aria-label={ariaLabel}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  children: ReactNode
  className?: string
  ariaLabel?: string
}

const DropdownMenuTrigger = ({ children, className, ariaLabel }: DropdownMenuTriggerProps) => {
  const { isOpen, triggerRef, handleToggle } = useDropdownMenuContext()

  return (
    <button
      ref={triggerRef}
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      onClick={handleToggle}
    >
      {children}
    </button>
  )
}

interface DropdownMenuPanelProps<T> {
  options: readonly T[]
  getOptionLabel: (value: T) => string
  getOptionKey?: (value: T) => string
  ariaLabel: string
  className?: string
  placement?: 'left' | 'right'
}

const DropdownMenuPanel = <T,>({
  options,
  getOptionLabel,
  getOptionKey,
  ariaLabel,
  className,
  placement = 'left',
}: DropdownMenuPanelProps<T>) => {
  const { value, isOpen, handleSelect } = useDropdownMenuContext<T>()

  return (
    <div
      className={clsx(
        styles.panel,
        placement === 'right' && styles.panelRight,
        isOpen && styles.panelOpen,
        className,
      )}
      role="listbox"
      aria-label={ariaLabel}
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
    >
      {options.map((option) => (
        <button
          key={getOptionKey?.(option) ?? String(option)}
          type="button"
          role="option"
          className={clsx(styles.option, option === value && styles.optionActive)}
          aria-selected={option === value}
          tabIndex={isOpen ? 0 : -1}
          onClick={() => handleSelect(option)}
        >
          {getOptionLabel(option)}
        </button>
      ))}
    </div>
  )
}

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Panel: DropdownMenuPanel,
})
