import { type FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { BreadCrumbs } from 'src/widgets/bread-crumbs/bread-crumbs'
import { AboutMenuItems } from './consts'
import { FondLayoutHeader } from './components/fond-layout-header'
import { HeadMenu } from 'src/widgets/head-menu/head-menu'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'

export const FondLayout: FC = () => {
	const location = useLocation()
	const breakPoint = useBreakPoint()

	const getCurrentLocation = () => {
		if (
			location.pathname.startsWith(`/about/projects/`) ||
			location.pathname.startsWith(`/about/about-games/`)
		) {
			return true
		}
		return false
	}

	const isTraditionPage = getCurrentLocation()

	return (
		<div className={styles.aboutLayout}>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...AboutMenuItems,
						{
							title: 'Беляевский фонд',
							link: 'fond',
						},
					]}
				/>
			</Container>
			<Container className={styles.aboutContainerLayout} off={breakPoint === 'S'}>
				{!isTraditionPage && (
					<>
						{<FondLayoutHeader />}
						<HeadMenu
							className={styles.aboutSideMenu}
							sideItems={[
								{
									title: 'Информация',
									link: '/fond',
								},
								...AboutMenuItems,
							]}
						/>
					</>
				)}
				<Outlet />
			</Container>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...AboutMenuItems,
						{
							title: 'Беляевский фонд',
							link: 'fond',
						},
					]}
				/>
			</Container>
		</div>
	)
}
