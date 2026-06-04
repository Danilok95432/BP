import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additional-crumbs'
import { useParams } from 'react-router-dom'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'

export const AwardInfo: FC = () => {
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
	useAdditionalCrumbs(eventData?.title)
	return (
		<div className={styles.awardGeneralPage}>
			<Helmet>
				<title>О номинации</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Подробно о номинации</h2>
				<GalleryImg
					variant='slider'
					allPageImages={allPagePhoto}
					className={styles.gallery}
					sliderClassname={styles.slider}
				/>
				{eventData?.descs && (
					<div className={styles.mainDescs} dangerouslySetInnerHTML={{ __html: eventData.descs }} />
				)}
			</div>
		</div>
	)
}
