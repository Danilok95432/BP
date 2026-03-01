import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { BreadCrumbs } from 'src/widgets/bread-crumbs/bread-crumbs'
import { Outlet, useLocation } from 'react-router-dom'
import { AwardsHeader } from './components/awards-header/awards-header'
import { AwardsList } from './components/awards-list/awards-list'

export const AwardsLayout = () => {
	const location = useLocation()
	const insideLocation = location.pathname.split('/').some((segment) => /^\d+$/.test(segment))
	return (
		<>
			<Helmet>
				<title>Конкурс премий</title>
			</Helmet>
			<div className={styles.aboutLayout}>
				<Container>
					<BreadCrumbs
						crumbsLinksMap={[
							{
								title: 'Конкурс премий',
								link: 'awards',
							},
						]}
					/>
				</Container>
				{!insideLocation && (
					<>
						<AwardsHeader />
						<AwardsList />
					</>
				)}
				<Outlet />
				<Container>
					<BreadCrumbs
						crumbsLinksMap={[
							{
								title: 'Конкурс премий',
								link: 'awards',
							},
						]}
					/>
				</Container>
			</div>
		</>
	)
}
