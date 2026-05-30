import { memo } from 'react'
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

const AudioPlayerPreviewComponent = ({
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
        <svg
          width="13"
          height="16"
          viewBox="0 0 13 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M0 16H13V14.1176H0V16ZM13 5.64706H9.28571V0H3.71429V5.64706H0L6.5 12.2353L13 5.64706Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}

export const AudioPlayerPreview = memo(AudioPlayerPreviewComponent)
