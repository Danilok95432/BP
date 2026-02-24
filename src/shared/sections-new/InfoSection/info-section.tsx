import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import classNames from 'classnames'
import infoImg from 'src/assets/img/info-img.png'

export const InfoMainSection = () => {
	return (
		<Section>
			<Container className={styles.cont}>
				<img className={styles.contImg} src={infoImg} alt='' />
				<div className={styles.infoWrapper}>
					<FlexRow className={styles.infoGrid}>
						<FlexRow className={styles.infoRow}>
							<FlexRow className={classNames(styles.infoRowEl, styles.end)}>
								<p className={styles.title}>35 лет</p>
								<p>премия основана в 1990 году</p>
							</FlexRow>
							<FlexRow className={styles.infoRowEl}>
								<p className={styles.title}>{'>200 лауреатов'}</p>
								<p>некоммерческая премия</p>
							</FlexRow>
						</FlexRow>
						<FlexRow className={classNames(styles.infoRow, styles.start)}>
							<FlexRow className={styles.infoRowEl}>
								<p className={styles.title}>{'>40 членов жюри'}</p>
								<p>выборный состав</p>
							</FlexRow>
							<FlexRow className={styles.infoRowEl}>
								<p className={styles.title}>{'10 номинаций'}</p>
								<p>авторы и медиа</p>
							</FlexRow>
						</FlexRow>
					</FlexRow>
				</div>
			</Container>
		</Section>
	)
}
