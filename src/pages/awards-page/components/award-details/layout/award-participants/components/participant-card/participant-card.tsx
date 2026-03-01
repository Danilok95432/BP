import { type FC } from 'react'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { type AwardCard } from '../../award-participants'

type ParticipantCardProps = {
	className?: string
} & AwardCard

export const ParticipantCard: FC<ParticipantCardProps> = ({
	id,
	participant,
	workTitle,
	workForm,
	submittedAt,
	status,
	className,
}) => {
	return (
		<div className={styles.participantItem}>
			<figure>
				<figcaption className={styles.participantItemContent}>
					<FlexRow className={styles.headCard}>
						<div className={styles.infoBlock}>
							<p className={styles.name}>{participant}</p>
						</div>
					</FlexRow>
				</figcaption>
			</figure>
		</div>
	)
}
