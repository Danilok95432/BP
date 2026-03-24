import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { AwardCard } from './components/award-card/award-card'
import { useGetEventsMonthsQuery } from 'src/features/home/api/home.api'

export const AwardsList = () => {
	const { data: eventData } = useGetEventsMonthsQuery({
		date: '',
		category: '',
	})
	return (
		<Section className={styles.awardsList}>
			<Container className={styles.awardsCont}>
				<div className={styles.grid}>
					{eventData?.map((award) => (
						<AwardCard key={award.id} award={award} />
					))}
				</div>
			</Container>
		</Section>
	)
}
