import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additional-crumbs'
import { useParams } from 'react-router-dom'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const AwardRules: FC = () => {
	const { id } = useParams()
	const { data: eventData } = useGetEventByIdQuery(id ?? '')
	useAdditionalCrumbs(eventData?.title)
	return (
		<div className={styles.awardRulesPage}>
			<Helmet>
				<title>Правила отбора</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Правила отбора</h2>
				{eventData?.rules && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: eventData?.rules.rule_text }}
					/>
				)}
			</div>
		</div>
	)
}
