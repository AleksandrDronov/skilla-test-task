import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Call } from '@/entities/call'
import { useLazyGetCallRecordQuery } from '@/entities/call'
import { createAudioController } from '../model/audioController'

const getRecordLoadError = (error: unknown) => {
  if (error && typeof error === 'object' && 'error' in error) {
    const message = (error as { error?: string }).error

    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return 'Не удалось загрузить запись звонка'
}

/**
 * Воспроизведение и скачивание аудиозаписей звонков.
 * Кэширует blob URL по `call.record`, один активный плеер на страницу.
 *
 * @returns ID активной/загружаемой записи, текст ошибки и обработчики play/stop и download.
 */
export const useCallAudio = () => {
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null)
  const [loadingRecordId, setLoadingRecordId] = useState<string | null>(null)
  const [recordError, setRecordError] = useState<string | null>(null)
  const activeRecordIdRef = useRef<string | null>(null)
  const audioUrlsRef = useRef(new Map<string, string>())
  const controller = useMemo(() => createAudioController(), [])
  const [getRecord] = useLazyGetCallRecordQuery()

  useEffect(() => {
    activeRecordIdRef.current = activeRecordId
  }, [activeRecordId])

  useEffect(
    () => () => {
      controller.stop()
      audioUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
      audioUrlsRef.current.clear()
    },
    [controller],
  )

  const loadRecordUrl = useCallback(
    async (call: Call) => {
      if (!call.record || !call.partnership_id) {
        throw new Error('У звонка нет данных для загрузки записи')
      }

      const cachedUrl = audioUrlsRef.current.get(call.record)

      if (cachedUrl) {
        return cachedUrl
      }

      const blob = await getRecord({
        recordId: call.record,
        partnershipId: call.partnership_id,
      }).unwrap()

      const url = URL.createObjectURL(blob)
      audioUrlsRef.current.set(call.record, url)

      return url
    },
    [getRecord],
  )

  const onToggleRecord = useCallback(
    async (call: Call) => {
      if (!call.record) {
        return
      }

      if (activeRecordIdRef.current === call.record) {
        controller.stop()
        activeRecordIdRef.current = null
        setActiveRecordId(null)
        return
      }

      setRecordError(null)
      setLoadingRecordId(call.record)

      try {
        const url = await loadRecordUrl(call)
        const audio = new Audio(url)
        await controller.play(call.record, audio)
        activeRecordIdRef.current = call.record
        setActiveRecordId(call.record)
      } catch (error) {
        setRecordError(getRecordLoadError(error))
      } finally {
        setLoadingRecordId(null)
      }
    },
    [controller, loadRecordUrl],
  )

  const onDownloadRecord = useCallback(
    async (call: Call) => {
      if (!call.record) {
        return
      }

      setRecordError(null)

      try {
        const url = await loadRecordUrl(call)
        const link = document.createElement('a')
        link.href = url
        link.download = `call-${call.record}.mp3`
        link.click()
      } catch (error) {
        setRecordError(getRecordLoadError(error))
      }
    },
    [loadRecordUrl],
  )

  return {
    activeRecordId,
    loadingRecordId,
    recordError,
    onToggleRecord,
    onDownloadRecord,
  }
}
