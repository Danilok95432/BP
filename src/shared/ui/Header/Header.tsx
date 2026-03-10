import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { PersonIconSvg } from '../icons/personIconSVG'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import logo from 'src/assets/img/logo-bp.png'
import logoMobile from 'src/assets/img/logo-mobile-bp.png'
import { SearchIconSvg } from '../icons/searchIconSVG'

import cn from 'classnames'
import { BurgerMenu } from 'src/widgets/main-navigation/components/burger-menu/burger-menu'

export const Header = () => {
	const breakpoint = useBreakPoint()
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<header className={styles.header}>
			<Container className={styles.cont}>
				<FlexRow className={styles.headerRow}>
					<FlexRow className={styles.logoRow}>
						<Link to={'/'} aria-label='Главная' title='Главная' className={styles.logoWrap}>
							{breakpoint === 'S' ? <img src={logoMobile} /> : <img src={logo} />}
							<p>Международная литературная премия имени Александра Беляева</p>
						</Link>
					</FlexRow>
					<FlexRow className={styles.controlsRow}>
						<Link to={'/'} className={cn(styles.enterLK, styles.search)}>
							<div className={styles.vector}>
								<SearchIconSvg />
							</div>
						</Link>
						<Link to={'/'} className={styles.enterLK}>
							<div className={styles.vector}>
								<PersonIconSvg />
							</div>
						</Link>
						{isSmallScreen && <BurgerMenu />}
					</FlexRow>
				</FlexRow>
			</Container>
		</header>
	)
}
