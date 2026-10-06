import { useEffect } from 'react'
import { LuTrash2, LuX } from 'react-icons/lu'
import styles from './styles.module.css'

const ConfirmDialog = ({ title, description, itemName, confirmLabel, onClose, onConfirm }) => {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const confirmAction = () => {
    onConfirm()
    onClose()
  }

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <header className={styles.header}>
          <span className={styles.icon}><LuTrash2 aria-hidden="true" /></span>
          <h2 id="confirm-dialog-title">{title}</h2>
          <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close dialog">
            <LuX aria-hidden="true" />
          </button>
        </header>
        <div className={styles.body}>
          <p id="confirm-dialog-description">{description}</p>
          {itemName && <strong className={styles.itemName}>{itemName}</strong>}
        </div>
        <footer className={styles.actions}>
          <button className={styles.cancelButton} type="button" onClick={onClose} autoFocus>
            Cancel
          </button>
          <button className={styles.confirmButton} type="button" onClick={confirmAction}>
            {confirmLabel}
          </button>
        </footer>
      </section>
    </div>
  )
}

export default ConfirmDialog