import { CallsPageTable } from '@/widgets/calls-page-table'
import { CallsPageToolbar } from '@/widgets/calls-page-toolbar'
import { useCallsPageToolbar } from '../../lib/useCallsPageToolbar'
import styles from './CallsPage.module.scss'

export const CallsPage = () => {
  const { filters, toolbar } = useCallsPageToolbar()

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="Список звонков">
        <CallsPageToolbar {...toolbar} />
        <CallsPageTable filters={filters} />
      </section>
    </main>
  )
}
