import styles from './EmployeeAvatar.module.scss'

interface EmployeeAvatarProps {
  src?: string
  name?: string
}

export const EmployeeAvatar = ({ src, name }: EmployeeAvatarProps) => {
  const fallback = name?.trim().charAt(0).toUpperCase() || 'С'

  if (src) {
    return (
      <img className={styles.avatar} src={src} alt={name ? `Сотрудник ${name}` : 'Сотрудник'} />
    )
  }

  return (
    <span className={styles.fallback} aria-label={name ? `Сотрудник ${name}` : 'Сотрудник'}>
      {fallback}
    </span>
  )
}
