import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'
import { type FC, type RefObject, useRef } from 'react'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { eventsSliderOptions } from './consts'

export const HistorySection: FC<{ noTitle?: boolean; className?: string }> = ({
	noTitle = false,
	className,
}) => {
	const history = [
		{
			id: '1',
			dateName: '2025',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
		{
			id: '2',
			dateName: '2024',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
		{
			id: '3',
			dateName: '2023',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
		{
			id: '4',
			dateName: '2022',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
		{
			id: '5',
			dateName: '2021',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
		{
			id: '6',
			dateName: '2020',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
		{
			id: '7',
			dateName: '2019',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
		{
			id: '8',
			dateName: '2018',
			dateText:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
		},
	]
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
						{history?.map((el) => {
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
											<p>{el.dateName}</p>
										</FlexRow>
										<p>{el.dateText}</p>
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
