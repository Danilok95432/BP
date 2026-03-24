import { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'

export const FondLayoutHeader: FC = () => {
	const { data: aboutPageData } = useGetPageHeaderQuery('fond')

	const getPhotosForCurrentPage = (): ImageItemWithText[] => {
		switch (location.pathname) {
			case '/about':
				return aboutPageData?.page.photoGallery ?? []
			default:
				return []
		}
	}

	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	useEffect(() => {
		const photos = getPhotosForCurrentPage()
		const images: ImageItemWithText[] = []

		if (aboutPageData?.page.mainphoto[0]) {
			images.push(aboutPageData?.page.mainphoto[0])
		}

		if (photos.length > 0) {
			images.push(...photos)
		}

		setAllPagePhoto(images)
	}, [aboutPageData, location.pathname])

	return (
		<div className={styles.aboutLayoutHeaderPageContent}>
			<div className={styles.leftSideHeader}>
				<h2 className={styles.title}>О фонде</h2>
				<div className={styles.blockquoteBody}>
					{aboutPageData?.page.short && (
						<div
							className={styles.mainDescs}
							dangerouslySetInnerHTML={{ __html: aboutPageData.page.short }}
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
