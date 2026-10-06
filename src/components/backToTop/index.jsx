import { useEffect, useState } from 'react'
import { LuArrowUp } from 'react-icons/lu'
import styles from './styles.module.css'

const BackToTop = () => {
  const [visible, setVisible] = useState(() => window.scrollY > 50)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 50)
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!visible) return null

  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      <LuArrowUp aria-hidden="true" />
    </button>
  )
}

export default BackToTop