import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import styles from './index.module.scss'

export const AboutLaureatsLayout = () => {
	return (
		<div className={styles.aboutGamesPage}>
			<Helmet>
				<title>Лауреаты</title>
			</Helmet>
			<Outlet />
		</div>
	)
}
