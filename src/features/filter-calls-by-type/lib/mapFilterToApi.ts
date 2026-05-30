import type { CallTypeFilter } from '../model/types'

export const mapFilterToApiValue = (filter: CallTypeFilter) => {
  if (filter === 'incoming') {
    return 1
  }

  if (filter === 'outgoing') {
    return 0
  }

  return undefined
}
