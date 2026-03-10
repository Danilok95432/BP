import { useParams } from 'react-router-dom'
import laureatStyles from '../index.module.scss'
import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additional-crumbs'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { laureats } from '../consts'
import { GallerySection } from 'src/shared/sections-new/GallerySection/gallery-section'

export const ProjectDetails = () => {
	const { id } = useParams()
	const laureat = laureats.find((el) => el.id === id)
	useAdditionalCrumbs(laureat?.name)

	const laureatInfo = {
		topDesc:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure suscipit voluptatum, a ad aut beatae culpa voluptatibus. Maxime et impedit, necessitatibus aspernatur nemo, itaque exercitationem veritatis eum fugit illum earum, quisquam quam vitae tempora praesentium quia aliquam beatae inventore doloremque! Fuga quaerat ad accusamus incidunt deserunt, nulla quos vel accusantium?',
		bottomDesc:
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure suscipit voluptatum, a ad aut beatae culpa voluptatibus. Maxime et impedit, necessitatibus aspernatur nemo, itaque exercitationem veritatis eum fugit illum earum, quisquam quam vitae tempora praesentium quia aliquam beatae inventore doloremque! Fuga quaerat ad accusamus incidunt deserunt, nulla quos vel accusantium?',
	}

	// useEffect(() => {
	// 	if (laureatInfo) {
	// 		const images: ImageItemWithText[] = []
	// 		if (laureatInfo.mainphoto) {
	// 			images.push(laureatInfo.mainphoto[0])
	// 		}
	// 		if (laureatInfo.photos && Array.isArray(laureatInfo.photos)) {
	// 			images.push(...laureatInfo.photos)
	// 		}
	// 		setAllPagePhoto(images)
	// 	}
	// }, [laureatInfo])
	return (
		<div className={styles.laureatDetails}>
			<div className={styles.laureatDetailsInfo}>
				<div className={styles.laureatMain}>
					<h2>{laureat?.name}</h2>
					{laureatInfo.topDesc && <div dangerouslySetInnerHTML={{ __html: laureatInfo.topDesc }} />}
				</div>
				<div className={styles.laureatLogo}>
					<GalleryImg variant='newsMain' />
				</div>
			</div>
			<h2 className={styles.title}>О лауреате</h2>
			<GallerySection classNameSection={styles.gallery} />
			<GalleryImg className={laureatStyles.galleryPhotos} />
			{laureatInfo.bottomDesc && (
				<div dangerouslySetInnerHTML={{ __html: laureatInfo.bottomDesc }} />
			)}
		</div>
	)
}
