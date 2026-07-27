import { useState, type FC } from 'react'

import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { MobileList } from 'src/widgets/mobile-list/mobile-list'
import { FilterPanel } from './components/filter-panel/filter-panel'
import { CustomTable } from 'src/widgets/custom-table/custom-table'
import { formatSingleDate, parseTimeFromDate } from 'src/shared/helpers/utils'
import { ParticipantCard } from './components/participant-card/participant-card'
import { useGetLongListQuery } from 'src/features/pages-header/api/pages-header.api'

export interface AwardCard {
	id: string
	participant: string
	workTitle: string
	workForm: string
	submittedAt: string
	status: string
	subgenre: string
}

export const AwardParticipants: FC = () => {
	const { id } = useParams()

	const breakpoint = useBreakPoint()

	const [searchName, setSearchName] = useState<string>('')
	const [searchWorkTitle, setWorkTitle] = useState<string>('')
	const [searchWorkForm, setWorkForm] = useState<string>('0')
	const [searchStatus, setStatus] = useState<string>('0')
	const [view, setView] = useState<string>('list')

	const { data } = useGetLongListQuery({
		id: id ?? '',
		search: searchName,
		searchWorkTitle,
		workForm: searchWorkForm,
	})

	const options = {
		name: searchName,
		setSearchName,
		workTitle: searchWorkTitle,
		setWorkTitle,
		workForm: searchWorkForm,
		setWorkForm,
		status: searchStatus,
		setStatus,
		view,
		setView,
		selectOptions: data?.forms,
	}

	const tableTitles = [
		'ID',
		'Участник',
		'Название произведения',
		'Форма работы',
		'Поджанр работы',
		'Дата и время подачи',
	]
	const formatEventsTableData = (participants: AwardCard[]) => {
		return participants?.map((participantEl) => {
			return {
				rowId: participantEl.id,
				cells: [
					<p key='0' className={styles.idCell}>
						{participantEl.id}
					</p>,
					<p key='1'>{participantEl.participant}</p>,
					<p key='2' className={styles.workTitleCell}>
						{participantEl.workTitle}
					</p>,
					<p key='3'>{participantEl.workForm}</p>,
					<p key='4'>{participantEl.subgenre}</p>,
					<p key='5'>
						{formatSingleDate(participantEl.submittedAt ?? new Date())}{' '}
						{parseTimeFromDate(participantEl.submittedAt)}
					</p>,
				],
			}
		})
	}

	return (
		<div className={styles.participantsSection}>
			<h4>Участники номинации</h4>
			<div className={styles.headParticipant}>
				<FilterPanel options={options} />
			</div>
			<p className={styles.numberOfFilter}>
				Всего участников по выбранным фильтрам: {data?.participants?.length}
			</p>
			{view === 'list' && data?.participants && breakpoint !== 'S' ? (
				<CustomTable
					className={styles.participantsTable}
					rowData={formatEventsTableData(data?.participants ?? [])}
					colTitles={tableTitles}
					initialVisibleRows={3}
				/>
			) : (
				<MobileList
					items={data?.participants ?? []}
					renderItem={ParticipantCard}
					classListItems={styles.participantsTab}
					defaultVisibleCount={3}
					classNameBtn={styles.showMoreBtnTab}
				/>
			)}
		</div>
	)
}
