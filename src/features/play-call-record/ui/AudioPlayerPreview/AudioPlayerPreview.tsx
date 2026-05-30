import type { Call } from '@/entities/call'
import { formatRecordTime } from '@/shared/lib'
import styles from './AudioPlayerPreview.module.scss'

interface AudioPlayerPreviewProps {
  call: Call
  isActive: boolean
  isLoading: boolean
  onToggle: (call: Call) => void
  onDownload: (call: Call) => void
}

export const AudioPlayerPreview = ({
  call,
  isActive,
  isLoading,
  onToggle,
  onDownload,
}: AudioPlayerPreviewProps) => {
  const duration = formatRecordTime(call.time)

  const getPlayButtonSymbol = () => {
    if (isLoading) {
      return '…'
    }

    if (isActive) {
      return 'Ⅱ'
    }

    return '▶'
  }

  return (
    <div className={styles.root}>
      <span className={styles.duration}>{duration}</span>
      <button
        className={styles.playButton}
        type="button"
        aria-label={isActive ? 'Поставить запись на паузу' : 'Воспроизвести запись'}
        disabled={isLoading || !call.record}
        onClick={() => onToggle(call)}
      >
        {getPlayButtonSymbol()}
      </button>
      <div className={styles.progress} aria-hidden="true">
        <span className={isActive ? styles.progressActive : undefined} />
      </div>
      <button
        className={styles.downloadButton}
        type="button"
        aria-label="Скачать запись"
        disabled={!call.record}
        onClick={() => onDownload(call)}
      >
        ↓
      </button>
    </div>
  )
}
