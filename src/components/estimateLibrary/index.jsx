import { LuFilePlus2, LuTrash2 } from 'react-icons/lu'
import { calculateEstimate, formatDate, formatMoney } from '../../data/estimates.js'
import styles from './styles.module.css'

const EstimateLibrary = ({ estimates, activeId, onSelect, onCreate, onRequestDelete }) => (
  <aside className={styles.library} aria-label="Saved estimates" id="saved-estimates">
    <div className={styles.heading}>
      <div>
        <h2>Estimates</h2>
        <p>{estimates.length} saved</p>
      </div>
      <button className={styles.addButton} type="button" onClick={onCreate} aria-label="Create estimate">
        <LuFilePlus2 aria-hidden="true" />
        <span>New</span>
      </button>
    </div>

    {estimates.length > 0 ? (
      <ul className={styles.list}>
        {estimates.map((estimate) => {
          const total = calculateEstimate(estimate).total
          const selected = estimate.id === activeId

          return (
            <li className={styles.item + ' ' + (selected ? styles.selected : '')} key={estimate.id}>
              <button
                className={styles.selectButton}
                type="button"
                onClick={() => onSelect(estimate.id)}
                aria-current={selected ? 'true' : undefined}
              >
                <span className={styles.title}>{estimate.title || 'Untitled estimate'}</span>
                <span className={styles.client}>{estimate.client || 'No client added'}</span>
                <span className={styles.detail}>
                  <span>{formatDate(estimate.updatedAt)}</span>
                  <strong>{formatMoney(total, estimate.currency)}</strong>
                </span>
              </button>
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => onRequestDelete(estimate)}
                aria-label={'Delete ' + (estimate.title || 'untitled estimate')}
                title="Delete estimate"
              >
                <LuTrash2 aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ul>
    ) : (
      <div className={styles.empty}>
        <p>No saved estimates yet.</p>
        <button type="button" onClick={onCreate}>Create your first estimate</button>
      </div>
    )}
  </aside>
)

export default EstimateLibrary