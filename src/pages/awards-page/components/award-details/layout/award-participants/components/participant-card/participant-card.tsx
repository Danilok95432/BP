import { type FC } from 'react'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { type AwardCard } from '../../award-participants'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { formatSingleDate, parseTimeFromDate } from 'src/shared/helpers/utils'

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
	const breakPoint = useBreakPoint()
	if (breakPoint === 'S') {
		return (
			<div className={styles.participantItemMobile}>
				<FlexRow className={styles.infoMobileCard}>
					<span className={styles.id}>{`Участник, ID ${id}`}</span>
					<p className={styles.desc}>{participant}</p>
					<a className={styles.link} href='#'>
						{workTitle}
					</a>
					<p className={styles.desc}>{workForm}</p>
					<FlexRow className={styles.innerWrapper}>
						<span>Дата и время подачи</span>
						<p>{`${formatSingleDate(submittedAt)} ${parseTimeFromDate(submittedAt)}`}</p>
					</FlexRow>
				</FlexRow>
				<FlexRow className={styles.innerWrapper}>
					<span>Статус заявки</span>
					<p>{status}</p>
				</FlexRow>
			</div>
		)
	}
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
