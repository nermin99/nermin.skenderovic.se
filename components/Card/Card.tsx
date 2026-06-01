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
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      onMouseMove={handleOnMouseMove}
    >
      <div className={styles.card_content}>
        <div className={styles.card_header}>
          <h2 className={styles.title}>{props.title}</h2>
          <span className={styles.arrow} aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </div>
        <p className={styles.description}>{props.description}</p>
      </div>
    </a>
  )
}
