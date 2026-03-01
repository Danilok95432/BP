import { type FC, type RefObject, useRef } from 'react'
import type { SwiperRef } from 'swiper/react/swiper-react'
import { type YearFilterItem } from 'src/types/global'

import { uid } from 'react-uid'
import { Swiper, SwiperSlide } from 'swiper/react'
import { isSameYear } from 'date-fns'
import cn from 'classnames'

import styles from './index.module.scss'
import { SliderBtns } from '../slider-btns/slider-btns'
import { yearsSliderOptions } from './consts'

type YearsSliderProps = {
	activeYear: string
	changeActiveYear: (arg: string) => void
	yearsList: YearFilterItem[]
	className?: string
}

export const YearsFilterSlider: FC<YearsSliderProps> = ({
	activeYear,
	changeActiveYear,
	yearsList,
	className,
}) => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	const handleChangeYear = (year: string, isActive: boolean) => {
		if (isActive) {
			changeActiveYear(year)
		}
	}

	if (!yearsList) return
	return (
		<div className={cn(styles.yearsFilterWrapper, className)}>
			<div className={styles.sliderWrapper}>
				<Swiper className={styles.yearsFilterSlider} {...yearsSliderOptions} ref={swiperRef}>
					{yearsList?.map(({ year, isActive }) => (
						<SwiperSlide
							className={cn(styles.yearslide, {
								[styles._disableSlide]: !isActive,
								[styles._activeSlide]: isSameYear(new Date(year), new Date(activeYear)),
							})}
							key={uid(year)}
							onClick={() => handleChangeYear(String(year), isActive)}
						>
							<p>{year}</p>
						</SwiperSlide>
					))}
				</Swiper>
				<SliderBtns
					className={styles.yearsSliderNavBtns}
					swiperRef={swiperRef}
					color='#000000'
					variant='years'
					prevBtnColor='#f2f5f8'
					nextBtnColor='#f2f5f8'
				/>
			</div>
		</div>
	)
}
