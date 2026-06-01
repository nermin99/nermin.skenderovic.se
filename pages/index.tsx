import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card/Card'
import styles from '../styles/Home.module.scss'

const projects = [
  {
    title: 'skanetrafiken-delays.se',
    description: 'Live & historical train delays across the Öresund strait.',
    link: 'https://skanetrafiken-delays.se',
  },
  {
    title: 'TimeCalculator.guru',
    description: 'Free online easy to use calculator for time and duration expressions.',
    link: 'https://timecalculator.guru/',
  },
  {
    title: '@nermin99/priorityqueue',
    description:
      'A simple and lightweight JavaScript priority queue library focused on functionality.',
    link: 'https://www.npmjs.com/package/@nermin99/priorityqueue',
  },
  {
    title: 'Prime Factorizer',
    description: 'Simple prime number finder and factorizer. Efficient up to ~16 digit prime numbers.',
    link: 'https://nermin99.github.io/prime-factorizer/',
  },
]

const socials = [
  {
    label: 'Email',
    href: 'mailto:nermin@skenderovic.se',
    icon: '/icons/gmail.png',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nermin-skenderovic/',
    icon: '/icons/linkedin.png',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/nermin99',
    icon: '/icons/github.png',
  },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/7012917/nermin',
    icon: '/icons/stack-overflow.png',
  },
]

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nermin Skenderovic</title>
        <meta
          name="description"
          content="Personal website of Nermin Skenderovic."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo_container}>
          <Image
            className={styles.logo}
            src="/images/logo.jpg"
            alt="NS Logo"
            width={96}
            height={96}
          />
        </div>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Personal site</p>
          <h1 className={styles.name}>Nermin Skenderovic</h1>
          <p className={styles.tagline}>Software Engineer · JS/TS Enthusiast</p>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.projects}>
          <h2 className={styles.section_label}>Projects</h2>
          <div className={styles.grid_container}>
            {projects.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                link={project.link}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.info}>
          <h2 title="Ninja">Nermin Skenderovic</h2>
          <p>M.Sc. Data Science &amp; AI</p>
          <p>B.Sc. Computer Science &amp; Engineering</p>
          <p className={styles.location}>Malmö, Sweden</p>
        </div>

        <nav className={styles.social_links} aria-label="Social links">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={styles.social}
              aria-label={social.label}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              <span className={styles.icon_img}>
                <Image src={social.icon} alt="" width={22} height={22} />
              </span>
            </a>
          ))}
        </nav>
      </footer>
    </>
  )
}

export default Home
