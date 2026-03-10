import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { BreadCrumbs } from 'src/widgets/bread-crumbs/bread-crumbs'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'

export const BelyaevPage: FC = () => {
	const breakPoint = useBreakPoint()
	return (
		<div className={styles.aboutLayout}>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Александр Беляев',
							link: 'belyaev',
						},
					]}
				/>
			</Container>
			<Container className={styles.aboutContainerLayout} off={breakPoint === 'S'}>
				<Outlet />
			</Container>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Александр Беляев',
							link: 'belyaev',
						},
					]}
				/>
			</Container>
		</div>
	)
}
