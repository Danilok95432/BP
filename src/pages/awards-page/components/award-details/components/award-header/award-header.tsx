import { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { formatTimeLeft } from 'src/shared/helpers/utils'
import { useActions } from 'src/app/store/hooks/actions'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { useParams } from 'react-router-dom'

export const AwardHeader: FC = () => {
	const { id } = useParams()
	const { data: eventData } = useGetEventByIdQuery(id ?? '')

	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	useEffect(() => {
		const images: ImageItemWithText[] = []

		if (eventData?.mainphoto[0]) {
			images.push(eventData?.mainphoto[0])
		}

		setAllPagePhoto(images)
	}, [location.pathname])
	const { openModal } = useActions()

	const nominationData = {
		title: '',
		desc: 'Полное название номинации: «За литературную критику в области научно-художественной литературы». Рассматриваются произведения или серии работ общим объемом не более одного авторского листа.',
		opened: true,
		dateList: '2026-03-02T23:59:59.999Z',
	}
	const breakPoint = useBreakPoint()
	return (
		<div className={styles.awardLayoutHeaderPageContent}>
			<div className={styles.leftSideHeader}>
				<h2 className={styles.title}>{eventData?.title}</h2>
				<div className={styles.blockquoteBody}>
					{eventData?.description && (
						<div
							className={styles.mainDescs}
							dangerouslySetInnerHTML={{ __html: eventData?.description }}
						/>
					)}
					{/* {aboutPageData?.caption && aboutPageData?.caption_show && (
						<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
					)} */}
				</div>
				{nominationData.opened ? (
					<FlexRow className={styles.openedRow}>
						<MainButton
							className={styles.requestBtn}
							onClick={() => openModal(<BuyTicketModal id='1' />)}
						>
							Подать заявку на участие
						</MainButton>
						<p>
							{`До окончания приема заявок `}
							{breakPoint === 'S' && <br />}
							<span>{formatTimeLeft(nominationData.dateList)}</span>
						</p>
					</FlexRow>
				) : (
					<FlexRow className={styles.closedRow}>
						<p className={styles.disc}>
							Это закрытая номинация <span>(участников выдвигает Экспертный совет).</span>
						</p>
						<p className={styles.desc}>
							{`Список участников будет полностью сформирован через `}
							<span>{formatTimeLeft(nominationData.dateList)}</span>
						</p>
					</FlexRow>
				)}
			</div>
			<div className={styles.rightSideHeader}>
				<GalleryImg images={allPagePhoto} variant='newsMain' />
			</div>
		</div>
	)
}
