import { describe, expect, it, vi, type Mock } from 'vitest'
import { createAudioController, type AudioLike } from './audioController'

interface TestAudio extends AudioLike {
  play: Mock<() => Promise<void>>
  pause: Mock<() => void>
}

const createAudio = (currentTime = 12): TestAudio => ({
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  currentTime,
  onended: null,
})

describe('createAudioController', () => {
  it('запускает запись и сохраняет её как активную', async () => {
    const controller = createAudioController()
    const audio = createAudio()

    await controller.play('record-1', audio)

    expect(audio.play).toHaveBeenCalledTimes(1)
    expect(controller.getActiveId()).toBe('record-1')
  })

  it('останавливает предыдущую запись при запуске новой', async () => {
    const controller = createAudioController()
    const firstAudio = createAudio(30)
    const secondAudio = createAudio()

    await controller.play('record-1', firstAudio)
    await controller.play('record-2', secondAudio)

    expect(firstAudio.pause).toHaveBeenCalledTimes(1)
    expect(firstAudio.currentTime).toBe(0)
    expect(secondAudio.play).toHaveBeenCalledTimes(1)
    expect(controller.getActiveId()).toBe('record-2')
  })

  it('останавливает активную запись при повторном запуске того же id', async () => {
    const controller = createAudioController()
    const audio = createAudio(24)
    const nextAudio = createAudio()

    await controller.play('record-1', audio)
    await controller.play('record-1', nextAudio)

    expect(audio.pause).toHaveBeenCalledTimes(1)
    expect(audio.currentTime).toBe(0)
    expect(nextAudio.play).not.toHaveBeenCalled()
    expect(controller.getActiveId()).toBeNull()
  })

  it('сбрасывает активную запись при ручной остановке', async () => {
    const controller = createAudioController()
    const audio = createAudio(8)

    await controller.play('record-1', audio)
    controller.stop()

    expect(audio.pause).toHaveBeenCalledTimes(1)
    expect(audio.currentTime).toBe(0)
    expect(controller.getActiveId()).toBeNull()
  })

  it('сбрасывает активную запись после завершения аудио', async () => {
    const controller = createAudioController()
    const audio = createAudio(18)

    await controller.play('record-1', audio)
    audio.onended?.(new Event('ended'))

    expect(audio.pause).toHaveBeenCalledTimes(1)
    expect(audio.currentTime).toBe(0)
    expect(controller.getActiveId()).toBeNull()
  })
})
