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
        <div className={`${styles.projects} ${styles.grid_container}`}>
          <h1 className={`${styles.title} ${styles.grid_item_1}`}>Projects:</h1>
          <Card
            title="Time Calculator"
            description="A calculator for calculating time, both in the sense of elapsed time but also time strokes."
            link="https://nermin99.github.io/timecalculator/"
          />
          <Card
            title="Space Invaders"
            description='"Space Invaders"-like game with object-oriented JS.'
            link="https://google.se"
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
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  )
}

export default Home
