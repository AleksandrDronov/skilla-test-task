import { describe, expect, it, vi } from 'vitest'
import { createAudioController } from './audioController'

const createMockAudio = () => ({
  play: vi.fn(() => Promise.resolve()),
  pause: vi.fn(),
  currentTime: 0,
  onended: null as null | (() => void),
})

describe('audioController', () => {
  it('pauses the previous audio before playing a new record', async () => {
    const firstAudio = createMockAudio()
    const secondAudio = createMockAudio()
    const controller = createAudioController()

    await controller.play('first', firstAudio)
    await controller.play('second', secondAudio)

    expect(firstAudio.pause).toHaveBeenCalledOnce()
    expect(firstAudio.currentTime).toBe(0)
    expect(secondAudio.play).toHaveBeenCalledOnce()
    expect(controller.getActiveId()).toBe('second')
  })

  it('toggles the active audio off when the same record is requested', async () => {
    const audio = createMockAudio()
    const controller = createAudioController()

    await controller.play('first', audio)
    await controller.play('first', audio)

    expect(audio.pause).toHaveBeenCalledOnce()
    expect(controller.getActiveId()).toBeNull()
  })
})
