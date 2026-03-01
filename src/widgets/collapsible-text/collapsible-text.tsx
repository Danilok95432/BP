import React, { useRef, useState } from 'react'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { CollapseContainer } from './components/collapse-text-container'
import { useCollapsibleText } from './useCollapsibleText'

type CollapsibleTextProps = {
	item: React.ReactNode
	lineClamp: number
	collapsePoint?: string
}

export const CollapsibleText: React.FC<CollapsibleTextProps> = ({
	item,
	lineClamp,
	collapsePoint,
}) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const textContainerRef = useRef<HTMLDivElement | null>(null)
	const breakpoint = useBreakPoint()

	const toggleList = () => {
		setIsExpanded(!isExpanded)
	}

	const isOverflowing = useCollapsibleText({ ref: textContainerRef, lineClamp })

	if (breakpoint !== collapsePoint) {
		return <>{item}</>
	}
	return (
		<>
			<CollapseContainer ref={textContainerRef} $lineClamp={lineClamp} $isExpanded={isExpanded}>
				{item}
			</CollapseContainer>
			{isOverflowing && (
				<MainButton $variant='show' className={styles.showMoreBtn} onClick={toggleList}>
					{isExpanded ? 'Скрыть' : 'Показать ещё'}
				</MainButton>
			)}
		</>
	)
}
