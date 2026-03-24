import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additional-crumbs'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { DocFileIconSVG } from 'src/shared/ui/icons/docFileIconSVG'
import { PDFFileIconSVG } from 'src/shared/ui/icons/pdfFileIconSVG'
import { useParams } from 'react-router-dom'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const AwardDocs: FC = () => {
	const { id } = useParams()
	const { data: eventData } = useGetEventByIdQuery(id ?? '')
	useAdditionalCrumbs(eventData?.title)
	return (
		<div className={styles.awardDocsPage}>
			<Helmet>
				<title>документы</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Документы номинации</h2>
				<FlexRow className={styles.docsList}>
					{eventData?.documents?.map((doc) => {
						return (
							<a
								key={doc.id}
								className={styles.doc}
								href={doc.url}
								download={doc.url}
								target='_blank'
								rel='noreferrer'
							>
								<div className={styles.file}>
									{doc.name.split('.')[doc.name.split('.').length - 1] === 'pdf' ? (
										<PDFFileIconSVG />
									) : (
										<DocFileIconSVG />
									)}
								</div>
								<FlexRow className={styles.info}>
									<p className={styles.title}>{doc.name.split('.')[0]}</p>
									<p>{'68,5 КВ'}</p>
								</FlexRow>
							</a>
						)
					})}
				</FlexRow>
			</div>
		</div>
	)
}
