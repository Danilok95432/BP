import { type FC } from 'react'

import cn from 'classnames'
import { createPortal } from 'react-dom'

import { useAppSelector } from 'src/app/store/hooks/store'
import { getModalContent } from './store/modal.selectors'

import styles from './index.module.scss'
import { CloseSvg } from 'src/shared/ui/icons/closeSVG'
import { useActions } from 'src/app/store/hooks/actions'

export const Modal: FC = () => {
	const currentModalContent = useAppSelector(getModalContent)
	const { closeModal } = useActions()
	if (!currentModalContent) {
		return null
	}

	return createPortal(
		<div className={cn(styles.modal, { [styles.active]: currentModalContent })}>
			<div className={styles.modalWrapper}>
				<div className={cn(styles.modalContent)} onClick={(e) => e.stopPropagation()}>
					{currentModalContent}
				</div>
				<div className={styles.closeVector} onClick={() => closeModal()}>
					<CloseSvg />
				</div>
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement,
	)
}
