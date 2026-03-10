import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { AwardCard } from './components/award-card/award-card'

export const AwardsList = () => {
	const awards = [
		{
			id: '1',
			title: 'Научно-художественная книга',
			status: 'Открытая номинация',
			requests: 270,
			dateTo: '2026-08-02T23:59:59.999Z',
		},
		{
			id: '2',
			title: 'Перевод научно-художественной книги',
			status: 'Открытая номинация',
			requests: 270,
			dateTo: '2026-08-02T23:59:59.999Z',
		},
		{
			id: '3',
			title: 'Серия научно-популярных публикаций',
			status: 'Открытая номинация',
			requests: 270,
			dateTo: '2026-08-02T23:59:59.999Z',
		},
		{
			id: '4',
			title: 'Просветительский или научно-популярный сайт',
			status: 'Открытая номинация',
			requests: 270,
			dateTo: '2026-08-02T23:59:59.999Z',
		},
		{
			id: '5',
			title: 'Просветительский или научно-популярный сайт',
			status: 'Открытая номинация',
			requests: 270,
			dateTo: '2026-08-02T23:59:59.999Z',
		},
	]
	return (
		<Section className={styles.awardsList}>
			<Container className={styles.awardsCont}>
				<div className={styles.grid}>
					{awards.map((award) => (
						<AwardCard key={award.id} award={award} />
					))}
				</div>
			</Container>
		</Section>
	)
}
