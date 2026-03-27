import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'
import { type FC, type RefObject, useRef } from 'react'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { eventsSliderOptions } from './consts'
import { useGetEventAwardsByIdQuery } from 'src/features/home/api/home.api'

export const HistorySection: FC<{ noTitle?: boolean; className?: string }> = ({
	noTitle = false,
	className,
}) => {
	const { data: history } = useGetEventAwardsByIdQuery('1')
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	return (
		<Section className={cn(styles.history, className)}>
			<Container>
				{!noTitle && (
					<FlexRow className={styles.eventsSectionRow}>
						<h2 className={styles.sectionTitle}>История</h2>
					</FlexRow>
				)}
				<FlexRow className={styles.historyList}>
					<Swiper {...eventsSliderOptions} ref={swiperRef}>
						{history?.dates.map((el) => {
							return (
								<SwiperSlide key={el.id}>
									<div className={styles.historyEl}>
										<FlexRow className={styles.titleRow}>
											<svg
												width='32'
												height='41'
												viewBox='0 0 32 41'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M13.0134 20.6535L15.5 0.5L17.9845 20.6535L31 23.1263L17.9845 25.601L15.5 40.5L13.0134 25.601L0 23.1263L13.0134 20.6535Z'
													stroke='black'
													strokeLinejoin='round'
												/>
											</svg>
											<p>{el.datename}</p>
										</FlexRow>
										<p>{el.datetext}</p>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</FlexRow>
				<div className={cn('custom-pagination', styles.paginationContainer)}></div>
			</Container>
		</Section>
	)
}
