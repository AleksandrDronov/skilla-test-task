import type { PaginationMeta } from '../../lib/getPaginationMeta'
import styles from './CallsPagination.module.scss'

interface CallsPaginationProps {
  meta: PaginationMeta
  onPrevious: () => void
  onNext: () => void
}

const formatRangeLabel = (meta: PaginationMeta): string => {
  if (meta.rangeStart === 0) {
    return 'Нет записей'
  }

  if (meta.totalRows > 0) {
    return `${meta.rangeStart}–${meta.rangeEnd} из ${meta.totalRows}`
  }

  return `${meta.rangeStart}–${meta.rangeEnd}`
}

export const CallsPagination = ({ meta, onPrevious, onNext }: CallsPaginationProps) => (
  <nav className={styles.root} aria-label="Пагинация списка звонков">
    <p className={styles.info}>{formatRangeLabel(meta)}</p>

    <div className={styles.controls}>
      <span className={styles.pageLabel}>
        Страница {meta.page} из {meta.totalPages}
      </span>

      <button
        className={styles.navButton}
        type="button"
        aria-label="Предыдущая страница"
        disabled={!meta.canGoPrevious}
        onClick={onPrevious}
      >
        Назад
      </button>

      <button
        className={styles.navButton}
        type="button"
        aria-label="Следующая страница"
        disabled={!meta.canGoNext}
        onClick={onNext}
      >
        Вперёд
      </button>
    </div>
  </nav>
)
