import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { PDFFileIconSVG } from 'src/shared/ui/icons/pdfFileIconSVG'
import { DocFileIconSVG } from 'src/shared/ui/icons/docFileIconSVG'

export const FondDocs: FC = () => {
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

	const docs = [
		{
			id: '1',
			name: 'Положение о Премии',
			format: 'pdf',
			size: '68,5 КВ',
		},
		{
			id: '2',
			name: 'Регламент приема работ конкурсов Премии',
			format: 'pdf',
			size: '68,5 КВ',
		},
		{
			id: '3',
			name: 'Положение об участии партнеров и спонсоров Премии',
			format: 'doc',
			size: '68,5 КВ',
		},
		{
			id: '4',
			name: 'Медиа-кит (информация и графики для прессы)',
			format: 'doc',
			size: '68,5 КВ',
		},
	]
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>Документы фонда</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Документы фонда</h2>
				<FlexRow className={styles.docsList}>
					{docs.map((doc) => {
						return (
							<a key={doc.id} className={styles.doc}>
								<div className={styles.file}>
									{doc.format === 'pdf' ? <PDFFileIconSVG /> : <DocFileIconSVG />}
								</div>
								<FlexRow className={styles.info}>
									<p className={styles.title}>{doc.name}</p>
									<p>{doc.size}</p>
								</FlexRow>
							</a>
						)
					})}
				</FlexRow>
			</div>
		</div>
	)
}
