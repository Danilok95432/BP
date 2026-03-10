import { useState, type FC, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { YearsFilterSlider } from 'src/widgets/years-filter-slider/years-filter-slider'
import laureatSkeletonCard from 'src/assets/img/card-laureat-skeleton.png'
import { Link } from 'react-router-dom'
import { laureats } from '../consts'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'

export const AboutLaureats: FC = () => {
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

	const breakPoint = useBreakPoint()
	const [activeYear, setActiveYear] = useState('2025')

	const handleChangeActiveYear = (newYear: string) => {
		setActiveYear(newYear)
	}

	// Фильтруем лауреатов по году, совпадающему с activeYear
	const filteredLaureats = useMemo(() => {
		return laureats.filter((laureat) => {
			const laureatYear = laureat.nominateDate.split('-')[0]
			return laureatYear === activeYear
		})
	}, [laureats, activeYear])

	// Преобразуем yearsList в формат для Select
	const yearOptions = yearsList.map((item) => ({
		value: item.year,
		label: item.year,
		disabled: !item.isActive,
	}))

	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О премии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Именитые лауреаты</h2>

				{/* Условный рендеринг фильтра */}
				{breakPoint === 'S' ? (
					<div className={styles.yearSelectWrapper}>
						<select
							value={activeYear}
							onChange={(e) => handleChangeActiveYear(e.target.value)}
							className={styles.yearSelect}
						>
							{yearOptions.map((option) => (
								<option key={option.value} value={option.value} disabled={option.disabled}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				) : (
					<YearsFilterSlider
						yearsList={yearsList ?? []}
						changeActiveYear={handleChangeActiveYear}
						activeYear={activeYear}
					/>
				)}

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
