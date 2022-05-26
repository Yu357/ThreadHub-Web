import styles from '../styles/header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.largeContainer}>
        <a href='/' className={styles.logo}>Thread Hub</a>

      </div>
    </header>
  )
}

export default Header