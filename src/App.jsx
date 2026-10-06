import { useEffect, useState } from 'react'
import ConfirmDialog from './components/confirmDialog/index.jsx'
import EstimateEditor from './components/estimateEditor/index.jsx'
import EstimateIntro from './components/estimateIntro/index.jsx'
import EstimateLibrary from './components/estimateLibrary/index.jsx'
import EstimateSummary from './components/estimateSummary/index.jsx'
import Header from './components/header/index.jsx'
import { createEstimate, loadEstimates, saveEstimates } from './data/estimates.js'
import styles from './App.module.css'

const App = () => {
  const [estimates, setEstimates] = useState(loadEstimates)
  const [activeId, setActiveId] = useState(() => estimates[0]?.id ?? null)
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

  const updateEstimate = (updatedEstimate) => {
    setEstimates((current) => current.map((estimate) => (
      estimate.id === updatedEstimate.id ? updatedEstimate : estimate
    )))
  }

  const requestDeleteEstimate = (estimate) => {
    setPendingDelete({
      type: 'estimate',
      id: estimate.id,
      name: estimate.title || 'Untitled estimate',
    })
  }

  const requestDeleteItem = (item) => {
    setPendingDelete({
      type: 'item',
      id: activeEstimate.id,
      itemId: item.id,
      name: item.work || 'Untitled work item',
    })
  }

  const deleteSelection = () => {
    if (!pendingDelete) return

    if (pendingDelete.type === 'estimate') {
      const remaining = estimates.filter((estimate) => estimate.id !== pendingDelete.id)
      setEstimates(remaining)
      if (activeId === pendingDelete.id) setActiveId(remaining[0]?.id ?? null)
      return
    }

    setEstimates((current) => current.map((estimate) => (
      estimate.id === pendingDelete.id
        ? {
            ...estimate,
            items: estimate.items.filter((item) => item.id !== pendingDelete.itemId),
            updatedAt: new Date().toISOString(),
          }
        : estimate
    )))
  }

  return (
    <div className={styles.app} id="top">
      <Header />
      <main className={styles.workspace}>
        <EstimateIntro />
        <div className={styles.workbench}>
          <EstimateLibrary
            estimates={estimates}
            activeId={activeId}
            onSelect={setActiveId}
            onCreate={addEstimate}
            onRequestDelete={requestDeleteEstimate}
          />
          {activeEstimate ? (
            <EstimateEditor
              estimate={activeEstimate}
              onChange={updateEstimate}
              onRequestDeleteItem={requestDeleteItem}
            />
          ) : (
            <section className={styles.empty} id="estimate">
              <h2>No estimate selected</h2>
              <p>Create a new estimate to begin planning a project.</p>
              <button type="button" onClick={addEstimate}>Create estimate</button>
            </section>
          )}
          {activeEstimate && (
            <div className={styles.summaryPanel}>
              <EstimateSummary estimate={activeEstimate} onChange={updateEstimate} />
            </div>
          )}
        </div>
      </main>
      {pendingDelete && (
        <ConfirmDialog
          title={pendingDelete.type === 'estimate' ? 'Delete estimate?' : 'Delete work item?'}
          description={
            pendingDelete.type === 'estimate'
              ? 'This estimate and its work plan will be deleted from this browser.'
              : 'This line will be removed from the estimate.'
          }
          itemName={pendingDelete.name}
          confirmLabel={pendingDelete.type === 'estimate' ? 'Delete estimate' : 'Delete item'}
          onClose={() => setPendingDelete(null)}
          onConfirm={deleteSelection}
        />
      )}
    </div>
  )
}

export default App