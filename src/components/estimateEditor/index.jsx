import { LuPlus, LuTrash2 } from 'react-icons/lu'
import { formatMoney } from '../../data/estimates.js'
import styles from './styles.module.css'

const currencyOptions = ['USD', 'EUR', 'GBP', 'INR']
const phaseOptions = ['Plan', 'Design', 'Build', 'Review', 'Launch']

const EstimateEditor = ({ estimate, onChange, onRequestDeleteItem }) => {
  const updateField = (field, value) => {
    onChange({ ...estimate, [field]: value, updatedAt: new Date().toISOString() })
  }

  const updateItem = (itemId, field, value) => {
    const items = estimate.items.map((item) => (
      item.id === itemId ? { ...item, [field]: value } : item
    ))
    onChange({ ...estimate, items, updatedAt: new Date().toISOString() })
  }

  const addItem = () => {
    const item = {
      id: 'item-' + Date.now(),
      phase: 'Plan',
      work: '',
      hours: 1,
      rate: 75,
    }
    onChange({ ...estimate, items: [...estimate.items, item], updatedAt: new Date().toISOString() })
  }

  return (
    <section className={styles.editor} aria-labelledby="estimate-title" id="estimate">
      <div className={styles.heading}>
        <div>
          <h2 id="estimate-title">Project details</h2>
          <p>Add the project information and list the work it needs.</p>
        </div>
        <span className={styles.saved}>Saved in this browser</span>
      </div>

      <div className={styles.projectFields}>
        <label className={styles.field}>
          <span>Estimate name</span>
          <input
            type="text"
            value={estimate.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="For example, Website refresh"
            maxLength={80}
          />
        </label>
        <label className={styles.field}>
          <span>Client</span>
          <input
            type="text"
            value={estimate.client}
            onChange={(event) => updateField('client', event.target.value)}
            placeholder="Client or company name"
            maxLength={80}
          />
        </label>
        <label className={styles.field}>
          <span>Currency</span>
          <select value={estimate.currency} onChange={(event) => updateField('currency', event.target.value)}>
            {currencyOptions.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
          </select>
        </label>
        <label className={styles.field + ' ' + styles.descriptionField}>
          <span>Project summary</span>
          <textarea
            value={estimate.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="What will this project deliver?"
            rows="2"
            maxLength={240}
          />
        </label>
      </div>

      <div className={styles.scopeHeading}>
        <div>
          <h3>Work plan</h3>
          <p>Estimate the hours and rate for each task.</p>
        </div>
        <button className={styles.addButton} type="button" onClick={addItem}>
          <LuPlus aria-hidden="true" />
          <span>Add work</span>
        </button>
      </div>

      {estimate.items.length > 0 ? (
        <ol className={styles.items}>
          {estimate.items.map((item, index) => (
            <li className={styles.item} key={item.id}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <div className={styles.itemFields}>
                <label className={styles.field}>
                  <span>Phase</span>
                  <select value={item.phase} onChange={(event) => updateItem(item.id, 'phase', event.target.value)}>
                    {phaseOptions.map((phase) => <option key={phase} value={phase}>{phase}</option>)}
                  </select>
                </label>
                <label className={styles.field + ' ' + styles.workField}>
                  <span>Work item</span>
                  <input
                    type="text"
                    value={item.work}
                    onChange={(event) => updateItem(item.id, 'work', event.target.value)}
                    placeholder="Describe the work"
                    maxLength={100}
                  />
                </label>
                <label className={styles.field}>
                  <span>Hours</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={item.hours}
                    onChange={(event) => updateItem(item.id, 'hours', Math.max(0, Number(event.target.value)))}
                  />
                </label>
                <label className={styles.field}>
                  <span>Rate / hour</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.rate}
                    onChange={(event) => updateItem(item.id, 'rate', Math.max(0, Number(event.target.value)))}
                  />
                </label>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => onRequestDeleteItem(item)}
                  aria-label={'Delete ' + (item.work || 'untitled work item')}
                  title="Delete work item"
                >
                  <LuTrash2 aria-hidden="true" />
                </button>
              </div>
              <div className={styles.rowTotal}>
                <span>Line total</span>
                <strong>{formatMoney(Number(item.hours) * Number(item.rate), estimate.currency)}</strong>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className={styles.empty}>
          <p>No work items yet.</p>
          <button type="button" onClick={addItem}>Add your first work item</button>
        </div>
      )}
    </section>
  )
}

export default EstimateEditor