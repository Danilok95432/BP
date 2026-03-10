import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import styles from './index.module.scss'

export const AboutProjectsLayout = () => {
	return (
		<div className={styles.aboutGamesPage}>
			<Helmet>
				<title>Проекты фонда</title>
			</Helmet>
			<Outlet />
		</div>
	)
}
