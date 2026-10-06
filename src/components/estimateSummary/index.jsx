import { LuDownload, LuPrinter } from 'react-icons/lu'
import { calculateEstimate, formatMoney } from '../../data/estimates.js'
import styles from './styles.module.css'

const csvCell = (value) => '"' + String(value).replace(/"/g, '""') + '"'

const EstimateSummary = ({ estimate, onChange }) => {
  const totals = calculateEstimate(estimate)

  const updateField = (field, value) => {
    onChange({ ...estimate, [field]: value, updatedAt: new Date().toISOString() })
  }

  const downloadCsv = () => {
    const rows = [
      ['Project estimate', estimate.title],
      ['Client', estimate.client],
      ['Currency', estimate.currency],
      [],
      ['Work item', 'Phase', 'Hours', 'Rate per hour', 'Amount'],
      ...estimate.items.map((item) => [
        item.work,
        item.phase,
        item.hours,
        item.rate,
        Number(item.hours) * Number(item.rate),
      ]),
      [],
      ['Labor', totals.labor],
      ['Direct expenses', totals.expenses],
      ['Contingency', totals.contingency],
      ['Estimated cost', totals.cost],
      ['Planned margin', totals.margin],
      ['Subtotal before tax', totals.subtotal],
      ['Tax', totals.tax],
      ['Estimate total', totals.total],
    ]
    const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n')
    const file = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    const fileName = estimate.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    link.href = url
    link.download = (fileName || 'project-estimate') + '.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <aside className={styles.summary} aria-label="Estimate price summary">
      <div className={styles.heading}>
        <h2>Price summary</h2>
        <div className={styles.actions}>
          <button type="button" onClick={downloadCsv} aria-label="Download estimate as CSV" title="Download CSV">
            <LuDownload aria-hidden="true" />
          </button>
          <button type="button" onClick={() => window.print()} aria-label="Print estimate" title="Print estimate">
            <LuPrinter aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.total}>
        <span>Estimate total</span>
        <strong>{formatMoney(totals.total, estimate.currency)}</strong>
        <span>Includes {Number(estimate.tax) || 0}% tax</span>
      </div>

      <div className={styles.time}>
        <div>
          <span>Planned hours</span>
          <strong>{totals.hours}</strong>
        </div>
        <div>
          <span>Estimated days</span>
          <strong>{totals.days}</strong>
        </div>
      </div>

      <div className={styles.breakdown}>
        <h3>Price breakdown</h3>
        <div><span>Labor</span><strong>{formatMoney(totals.labor, estimate.currency)}</strong></div>
        <div><span>Direct expenses</span><strong>{formatMoney(totals.expenses, estimate.currency)}</strong></div>
        <div><span>Contingency</span><strong>{formatMoney(totals.contingency, estimate.currency)}</strong></div>
        <div><span>Estimated cost</span><strong>{formatMoney(totals.cost, estimate.currency)}</strong></div>
        <div><span>Planned margin</span><strong>{formatMoney(totals.margin, estimate.currency)}</strong></div>
        <div><span>Subtotal before tax</span><strong>{formatMoney(totals.subtotal, estimate.currency)}</strong></div>
        <div><span>Tax</span><strong>{formatMoney(totals.tax, estimate.currency)}</strong></div>
      </div>

      <div className={styles.assumptions}>
        <h3>Adjust assumptions</h3>
        <label>
          <span>Direct expenses</span>
          <input
            type="number"
            min="0"
            step="10"
            value={estimate.expenses}
            onChange={(event) => updateField('expenses', Math.max(0, Number(event.target.value)))}
          />
        </label>
        <div className={styles.rates}>
          <label>
            <span>Contingency %</span>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={estimate.contingency}
              onChange={(event) => updateField('contingency', Math.min(100, Math.max(0, Number(event.target.value))))}
            />
          </label>
          <label>
            <span>Margin %</span>
            <input
              type="number"
              min="0"
              max="80"
              step="1"
              value={estimate.margin}
              onChange={(event) => updateField('margin', Math.min(80, Math.max(0, Number(event.target.value))))}
            />
          </label>
          <label>
            <span>Tax %</span>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={estimate.tax}
              onChange={(event) => updateField('tax', Math.min(100, Math.max(0, Number(event.target.value))))}
            />
          </label>
        </div>
        <p>Margin is a share of the pre-tax price. Tax is added after margin.</p>
      </div>
    </aside>
  )
}

export default EstimateSummary