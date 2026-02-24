import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import main from 'src/assets/img/main.png'
import imgMobile from 'src/assets/img/imgMobile.png'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { SeparatorIconSVG } from 'src/shared/ui/icons/separatorIconSVG'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'

export const MainImgSection = () => {
	const breakPoint = useBreakPoint()
	return (
		<Section className={styles.noPadding}>
			{breakPoint === 'S' ? (
				<img className={styles.mainImg} src={imgMobile} alt='' />
			) : (
				<img className={styles.mainImg} src={main} alt='' />
			)}
			<div className={styles.mainWrapper}>
				<FlexRow className={styles.imgControls}>
					<h1>Международная литературная премия имени Александра Беляева</h1>
					<FlexRow className={styles.controls}>
						<FlexRow className={styles.topGroup}>
							<MainButton className={styles.controlBtn}>Посетить БелФест</MainButton>
							<MainButton className={styles.controlBtn}>Открыть расписание</MainButton>
						</FlexRow>
						<MainButton className={styles.controlBtnSpecial}>
							<div className={styles.customSvgWrapper}>
								<SeparatorIconSVG color='black' />
								<SeparatorIconSVG className={styles.smallSvg} color='black' />
							</div>
							<p>Подать заявку (для авторов)</p>
						</MainButton>
					</FlexRow>
				</FlexRow>
			</div>
		</Section>
	)
}
