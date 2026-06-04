import { useParams } from 'react-router-dom'
import laureatStyles from '../index.module.scss'
import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additional-crumbs'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { useGetLaureatInfoByIdQuery } from 'src/features/about/api/about'
import { useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

export const LaureatDetails = () => {
	const { id } = useParams()

	const { data: laureatInfo } = useGetLaureatInfoByIdQuery(id ?? '')
	useAdditionalCrumbs(laureatInfo?.laureats.laureat_name ?? 'item')
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (laureatInfo) {
			const images: ImageItemWithText[] = []
			if (laureatInfo?.laureats.mainphoto) {
				images.push(laureatInfo?.laureats.mainphoto[0])
			}
			if (laureatInfo?.laureats.photos && Array.isArray(laureatInfo?.laureats.photos)) {
				images.push(...laureatInfo?.laureats.photos)
			}
			setAllPagePhoto(images)
		}
	}, [laureatInfo])
	return (
		<div className={styles.laureatDetails}>
			<div className={styles.laureatDetailsInfo}>
				<div className={styles.laureatMain}>
					<h2>{laureatInfo?.laureats.laureat_name}</h2>
					{laureatInfo?.laureats.laureat_info && (
						<div
							className={styles.subtitle}
							dangerouslySetInnerHTML={{ __html: laureatInfo?.laureats.laureat_info }}
						/>
					)}
					{laureatInfo?.laureats.laureat_desc && (
						<div
							dangerouslySetInnerHTML={{ __html: laureatInfo?.laureats.laureat_desc }}
							className={styles.bottomDesc}
						/>
					)}
				</div>
				<div className={styles.laureatLogo}>
					<GalleryImg variant='newsMain' images={allPagePhoto} />
				</div>
			</div>
			<h2 className={styles.title}>О лауреате</h2>
			<GalleryImg
				className={laureatStyles.galleryPhotos}
				sliderClassname={laureatStyles.slider}
				images={laureatInfo?.laureats?.photos}
				limit={12}
				limitController
				variant='slider'
				allPageImages={allPagePhoto}
			/>
			{laureatInfo?.laureats.laureat_full && (
				<div
					dangerouslySetInnerHTML={{ __html: laureatInfo?.laureats.laureat_full }}
					className={styles.bottomDesc}
				/>
			)}
		</div>
	)
}
