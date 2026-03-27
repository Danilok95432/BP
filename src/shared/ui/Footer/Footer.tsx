import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { VkSocialSvg } from '../icons/vkSocialSVG'
// import { SeparatorIconSVG } from '../icons/separatorIconSVG'
import cn from 'classnames'
import { navigationElements } from './consts'
import { useNavigate } from 'react-router-dom'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'

export const Footer = () => {
	const navigate = useNavigate()
	const { data: settingsData } = useGetSettingsSiteQuery(null)
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerCont}>
					<FlexRow className={styles.navRow}>
						<div className={styles.wrapper}>
							<ul className={styles.navWrapper}>
								{navigationElements.map((el, index) => (
									<button key={index} className={styles.navEl} onClick={() => navigate(el.link)}>
										<li className={cn({ [styles.active]: location.pathname.includes(el.link) })}>
											{el.title}
										</li>
									</button>
								))}
							</ul>
							{/* <button
								className={styles.personMenu}
								aria-label='Лаборатория Доуэля'
								title='Лаборатория Доуэля'
							>
								<SeparatorIconSVG color='#fff' />
								<p>Лаборатория Доуэля</p>
							</button> */}
						</div>
						<FlexRow className={styles.socialsRow}>
							<a
								className={styles.socialEl}
								href={settingsData?.vk}
								target='_blank'
								rel='noreferrer'
							>
								<VkSocialSvg color='#fff' />
							</a>
							{/* <div className={styles.socialEl}>
								<TelegramSocialSvg color='#fff' />
							</div> */}
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.bottomInfo}>
						<FlexRow className={styles.contactsRow}>
							<p>{settingsData?.phone}</p>
							<p>{settingsData?.email}</p>
						</FlexRow>
						<FlexRow className={styles.author}>
							<p className={styles.title}>
								© Беляевская премия, 2026
								<br />
								Международная литературная премия имени Александра Беляева. Портал разработан НПО
								ТАУ на платформе ТАУ-6
							</p>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
