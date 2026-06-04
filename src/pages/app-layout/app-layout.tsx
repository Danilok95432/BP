import { Outlet } from 'react-router-dom'
import { Footer } from 'src/shared/ui/Footer/Footer'
import { Header } from 'src/shared/ui/Header/Header'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'

import styles from './index.module.scss'

export const AppLayout = () => {
	return (
		<>
			<Header />
			<MainNavigation />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}
