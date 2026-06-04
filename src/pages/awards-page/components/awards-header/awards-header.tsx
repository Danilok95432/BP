import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'
import { type ImageItemWithText } from 'src/types/photos'

export const AwardsHeader = () => {
	const location = useLocation()
	const { data: aboutPageData } = useGetPageHeaderQuery('concurs')

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
		<Section className={styles.cont}>
			<Container>
				<div className={styles.awardsLayoutHeaderPageContent}>
					<div className={styles.leftSideHeader}>
						<h2 className={styles.title}>Конкурс премии</h2>
						<div className={styles.blockquoteBody}>
							{aboutPageData?.page.short && (
								<div
									className={styles.mainDescs}
									dangerouslySetInnerHTML={{ __html: aboutPageData?.page.short }}
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
			</Container>
		</Section>
	)
}
