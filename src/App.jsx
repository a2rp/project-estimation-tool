import EstimateIntro from './components/estimateIntro/index.jsx'
import Header from './components/header/index.jsx'
import styles from './App.module.css'

const App = () => (
  <div className={styles.app} id="top">
    <Header />
    <main className={styles.workspace}>
      <EstimateIntro />
      <section className={styles.estimate} id="estimate">
        <h2>Your estimate workspace is taking shape.</h2>
        <p>Scope, effort, and price will come together here.</p>
      </section>
      <section className={styles.saved} id="saved-estimates">
        <h2>Saved estimates</h2>
      </section>
    </main>
  </div>
)

export default App