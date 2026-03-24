import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

import skeleton from 'src/assets/img/card-laureat-skeleton.png'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'

export const Belyaev: FC = () => {
	const { data: aboutPageData } = useGetPageHeaderQuery('belyaev')

	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	useEffect(() => {
		const images: ImageItemWithText[] = []

		if (aboutPageData?.page.mainphoto[0]) {
			images.push(aboutPageData?.page.mainphoto[0])
		}

		setAllPagePhoto(images)
	}, [aboutPageData, location.pathname])
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
							{aboutPageData?.page.full && (
								<div
									className={styles.mainDescs}
									dangerouslySetInnerHTML={{ __html: aboutPageData?.page.full }}
								/>
							)}
						</FlexRow>
					</FlexRow>
					<div className={styles.imgWrapper}>
						<img className={styles.posterImg} src={skeleton} alt='' />
					</div>
				</FlexRow>
			</FlexRow>
			<div className={styles.inner}>
				<GalleryImg allPageImages={allPagePhoto} className={styles.gallery} />
				{aboutPageData?.page.full2 && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData?.page.full2 }}
					/>
				)}
			</div>
		</div>
	)
}
