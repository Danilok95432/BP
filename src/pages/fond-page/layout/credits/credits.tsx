import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useGetContactsQuery } from 'src/features/about/api/about'

export const FondCredits: FC = () => {
	const { data } = useGetContactsQuery('')
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>Реквизиты фонда</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Реквизиты фонда</h2>
				<FlexRow className={styles.creditsList}>
					{data?.fullName && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>Полное название</p>
							<p className={styles.credit}>{data?.fullName}</p>
						</FlexRow>
					)}
					{data?.bank && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>Банк</p>
							<p className={styles.credit}>{data?.bank}</p>
						</FlexRow>
					)}
					{data?.bik && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>БИК</p>
							<p className={styles.credit}>{data?.bik}</p>
						</FlexRow>
					)}
					{data?.fioDir && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>ФИО руководителя</p>
							<p className={styles.credit}>{data?.fioDir}</p>
						</FlexRow>
					)}
					{data?.inn && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>ИНН</p>
							<p className={styles.credit}>{data?.inn}</p>
						</FlexRow>
					)}
					{data?.korChet && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>Кор. счет</p>
							<p className={styles.credit}>{data?.korChet}</p>
						</FlexRow>
					)}
					{data?.kpp && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>КПП</p>
							<p className={styles.credit}>{data?.kpp}</p>
						</FlexRow>
					)}
					{data?.ogrn && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>ОГРН</p>
							<p className={styles.credit}>{data?.ogrn}</p>
						</FlexRow>
					)}
					{data?.phone && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>Телефон</p>
							<p className={styles.credit}>{data?.phone}</p>
						</FlexRow>
					)}
					{data?.rasChet && (
						<FlexRow className={styles.creditItem}>
							<p className={styles.title}>Расчетный счет</p>
							<p className={styles.credit}>{data?.rasChet}</p>
						</FlexRow>
					)}
				</FlexRow>
			</div>
		</div>
	)
}
