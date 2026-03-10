import { useState, type FC } from 'react'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'

export const FondLayoutHeader: FC = () => {
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

	const aboutPageData = {
		mainDescs:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	}

	return (
		<div className={styles.aboutLayoutHeaderPageContent}>
			<div className={styles.leftSideHeader}>
				<h2 className={styles.title}>О фонде</h2>
				<div className={styles.blockquoteBody}>
					{aboutPageData?.mainDescs && (
						<div
							className={styles.mainDescs}
							dangerouslySetInnerHTML={{ __html: aboutPageData.mainDescs }}
						/>
					)}
					{/* {aboutPageData?.caption && aboutPageData?.caption_show && (
						<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
					)} */}
				</div>
			</div>
			<div className={styles.rightSideHeader}>
				<GalleryImg images={allPagePhoto} variant='newsMain' />
			</div>
		</div>
	)
}
