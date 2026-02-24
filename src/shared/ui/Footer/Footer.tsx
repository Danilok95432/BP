import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { VkSocialSvg } from '../icons/vkSocialSVG'
import { TelegramSocialSvg } from '../icons/telegramSocialSVG'
import { SeparatorIconSVG } from '../icons/separatorIconSVG'
import cn from 'classnames'
import { navigationElements } from './consts'
import { useNavigate } from 'react-router-dom'

export const Footer = () => {
	const navigate = useNavigate()
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
							<button
								className={styles.personMenu}
								aria-label='Лаборатория Доуэля'
								title='Лаборатория Доуэля'
							>
								<SeparatorIconSVG color='#fff' />
								<p>Лаборатория Доуэля</p>
							</button>
						</div>
						<FlexRow className={styles.socialsRow}>
							<div className={styles.socialEl}>
								<VkSocialSvg color='#fff' />
							</div>
							<div className={styles.socialEl}>
								<TelegramSocialSvg color='#fff' />
							</div>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.bottomInfo}>
						<FlexRow className={styles.contactsRow}>
							<p>+7 (925) 314-38-58</p>
							<p>belyaevprize@gmail.com</p>
						</FlexRow>
						<FlexRow className={styles.author}>
							<p className={styles.title}>© Беляевская премия, 2026</p>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
