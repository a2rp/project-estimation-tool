import styles from './styles.module.css'

const links = [
  { label: 'Portfolio', href: 'https://www.ashishranjan.net' },
  { label: 'GitHub', href: 'https://github.com/a2rp' },
  { label: 'CodePen', href: 'https://codepen.io/ash1198' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashishranjan' },
  { label: 'Facebook', href: 'https://www.facebook.com/theash.ashish/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1' },
  { label: 'Email', href: 'mailto:ash.ranjan09@gmail.com' },
  { label: 'Source code', href: 'https://github.com/a2rp/project-estimation-tool' },
]

const supportLinks = [
  { label: 'Support', href: 'https://a2rp-donation-page.netlify.app/' },
  { label: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/ashishranjan' },
  { label: 'Patreon', href: 'https://www.patreon.com/ashishranjan' },
]

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <div className={styles.identity}>
        <a href="https://www.ashishranjan.net" target="_blank" rel="noreferrer" aria-label="Ashish Ranjan portfolio">
          <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Ashish Ranjan" />
        </a>
        <p>
          © {new Date().getFullYear()} <a href="https://github.com/a2rp" target="_blank" rel="noreferrer">Ashish Ranjan</a>.
          {' '}All rights reserved.
        </p>
      </div>

      <div className={styles.groups}>
        <nav className={styles.group} aria-label="Links">
          <h2>Links</h2>
          <ul className={styles.linkList}>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  className={styles.link}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={styles.group} aria-label="Support">
          <h2>Support</h2>
          <ul className={styles.linkList}>
            {supportLinks.map((link) => (
              <li key={link.label}>
                <a className={styles.link} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </footer>
)

export default Footer