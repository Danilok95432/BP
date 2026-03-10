import { useState, type FC, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { YearsFilterSlider } from 'src/widgets/years-filter-slider/years-filter-slider'
import laureatSkeletonCard from 'src/assets/img/card-laureat-skeleton.png'
import { Link } from 'react-router-dom'
import { laureats } from '../consts'

export const AboutProjects: FC = () => {
	const yearsList = [
		{ year: '2026', isActive: true },
		{ year: '2025', isActive: true },
		{ year: '2024', isActive: true },
		{ year: '2023', isActive: true },
		{ year: '2022', isActive: true },
		{ year: '2021', isActive: true },
		{ year: '2020', isActive: true },
		{ year: '2019', isActive: true },
		{ year: '2018', isActive: true },
		{ year: '2017', isActive: true },
		{ year: '2016', isActive: true },
		{ year: '2015', isActive: true },
		{ year: '2014', isActive: true },
		{ year: '2013', isActive: true },
	]

	const [activeYear, setActiveYear] = useState('2025')

	const handleChangeActiveYear = (newYear: string) => {
		setActiveYear(newYear)
	}

	// Фильтруем лауреатов по году, совпадающему с activeYear
	const filteredLaureats = useMemo(() => {
		return laureats.filter((laureat) => {
			// Извлекаем год из ISO строки
			const laureatYear = laureat.nominateDate.split('-')[0]
			return laureatYear === activeYear
		})
	}, [laureats, activeYear])

	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О фонде</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Проекты фонда</h2>
				<YearsFilterSlider
					yearsList={yearsList ?? []}
					changeActiveYear={handleChangeActiveYear}
					activeYear={activeYear}
				/>

				{/* Список карточек лауреатов */}
				<div className={styles.laureatsGrid}>
					{filteredLaureats.length > 0 ? (
						filteredLaureats.map((laureat) => (
							<Link key={laureat.id} className={styles.laureatCard} to={`${laureat.id}`}>
								<div className={styles.laureatName}>{laureat.name}</div>
								<img className={styles.imgLaureat} src={laureatSkeletonCard} alt={laureat.name} />
							</Link>
						))
					) : (
						<div className={styles.noLaureats}>Нет лауреатов за {activeYear} год</div>
					)}
				</div>
			</div>
		</div>
	)
}
