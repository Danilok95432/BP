import { type FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { HeadMenu } from 'src/widgets/head-menu/head-menu'
import { AwardMenuItems } from './consts'
import { AwardHeader } from './components/award-header/award-header'

export const AwardLayout: FC = () => {
	const location = useLocation()

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
	return (
		<div className={styles.aboutLayout}>
			<Container className={styles.aboutContainerLayout}>
				{!isTraditionPage && (
					<>
						{<AwardHeader />}
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
					</>
				)}
				<Outlet />
			</Container>
		</div>
	)
}
