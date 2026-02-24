import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { type FC, type RefObject, useEffect, useRef, useState } from 'react'
import { VideoCard } from './components/video-card/video-card'
import { homeVideosSliderOptions } from './consts'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

import type { Swiper as SwiperType } from 'swiper'

type VideoProps = {
	id: string
}

export const VideosSection: FC<VideoProps> = ({ id }) => {
	const { data: videos } = useGetEventVideosByIdQuery(id, { skip: !id })
	const [isMobile, setIsMobile] = useState(false)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const [, setActiveIndex] = useState(0)

	const handleSlideChange = (swiper: SwiperType) => {
		setActiveIndex(swiper.activeIndex)
	}

	return (
		<Section id='video' className={cn(styles.videos)}>
			<Container off={isMobile} className={styles.cont}>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Видеолента</h2>
					<MainButton className={styles.allBtn} onClick={() => navigate('/content?onlyVideo=1')}>
						Все видео
					</MainButton>
				</FlexRow>
				<div className={styles.wrapper}>
					<Swiper
						{...homeVideosSliderOptions}
						ref={swiperRef}
						onSlideChange={handleSlideChange}
						onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
						className={styles.slider}
					>
						{videos?.map((slideItem, idx) => (
							<SwiperSlide key={idx} className={styles.videoSlide}>
								<VideoCard key={slideItem.id} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.videoSliderBtns}
						swiperRef={swiperRef}
						color={'#000'}
						nextBtnColor={'transparent'}
						prevBtnColor={'transparent'}
					/>
				</div>
			</Container>
		</Section>
	)
}
