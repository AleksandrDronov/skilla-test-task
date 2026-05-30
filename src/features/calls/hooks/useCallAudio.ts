import { useMemo, useRef, useState } from 'react'
import { createAudioController } from '../model/audioController'
import { useLazyGetCallRecordQuery } from '../../../services/callsApi/callsApi'
import type { Call } from '../types/call'

export const useCallAudio = () => {
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null)
  const [loadingRecordId, setLoadingRecordId] = useState<string | null>(null)
  const audioUrlsRef = useRef(new Map<string, string>())
  const controller = useMemo(() => createAudioController(), [])
  const [getRecord] = useLazyGetCallRecordQuery()

  const handleToggleRecord = async (call: Call) => {
    if (!call.record) {
      return
    }

    if (activeRecordId === call.record) {
      controller.stop()
      setActiveRecordId(null)
      return
    }

    setLoadingRecordId(call.record)

    try {
      let url = audioUrlsRef.current.get(call.record)

      if (!url) {
        const blob = await getRecord({
          recordId: call.record,
          partnershipId: call.partnership_id,
        }).unwrap()

        url = URL.createObjectURL(blob)
        audioUrlsRef.current.set(call.record, url)
      }

      const audio = new Audio(url)
      await controller.play(call.record, audio)
      setActiveRecordId(call.record)
    } finally {
      setLoadingRecordId(null)
    }
  }

  const handleDownloadRecord = async (call: Call) => {
    if (!call.record) {
      return
    }

    let url = audioUrlsRef.current.get(call.record)

    if (!url) {
      const blob = await getRecord({
        recordId: call.record,
        partnershipId: call.partnership_id,
      }).unwrap()

      url = URL.createObjectURL(blob)
      audioUrlsRef.current.set(call.record, url)
    }

    const link = document.createElement('a')
    link.href = url
    link.download = `call-${call.record}.mp3`
    link.click()
  }

  return {
    activeRecordId,
    loadingRecordId,
    handleToggleRecord,
    handleDownloadRecord,
  }
}
