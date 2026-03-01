import styles from '../../index.module.scss'

export const HeadSection = () => {
	return (
		<div className={styles.formSection}>
			<span className={styles.title}>Заявка на участие в конкурсе</span>
			<span className={styles.titleSmall}>Номинация «Фантастика», 2026 год</span>
		</div>
	)
}
