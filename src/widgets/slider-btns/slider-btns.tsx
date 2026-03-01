import React, { type FC, type RefObject } from 'react'
import { type SwiperRef } from 'swiper/react'
import styles from './index.module.scss'

import cn from 'classnames'
import { SlidePrevSvg } from 'src/shared/ui/icons/slidePrevSVG'
import { SlideNextSvg } from 'src/shared/ui/icons/slideNextSVG'
import { SlidePrevDefaultSVG } from 'src/shared/ui/icons/SlidePrevDefaultSVG'
import { SlideNextDefaultSVG } from 'src/shared/ui/icons/SlideNextDefaultSVG'

type SliderProps = {
	swiperRef: RefObject<SwiperRef>
	className?: string
	prevBtnColor?: string
	nextBtnColor?: string
	color?: string
	variant?: 'main' | 'years'
}

export const SliderBtns: FC<SliderProps> = ({
	swiperRef,
	className,
	color,
	prevBtnColor,
	nextBtnColor,
	variant = 'main',
}) => {
	const handlePrev = () => {
		swiperRef.current?.swiper.slidePrev()
	}

	const handleNext = () => {
		swiperRef.current?.swiper.slideNext()
	}
	if (variant === 'years') {
		return (
			<div className={cn(className, styles.sliderBtnsWrapper)}>
				<button type='button' onClick={handlePrev} style={{ background: prevBtnColor }}>
					<SlidePrevDefaultSVG />
				</button>
				<button type='button' onClick={handleNext} style={{ background: nextBtnColor }}>
					<SlideNextDefaultSVG />
				</button>
			</div>
		)
	}
	return (
		<div className={cn(className, styles.sliderBtnsWrapper)}>
			<button type='button' onClick={handlePrev} style={{ background: prevBtnColor }}>
				<SlidePrevSvg color={color} />
			</button>
			<button type='button' onClick={handleNext} style={{ background: nextBtnColor }}>
				<SlideNextSvg color={color} />
			</button>
		</div>
	)
}
