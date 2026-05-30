import clsx from 'clsx'
import { DropdownMenu, useDropdownMenuContext } from '@/shared/ui'
import { callTypeLabels } from '../../model/constants'
import type { CallTypeFilter } from '../../model/types'
import styles from './CallTypeSelect.module.scss'

interface CallTypeSelectProps {
  value: CallTypeFilter
  onChange: (value: CallTypeFilter) => void
}

const options: CallTypeFilter[] = ['all', 'incoming', 'outgoing']

const CallTypeSelectTrigger = ({ value }: { value: CallTypeFilter }) => {
  const { isOpen } = useDropdownMenuContext<CallTypeFilter>()

  return (
    <DropdownMenu.Trigger
      className={clsx(styles.trigger, value === 'all' && styles.triggerDefault)}
    >
      {callTypeLabels[value]}
      <span className={clsx(styles.arrow, isOpen && styles.arrowOpen)} aria-hidden />
    </DropdownMenu.Trigger>
  )
}

export const CallTypeSelect = ({ value, onChange }: CallTypeSelectProps) => (
  <DropdownMenu value={value} onChange={onChange}>
    <CallTypeSelectTrigger value={value} />
    <DropdownMenu.Panel
      options={options}
      getOptionLabel={(option) => callTypeLabels[option]}
      ariaLabel="Тип звонка"
    />
  </DropdownMenu>
)
