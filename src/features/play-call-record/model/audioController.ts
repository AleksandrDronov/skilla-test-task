export interface AudioLike {
  play: () => Promise<void>
  pause: () => void
  currentTime: number
  onended: ((event: Event) => void) | null
}

export const createAudioController = () => {
  let activeId: string | null = null
  let activeAudio: AudioLike | null = null

  const stopActive = () => {
    activeAudio?.pause()

    if (activeAudio) {
      activeAudio.currentTime = 0
    }

    activeAudio = null
    activeId = null
  }

  return {
    getActiveId: () => activeId,
    play: async (recordId: string, audio: AudioLike) => {
      if (activeId === recordId) {
        stopActive()
        return
      }

      stopActive()

      activeId = recordId
      activeAudio = audio
      activeAudio.onended = stopActive

      await activeAudio.play()
    },
    stop: stopActive,
  }
}
