import { type FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import cn from 'classnames'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { Container } from 'src/shared/ui/Container/Container'
import { BreadCrumbs } from 'src/widgets/bread-crumbs/bread-crumbs'
import { AboutMenuItems } from './consts'
import { AboutLayoutHeader } from './components/about-layout-header'
import { HeadMenu } from 'src/widgets/head-menu/head-menu'

export const AboutLayout: FC = () => {
	const location = useLocation()
	const breakpoint = useBreakPoint()

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
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...AboutMenuItems,
						{
							title: 'Беляевская премия',
							link: 'about',
						},
					]}
				/>
			</Container>
			<Container className={styles.aboutContainerLayout}>
				{!isTraditionPage && (
					<>
						{breakpoint !== 'S' && <AboutLayoutHeader />}
						<HeadMenu
							className={styles.aboutSideMenu}
							sideItems={[
								{
									title: 'Детали и история',
									link: '/about',
								},
								...AboutMenuItems,
							]}
						/>
					</>
				)}
				<Outlet />
				{!isTraditionPage && breakpoint === 'S' && (
					<>
						<HeadMenu
							className={cn(styles.bottomMobileMenu, styles.aboutSideMenu)}
							position='bottom'
							sideItems={[
								{
									title: 'Беляевская премия',
									link: '/about',
								},
								...AboutMenuItems,
							]}
						/>
					</>
				)}
			</Container>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...AboutMenuItems,
						{
							title: 'Беляевская премия',
							link: 'about',
						},
					]}
				/>
			</Container>
		</div>
	)
}
