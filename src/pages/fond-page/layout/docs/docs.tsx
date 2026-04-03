import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { PDFFileIconSVG } from 'src/shared/ui/icons/pdfFileIconSVG'
import { DocFileIconSVG } from 'src/shared/ui/icons/docFileIconSVG'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'

export const FondDocs: FC = () => {
	const { data: aboutPageData } = useGetPageHeaderQuery('fond')
	const handleDownload = async (url: string, filename: string) => {
		const response = await fetch(url)
		const blob = await response.blob()
		const blobUrl = window.URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = blobUrl
		link.download = filename
		document.body.appendChild(link)
		link.click()
		link.remove()

		window.URL.revokeObjectURL(blobUrl)
	}
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>Документы фонда</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Документы фонда</h2>
				<FlexRow className={styles.docsList}>
					{aboutPageData?.page.documents.map((doc) => {
						return (
							<a
								key={doc.id}
								className={styles.doc}
								onClick={async () => await handleDownload(doc.url, doc.name)}
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
