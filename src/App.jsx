import { useEffect, useState } from 'react'
import ConfirmDialog from './components/confirmDialog/index.jsx'
import EstimateIntro from './components/estimateIntro/index.jsx'
import EstimateLibrary from './components/estimateLibrary/index.jsx'
import Header from './components/header/index.jsx'
import { calculateEstimate, createEstimate, formatMoney, loadEstimates, saveEstimates } from './data/estimates.js'
import styles from './App.module.css'

const App = () => {
  const [estimates, setEstimates] = useState(loadEstimates)
  const [activeId, setActiveId] = useState(() => loadEstimates()[0]?.id ?? null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const activeEstimate = estimates.find((estimate) => estimate.id === activeId)

  useEffect(() => {
    saveEstimates(estimates)
  }, [estimates])

  const addEstimate = () => {
    const estimate = createEstimate()
    setEstimates((current) => [estimate, ...current])
    setActiveId(estimate.id)
  }

  const deleteEstimate = () => {
    setEstimates((current) => {
      const remaining = current.filter((estimate) => estimate.id !== pendingDelete.id)
      if (activeId === pendingDelete.id) setActiveId(remaining[0]?.id ?? null)
      return remaining
    })
  }

  const summary = activeEstimate ? calculateEstimate(activeEstimate) : null

  return (
    <div className={styles.app} id="top">
      <Header />
      <main className={styles.workspace}>
        <EstimateIntro />
        <div className={styles.workbench}>
          <section className={styles.estimate} id="estimate">
            {activeEstimate ? (
              <>
                <h2>{activeEstimate.title}</h2>
                <p>{activeEstimate.client || 'Add a client and project details to get started.'}</p>
                <div className={styles.summary}>
                  <span>{summary.hours} planned hours</span>
                  <strong>{formatMoney(summary.total, activeEstimate.currency)}</strong>
                </div>
                <p className={styles.note}>Project details and the editable work plan are coming next.</p>
              </>
            ) : (
              <div className={styles.empty}>
                <h2>No estimate selected</h2>
                <p>Create a new estimate to begin planning a project.</p>
              </div>
            )}
          </section>
          <div id="saved-estimates">
            <EstimateLibrary
              estimates={estimates}
              activeId={activeId}
              onSelect={setActiveId}
              onCreate={addEstimate}
              onRequestDelete={setPendingDelete}
            />
          </div>
        </div>
      </main>
      {pendingDelete && (
        <ConfirmDialog
          title="Delete estimate?"
          description="This will remove the saved estimate from this browser."
          itemName={pendingDelete.title || 'Untitled estimate'}
          confirmLabel="Delete estimate"
          onClose={() => setPendingDelete(null)}
          onConfirm={deleteEstimate}
        />
      )}
    </div>
  )
}

export default App