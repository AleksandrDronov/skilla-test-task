import type { Call } from '../types/call'
import { formatRecordTime } from '../../../shared/utils/formatters'
import styles from './AudioPlayerPreview.module.scss'

type AudioPlayerPreviewProps = {
  call: Call
  isActive: boolean
  isLoading: boolean
  onToggle: (call: Call) => void
  onDownload: (call: Call) => void
}

export const AudioPlayerPreview = ({ call, isActive, isLoading, onToggle, onDownload }: AudioPlayerPreviewProps) => {
  const duration = formatRecordTime(call.time)

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
        {isLoading ? '…' : isActive ? 'Ⅱ' : '▶'}
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
