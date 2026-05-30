import styles from './CallsTableStatus.module.scss'

export interface CallsTableStatusProps {
  isLoading: boolean
  isError: boolean
  isEmpty: boolean
  recordError: string | null
  onRetry: () => void
}

export const CallsTableStatus = ({
  isLoading,
  isError,
  isEmpty,
  recordError,
  onRetry,
}: CallsTableStatusProps) => (
  <>
    {isLoading ? <div className={styles.state}>Загрузка звонков...</div> : null}

    {isError ? (
      <div className={styles.state}>
        <p>Не удалось загрузить список звонков</p>
        <button className={styles.retryButton} type="button" onClick={onRetry}>
          Повторить
        </button>
      </div>
    ) : null}

    {isEmpty ? <div className={styles.state}>Нет звонков за выбранный период</div> : null}

    {recordError ? (
      <div className={styles.state} role="alert">
        {recordError}
      </div>
    ) : null}
  </>
)
