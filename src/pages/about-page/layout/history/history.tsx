import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { GallerySection } from 'src/shared/sections-new/GallerySection/gallery-section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { TgEventIconSVG } from 'src/shared/ui/icons/tgEventIconSVG'
import { type ImageItemWithText } from 'src/types/photos'
import { useGetAboutGeneralQuery } from 'src/features/about/api/about'

export const AboutHistory: FC = () => {
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	const { data: aboutPageData } = useGetAboutGeneralQuery(null)
	useEffect(() => {
		if (aboutPageData) {
			const images: ImageItemWithText[] = []
			if (aboutPageData?.mainphoto[0]) {
				images.push(aboutPageData?.mainphoto[0])
			}
			if (aboutPageData.photoGallery && Array.isArray(aboutPageData.photoGallery)) {
				images.push(...aboutPageData.photoGallery)
			}
			setAllPagePhoto(images)
		}
	}, [aboutPageData])

	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О премии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Детали и история</h2>
				<GallerySection photos={allPagePhoto} classNameSection={styles.gallery} />
				{aboutPageData?.descs && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.descs }}
					/>
				)}
				{/* <div className={styles.infoWrapper}>
					<FlexRow className={styles.infoGrid}>
						<FlexRow className={classNames(styles.infoRowEl, styles.end)}>
							<p className={styles.title}>
								35 <span>лет</span>
							</p>
							<p>премия основана в 1990 году</p>
						</FlexRow>
						<FlexRow className={styles.infoRowEl}>
							<p className={styles.title}>
								{'>200'}
								<span>лауреатов</span>
							</p>
							<p>некоммерческая премия</p>
						</FlexRow>
						<FlexRow className={styles.infoRowEl}>
							<p className={styles.title}>
								{'>40'} <span>членов жюри</span>
							</p>
							<p>выборный состав</p>
						</FlexRow>
						<FlexRow className={styles.infoRowEl}>
							<p className={styles.title}>
								{'10'}
								<span>номинаций</span>
							</p>
							<p>авторы и медиа</p>
						</FlexRow>
					</FlexRow>
				</div> */}
				{aboutPageData?.descs && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.descs }}
					/>
				)}
				{/* <HistorySection noTitle className={styles.historySection} /> */}

				<FlexRow className={styles.contactsRow}>
					<h3>Контакты Оргкомитета Беляевской премии</h3>
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
