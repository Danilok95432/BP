import { useMemo, type FC } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { HeadMenu } from 'src/widgets/head-menu/head-menu'
import { AwardHeader } from './components/award-header/award-header'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import classNames from 'classnames'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { getMenuItems } from './consts'

export const AwardLayout: FC = () => {
	const location = useLocation()
	const { id } = useParams()
	const { data: eventData } = useGetEventByIdQuery(id ?? '')
	const AwardMenuItems = useMemo(() => {
		return getMenuItems(eventData)
	}, [eventData])
	const getCurrentLocation = () => {
		if (
			location.pathname.startsWith(`/about/laureates/`) ||
			location.pathname.startsWith(`/about/about-games/`)
		) {
			return true
		}
		return false
	}

	const isTraditionPage = getCurrentLocation()
	const breakPoint = useBreakPoint()
	return (
		<div className={styles.aboutLayout} id='about'>
			<Container className={classNames(styles.aboutContainerLayout, styles.noBottom)}>
				{!isTraditionPage && <>{<AwardHeader />}</>}
			</Container>
			<Container className={styles.aboutContainerLayout} off={breakPoint === 'S'}>
				<HeadMenu
					className={styles.aboutSideMenu}
					sideItems={[
						{
							title: 'Подробно о номинации',
							link: '',
						},
						...AwardMenuItems,
					]}
				/>
				<Outlet />
			</Container>
		</div>
	)
}
