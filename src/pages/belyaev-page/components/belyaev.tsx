import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { GallerySection } from 'src/shared/sections-new/GallerySection/gallery-section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

import skeleton from 'src/assets/img/card-laureat-skeleton.png'

export const Belyaev: FC = () => {
	// const [allPagePhoto] = useState<ImageItemWithText[]>([])
	// useEffect(() => {
	// 	if (aboutPageData) {
	// 		const images: ImageItemWithText[] = []
	// 		if (aboutPageData?.mainphoto[0]) {
	// 			images.push(aboutPageData?.mainphoto[0])
	// 		}
	// 		if (aboutPageData.photoGallery && Array.isArray(aboutPageData.photoGallery)) {
	// 			images.push(...aboutPageData.photoGallery)
	// 		}
	// 		setAllPagePhoto(images)
	// 	}
	// }, [aboutPageData])
	const aboutPageData = {
		mainDescs: [''],
		descs: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		],
		caption: '',
	}
	return (
		<div className={styles.awardGeneralPage}>
			<Helmet>
				<title>Александр беляев</title>
			</Helmet>
			<FlexRow className={styles.poster}>
				<FlexRow className={styles.wrapper}>
					<FlexRow className={styles.infoWrapper}>
						<FlexRow className={styles.info}>
							<p className={styles.title}>Алексадр Беляев</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
								irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
								pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
								deserunt mollit anim id est laborum.
							</p>
						</FlexRow>
					</FlexRow>
					<div className={styles.imgWrapper}>
						<img className={styles.posterImg} src={skeleton} alt='' />
					</div>
				</FlexRow>
			</FlexRow>
			<div className={styles.inner}>
				<GallerySection classNameSection={styles.gallery} />
				{aboutPageData?.descs && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.descs }}
					/>
				)}
			</div>
		</div>
	)
}
