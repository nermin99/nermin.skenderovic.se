import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card/Card'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nermin Skenderovic</title>
        <meta
          name="description"
          content="Personal website of Nermin Skenderovic, a Data Science & AI student eager to learn."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo_container}>
          <Image className={styles.logo} src="/images/logo.jpg" alt="NS Logo" layout="fill" />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid_container}>
          {/* <h1 className={`${styles.title} ${styles.grid_item_1}`}>Projects:</h1> */}
          <Card
            title="Time Calculator"
            description="A calculator for calculating time, both in the sense of elapsed time but also time strokes."
            link="https://nermin99.github.io/timecalculator/"
          />
          <Card
            title="@nermin99/priorityqueue"
            description='A simple and lightweight JavaScript priority queue library focused on functionality.'
            link="https://www.npmjs.com/package/@nermin99/priorityqueue"
          />
          <Card
            title="Prime Factorizer"
            description="Simple prime number finder and factorizer. Efficient up to ~16 digit prime numbers."
            link="https://nermin99.github.io/prime-factorizer/"
          />
          <Card
            title="NAED.se"
            description="Website for NAED Byggkonsult, a construction consultant dealing with building permits, consultation and drawings."
            link="https://naed.se/"
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.info}>
          <h1 title="Ninja">Nermin Skenderovic</h1>
          <h2>M.Sc. Data Science & AI</h2>
          <h2>B.Sc. Computer Science & Engineering</h2>
          <h3>Copenhagen, Denmark</h3>
        </div>

        <div className={styles.social_links}>
          <a href="mailto:nermin@skenderovic.se" className={styles.email}>
            <Image
              className={styles.icon_img}
              src="/icons/gmail.png"
              alt="gmail"
              layout="fill"
            />
          </a>
          <a href="https://www.linkedin.com/in/nermin-skenderovic/">
            <Image
              className={styles.icon_img}
              src="/icons/linkedin.png"
              alt="linkedin"
              layout="fill"
            />
          </a>
          <a href="https://github.com/nermin99">
            <Image
              className={styles.icon_img}
              src="/icons/github.png"
              alt="github"
              layout="fill"
            />
          </a>
          <a href="https://stackoverflow.com/users/7012917/nermin">
            <Image
              className={styles.icon_img}
              src="/icons/stack-overflow.png"
              alt="stack-overflow"
              layout="fill"
            />
          </a>
        </div>
      </footer>
    </>
  )
}

export default Home
