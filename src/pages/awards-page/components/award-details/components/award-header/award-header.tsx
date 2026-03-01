import { useState, type FC } from 'react'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { formatTimeLeft } from 'src/shared/helpers/utils'
import { useActions } from 'src/app/store/hooks/actions'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'

export const AwardHeader: FC = () => {
	// const location = useLocation()
	// const { data: aboutPageData } = useGetAboutGeneralQuery(null)

	// const { data: aboutHistoryData } = useGetAboutHistoryQuery(null, {
	// 	skip: location.pathname !== '/about/about-history',
	// })
	// const { data: aboutNatureData } = useGetAboutNatureQuery(null, {
	// 	skip: location.pathname !== '/about/about-nature',
	// })
	// const { data: aboutContactsData } = useGetAboutContactsQuery(null, {
	// 	skip: location.pathname !== '/about/about-contacts',
	// })
	// const { data: aboutTraditionData } = useGetAboutTraditionsQuery(null, {
	// 	skip: location.pathname !== '/about/about-traditions',
	// })
	// const { data: aboutGamesData } = useGetAboutGamesQuery(null, {
	// 	skip: location.pathname !== '/about/about-games',
	// })

	// const getPhotosForCurrentPage = (): ImageItemWithText[] => {
	// 	switch (location.pathname) {
	// 		case '/about':
	// 			return aboutPageData?.photoGallery ?? []
	// 		case '/about/about-history':
	// 			return aboutHistoryData?.photos ?? []
	// 		case '/about/about-nature':
	// 			return aboutNatureData?.photos ?? []
	// 		case '/about/about-contacts':
	// 			return aboutContactsData?.photos ?? []
	// 		case '/about/about-traditions':
	// 			return aboutTraditionData?.photoGallery ?? []
	// 		case '/about/about-games':
	// 			return aboutGamesData?.photoGallery ?? []
	// 		default:
	// 			return []
	// 	}
	// }

	const [allPagePhoto] = useState<ImageItemWithText[]>([])

	// useEffect(() => {
	// 	const photos = getPhotosForCurrentPage()
	// 	const images: ImageItemWithText[] = []

	// 	if (aboutPageData?.mainphoto[0]) {
	// 		images.push(aboutPageData?.mainphoto[0])
	// 	}

	// 	if (photos.length > 0) {
	// 		images.push(...photos)
	// 	}

	// 	setAllPagePhoto(images)
	// }, [
	// 	aboutPageData,
	// 	aboutHistoryData,
	// 	aboutNatureData,
	// 	aboutContactsData,
	// 	aboutTraditionData,
	// 	aboutGamesData,
	// 	location.pathname,
	// ])
	const { openModal } = useActions()

	const nominationData = {
		title: '',
		desc: 'Полное название номинации: «За литературную критику в области научно-художественной литературы». Рассматриваются произведения или серии работ общим объемом не более одного авторского листа.',
		opened: true,
		dateList: '2026-03-02T23:59:59.999Z',
	}

	return (
		<div className={styles.awardLayoutHeaderPageContent}>
			<div className={styles.leftSideHeader}>
				<h2 className={styles.title}>{'Номинация <...>'}</h2>
				<div className={styles.blockquoteBody}>
					{nominationData?.desc && (
						<div
							className={styles.mainDescs}
							dangerouslySetInnerHTML={{ __html: nominationData.desc }}
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
