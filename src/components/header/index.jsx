import { useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { LuCalculator, LuMenu, LuX } from 'react-icons/lu'
import styles from './styles.module.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const closeOnOutsideClick = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutsideClick)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" onClick={closeMenu} aria-label="Scopecraft home">
          <span className={styles.mark}><LuCalculator aria-hidden="true" /></span>
          <span className={styles.wordmark}>scopecraft<span>.</span></span>
        </a>

        <nav
          className={`${styles.navigation} ${menuOpen ? styles.open : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a href="#overview" onClick={closeMenu}>Overview</a>
          <a href="#estimate" onClick={closeMenu}>Estimate</a>
          <a href="#saved-estimates" onClick={closeMenu}>Saved estimates</a>
        </nav>

        <a
          className={styles.repository}
          href="https://github.com/a2rp/project-estimation-tool"
          target="_blank"
          rel="noreferrer"
          aria-label="Open the public GitHub repository"
        >
          <FaGithub aria-hidden="true" /> <span>Repository</span>
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

export default Header