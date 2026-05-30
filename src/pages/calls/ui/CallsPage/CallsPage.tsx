import { CallsPageTable } from '@/widgets/calls-page-table'
import { CallsPageToolbar } from '@/widgets/calls-page-toolbar'
import { useCallsPage } from '../../lib/useCallsPage'
import styles from './CallsPage.module.scss'

export const CallsPage = () => {
  const { toolbar, table } = useCallsPage()

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="Список звонков">
        <CallsPageToolbar {...toolbar} />
        <CallsPageTable {...table} />
      </section>
    </main>
  )
}
