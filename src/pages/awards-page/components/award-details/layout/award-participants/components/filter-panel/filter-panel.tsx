import cn from 'classnames'

import styles from './index.module.scss'
import { type FC } from 'react'

import { MainInput } from 'src/shared/ui/MainInput/MainInput'
import { MainSelect } from 'src/shared/ui/MainSelect/MainSelect'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { FiltersIconSVG } from 'src/shared/ui/icons/filtersIconSVG'
// import { SwitcherView } from 'src/widgets/switcher-view/switcher-view'

type FilterPanelProps = {
	options: {
		name?: string
		workTitle?: string
		workForm?: string
		status?: string
		view?: string
		setSearchName: (arg0: string) => void
		setWorkTitle: (arg0: string) => void
		setWorkForm: (arg0: string) => void
		setStatus: (arg0: string) => void
		setView: (arg0: string) => void
	}
}

export const FilterPanel: FC<FilterPanelProps> = ({ options }) => {
	return (
		<div className={styles.filterPanel}>
			<div className={styles.filters}>
				<div className={styles.searchWrapper}>
					<MainInput
						className={cn(styles.searchInput, { [styles._activeSearch]: options.name })}
						name='search'
						placeholder='имя или фамилия участника...'
						value={options.name}
						onChange={(e) => options.setSearchName(e.target.value)}
						required
					/>
				</div>
				<div className={styles.searchWrapper}>
					<MainInput
						className={cn(styles.searchInput, { [styles._activeSearch]: options.workTitle })}
						name='searchWorkTitle'
						placeholder='название произведения...'
						value={options.workTitle}
						onChange={(e) => options.setWorkTitle(e.target.value)}
						required
					/>
				</div>
				<div className={cn(styles.searchWrapper, styles.hiddenMobile)}>
					<MainSelect
						wrapperClassName={cn(styles.searchSelect)}
						name='workForm'
						items={[{ label: 'форма произведения', value: '0' }]}
						value={options.workForm}
						onChange={(e) => options.setWorkForm(e.target.value)}
						required
					/>
				</div>
				<div className={cn(styles.searchWrapper, styles.hiddenMobile)}>
					<MainSelect
						wrapperClassName={cn(styles.searchSelect)}
						name='status'
						items={[{ label: 'статус заявки', value: '0' }]}
						value={options.status}
						onChange={(e) => options.setStatus(e.target.value)}
						required
					/>
				</div>
				<MainButton className={styles.hiddenMobile}>Найти</MainButton>
				<MainButton className={styles.mobileFilters}>
					<FiltersIconSVG />
				</MainButton>
			</div>
			{/* <SwitcherView
				view={options.view}
				switchView={options.setView}
				className={styles.hiddenMobile}
			/> */}
		</div>
	)
}
