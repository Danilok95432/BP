import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { TgEventIconSVG } from 'src/shared/ui/icons/tgEventIconSVG'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'

export const AboutInfo: FC = () => {
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	const { data: aboutPageData } = useGetPageHeaderQuery('fond')
	useEffect(() => {
		if (aboutPageData) {
			const images: ImageItemWithText[] = []
			if (aboutPageData?.page.mainphoto[0]) {
				images.push(aboutPageData?.page.mainphoto[0])
			}
			if (aboutPageData.page.photoGallery && Array.isArray(aboutPageData.page.photoGallery)) {
				images.push(...aboutPageData.page.photoGallery)
			}
			setAllPagePhoto(images)
		}
	}, [aboutPageData])
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О фонде</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Информация</h2>
				<GalleryImg allPageImages={allPagePhoto} className={styles.gallery} />
				{aboutPageData?.page.full && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.page.full }}
					/>
				)}

				<FlexRow className={styles.contactsRow}>
					<h3>Контакты и реквизиты Беляевского Фонда</h3>
					<FlexRow className={styles.wrapper}>
						<FlexRow className={styles.iconWrapper}>
							<TgEventIconSVG />
							<p>+7 (925) 314-38-58</p>
						</FlexRow>
						<p>belyaevprize@gmail.com</p>
					</FlexRow>
				</FlexRow>
			</div>
		</div>
	)
}
