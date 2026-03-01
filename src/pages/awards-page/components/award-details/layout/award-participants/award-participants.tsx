import { useState, type FC } from 'react'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { MobileList } from 'src/widgets/mobile-list/mobile-list'
import { FilterPanel } from './components/filter-panel/filter-panel'
import { CustomTable } from 'src/widgets/custom-table/custom-table'
import { formatSingleDate, parseTimeFromDate } from 'src/shared/helpers/utils'
import { ParticipantCard } from './components/participant-card/participant-card'

type ApplicationStatus = 'принята' | 'отказ' | 'резерв' | 'лонг-лист' | 'шорт-лист' | 'номинант'

// Типы для формы произведения
type WorkForm = 'Роман' | 'Мини-рассказ' | 'Повесть' | 'Рассказ'

export interface AwardCard {
	id: string
	participant: string
	workTitle: string
	workForm: WorkForm
	submittedAt: string
	status: ApplicationStatus
}

export const AwardParticipants: FC = () => {
	const participants: AwardCard[] = [
		{
			id: '563',
			participant: 'Пузырев Алексей Витальевич',
			workTitle: 'Длинное название произведения из шести слов',
			workForm: 'Роман',
			submittedAt: '2024-08-22T08:43:00.000Z',
			status: 'принята',
		},
		{
			id: '2',
			participant: 'Родионов Илья Тимурович',
			workTitle: 'Короткое название',
			workForm: 'Мини-рассказ',
			submittedAt: '2024-08-21T14:30:00.000Z',
			status: 'принята',
		},
		{
			id: '31',
			participant: 'Балашов Даниил Станиславович',
			workTitle: 'Кратко',
			workForm: 'Повесть',
			submittedAt: '2024-08-20T09:15:00.000Z',
			status: 'принята',
		},
		{
			id: '45',
			participant: 'Ларионов Николай Никитич',
			workTitle: 'Еще одно длинное название',
			workForm: 'Рассказ',
			submittedAt: '2024-08-19T16:22:00.000Z',
			status: 'отказ',
		},
		{
			id: '8',
			participant: 'Тихомиров Даниил Дмитриевич',
			workTitle: 'Долго думал',
			workForm: 'Повесть',
			submittedAt: '2024-08-18T11:05:00.000Z',
			status: 'резерв',
		},
		{
			id: '12',
			participant: 'Кузнецов Максим Егорович',
			workTitle: 'Берендей и колокольня',
			workForm: 'Мини-рассказ',
			submittedAt: '2024-08-17T13:40:00.000Z',
			status: 'лонг-лист',
		},
		{
			id: '125',
			participant: 'Козлов Лев Ильич',
			workTitle: 'Длинное название произведения из шести слов',
			workForm: 'Рассказ',
			submittedAt: '2024-08-16T10:30:00.000Z',
			status: 'лонг-лист',
		},
		{
			id: '3',
			participant: 'Малинин Илья Тихонович',
			workTitle: 'Длинное название произведения из шести слов',
			workForm: 'Повесть',
			submittedAt: '2024-08-15T12:25:00.000Z',
			status: 'шорт-лист',
		},
		{
			id: '81',
			participant: 'Юдина Серафима Ивановна',
			workTitle: 'Длинное название произведения из шести слов',
			workForm: 'Роман',
			submittedAt: '2024-08-14T15:50:00.000Z',
			status: 'номинант',
		},
		{
			id: '26',
			participant: 'Денисова Анастасия Никитична',
			workTitle: 'Длинное название произведения из шести слов',
			workForm: 'Повесть',
			submittedAt: '2024-08-13T09:10:00.000Z',
			status: 'резерв',
		},
	]

	const breakpoint = useBreakPoint()
	const navigate = useNavigate()

	const [searchName, setSearchName] = useState<string>('')
	const [searchWorkTitle, setWorkTitle] = useState<string>('')
	const [searchWorkForm, setWorkForm] = useState<string>('0')
	const [searchStatus, setStatus] = useState<string>('0')
	const [view, setView] = useState<string>('list')

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
	}

	const rowClickHandler = (id: string) => {
		navigate(`/participants/${id}`)
	}

	const tableTitles = [
		'ID',
		'Участник',
		'Название произведения',
		'Форма произведения',
		'Дата и время подачи',
		'Статус заявки',
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
					<p key='2'>{participantEl.workTitle}</p>,
					<p key='3'>{participantEl.workForm}</p>,
					<p key='4'>
						{formatSingleDate(participantEl.submittedAt ?? new Date())}
						{parseTimeFromDate(participantEl.submittedAt)}
					</p>,
					<p key='5'>{participantEl.status || 'Не указано'}</p>,
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
			<p className={styles.numberOfFilter}>Всего участников по выбранным фильтрам: 15</p>
			{view === 'list' && participants && breakpoint !== 'S' ? (
				<CustomTable
					className={styles.participantsTable}
					rowData={formatEventsTableData(participants ?? [])}
					colTitles={tableTitles}
					rowClickHandler={rowClickHandler}
					initialVisibleRows={3}
				/>
			) : (
				<MobileList
					items={participants ?? []}
					renderItem={ParticipantCard}
					classListItems={styles.participantsTab}
					defaultVisibleCount={3}
					classNameBtn={styles.showMoreBtnTab}
				/>
			)}
		</div>
	)
}
