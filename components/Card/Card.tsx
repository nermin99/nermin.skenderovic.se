import styles from './Card.module.scss'

interface CardProps {
  title: string
  description: string
  link: string
}

export default function Card(props: CardProps) {
  const handleOnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget

    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    target.style.setProperty('--mouse-x', x + 'px')
    target.style.setProperty('--mouse-y', y + 'px')
  }

  return (
    <a
      href={props.link}
      className={`${styles.card} ${styles.grid_item}`}
      onMouseMove={handleOnMouseMove}
    >
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.description}>{props.description}</p>
      {/* &rarr; */}
    </a>
  )
}
