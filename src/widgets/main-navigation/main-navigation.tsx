import { Container } from 'src/shared/ui/Container/Container'
import { navigationElements } from './consts'
import styles from './index.module.scss'
import { BurgerMenu } from './components/burger-menu/burger-menu'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

import cn from 'classnames'
import { SeparatorIconSVG } from 'src/shared/ui/icons/separatorIconSVG'

export const MainNavigation = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const navRef = useRef<HTMLElement | null>(null)

	return (
		<nav ref={navRef} className={styles.navigation}>
			<Container className={styles.navigationCont}>
				<FlexRow className={styles.mobileRow}>
					<BurgerMenu />
				</FlexRow>

				<ul className={styles.navWrapper}>
					{navigationElements.map((el, index) => (
						<button
							key={index}
							className={styles.navEl}
							onClick={() => {
								navigate(el.link)
							}}
						>
							<li className={cn({ [styles.active]: location.pathname.includes(el.link) })}>
								{el.title}
							</li>
						</button>
					))}
				</ul>
				<button
					className={styles.personMenu}
					aria-label='Лаборатория Доуэля'
					title='Лаборатория Доуэля'
				>
					<SeparatorIconSVG />
					<p>Лаборатория Доуэля</p>
				</button>
			</Container>
		</nav>
	)
}
