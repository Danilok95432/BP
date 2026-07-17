import { useState, type FC, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { YearsFilterSlider } from 'src/widgets/years-filter-slider/years-filter-slider'
import laureatSkeletonCard from 'src/assets/img/card-laureat-skeleton.png'
import { Link } from 'react-router-dom'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { useGetAllLaureatsQuery } from 'src/features/about/api/about'

export const AboutLaureats: FC = () => {
	const { data: laureatsData } = useGetAllLaureatsQuery(null)

	const breakPoint = useBreakPoint()
	const [activeYear, setActiveYear] = useState('')

	const handleChangeActiveYear = (newYear: string) => {
		setActiveYear(newYear)
	}

	const yearsList = useMemo(() => {
		if (!laureatsData?.laureats?.length) return []

		const years = [...new Set(laureatsData.laureats.map((laureat) => laureat.laureat_year))].sort(
			(a, b) => Number(b) - Number(a),
		)

		return years.map((year) => ({
			year,
			isActive: true,
		}))
	}, [laureatsData?.laureats])

	useMemo(() => {
		if (yearsList.length > 0 && !activeYear) {
			setActiveYear(yearsList[0].year)
		}
	}, [yearsList, activeYear])

	const filteredLaureats = useMemo(() => {
		if (!laureatsData?.laureats) return []
		return laureatsData.laureats.filter((laureat) => {
			return laureat.laureat_year === activeYear
		})
	}, [laureatsData?.laureats, activeYear])

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
				{yearsList.length > 0 &&
					(breakPoint === 'S' ? (
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
							yearsList={yearsList}
							changeActiveYear={handleChangeActiveYear}
							activeYear={activeYear}
						/>
					))}

				{/* Список карточек лауреатов */}
				<div className={styles.laureatsGrid}>
					{filteredLaureats.length > 0 ? (
						filteredLaureats.map((laureat) => (
							<Link key={laureat.id} className={styles.laureatCard} to={`${laureat.id}`}>
								<div className={styles.laureatName}>{laureat.laureat_name}</div>
								<img
									className={styles.imgLaureat}
									src={
										laureat.mainphoto.length > 0
											? laureat.mainphoto[0].original
											: laureatSkeletonCard
									}
									alt={laureat.laureat_name}
								/>
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
