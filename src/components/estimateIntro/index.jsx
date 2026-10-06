import styles from './styles.module.css'

const EstimateIntro = () => (
  <section className={styles.intro} id="overview">
    <div className={styles.copy}>
      <h1>Put a clear number around your next project.</h1>
      <p>Plan the work, size the effort, and turn the sum into a client-ready estimate.</p>
    </div>
    <figure className={styles.imageCard}>
      <img
        src={`${import.meta.env.BASE_URL}images/project-tower.jpg`}
        alt="A geometric glass office tower viewed from below"
      />
      <figcaption>Work shaped into a clear estimate.</figcaption>
    </figure>
  </section>
)

export default EstimateIntro