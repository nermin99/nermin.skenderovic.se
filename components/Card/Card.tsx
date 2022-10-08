import styles from './Card.module.scss'

interface CardProps {
  title: string
  description: string
  link: string
}

export default function Card(props: CardProps) {
  return (
    <a href={props.link} className={`${styles.card} ${styles.grid_item}`}>
      <h2 className={styles.title}>{props.title} &rarr;</h2>
      <p className={styles.description}>{props.description}</p>
      {/* &rarr; */}
    </a>
  )
}
