import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { useState, type FC } from 'react'
import { SeparatorIconNavigationSVG } from 'src/shared/ui/icons/separatorIconNavigationSVG'
import { mainFormatDate } from 'src/shared/helpers/utils'

import bgHover from 'src/assets/img/bg-award-hover.png'

interface IAwardCard {
	id: string
	title: string
	status: string
	requests: number
	dateTo: string
}

type AwardCardProps = {
	award: IAwardCard
}

export const AwardCard: FC<AwardCardProps> = ({ award }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	return (
		<Link
			to={`/awards/${award.id}`}
			className={styles.awardCard}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img className={styles.bg} src={bgHover} alt='' />
			<FlexRow className={styles.card}>
				<h2 className={styles.title}>{award.title}</h2>
				<FlexRow className={styles.infoWrapper}>
					<FlexRow className={styles.topBlock}>
						<p>{award.status}</p>
						<SeparatorIconNavigationSVG color={isHovered ? 'white' : 'black'} />
						<p>{`Подано ${award.requests} заявок`}</p>
					</FlexRow>
					<p>{`Прием заявок до ${mainFormatDate(award.dateTo)}`}</p>
				</FlexRow>
			</FlexRow>
		</Link>
	)
}
