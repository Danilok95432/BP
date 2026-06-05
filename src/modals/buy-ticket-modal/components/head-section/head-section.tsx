import styles from '../../index.module.scss'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

type Props = {
	id: string
}

export const HeadSection = ({ id }: Props) => {
	const { data: eventData } = useGetEventByIdQuery(id ?? '')
	return (
		<div className={styles.formSection}>
			<span className={styles.title}>Заявка на участие в конкурсе</span>
			<span className={styles.titleSmall}>{eventData?.title}</span>
		</div>
	)
}
