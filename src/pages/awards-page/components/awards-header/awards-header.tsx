import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'

export const AwardsHeader = () => {
	const info = {
		topDesc:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi porro quaerat sequi tempora praesentium, dicta officiis tempore quae dolorem voluptas perspiciatis fugiat consequatur nemo eaque ad, neque ab, ullam totam deserunt nam voluptate sed quia soluta? Id velit corrupti recusandae doloribus debitis nemo odit alias quia maxime minus, laborum soluta!',
	}
	return (
		<Section>
			<Container>
				<div className={styles.awardsLayoutHeaderPageContent}>
					<div className={styles.leftSideHeader}>
						<h2 className={styles.title}>Конкурс премии</h2>
						<div className={styles.blockquoteBody}>
							{info?.topDesc && (
								<div
									className={styles.mainDescs}
									dangerouslySetInnerHTML={{ __html: info.topDesc }}
								/>
							)}
							{/* {aboutPageData?.caption && aboutPageData?.caption_show && (
						<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
					)} */}
						</div>
					</div>
					<div className={styles.rightSideHeader}>
						<GalleryImg variant='newsMain' />
					</div>
				</div>
			</Container>
		</Section>
	)
}
