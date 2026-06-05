/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type * as yup from 'yup'

import styles from './index.module.scss'
import { type FC, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import {
	useCheckEmailCodeMutation,
	useGetListsForRequestQuery,
	useSaveRequestMutation,
	useSendEmailCodeMutation,
} from 'src/features/home/api/home.api'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useActions } from 'src/app/store/hooks/actions'
import { type RegInputs, regSchema } from './schema'
import { HeadSection } from './components/head-section/head-section'
import { RegSection } from './components/reg-section/reg-section'

type RegEventPartModalProps = {
	id: string
}

type SaveRequestResponse = {
	data?: {
		status?: string
		errortext?: string
	}
	error?: unknown
}

const getSelectValue = (value: RegInputs['form'] | RegInputs['genre']) => {
	if (typeof value === 'string') return value

	return String(value.value)
}

export const BuyTicketModal: FC<RegEventPartModalProps> = ({ id }) => {
	const { closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)
	const { data: lists } = useGetListsForRequestQuery(null)
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [errorForm, setErrorForm] = useState<string>('')

	const [sendCodeReq] = useSendEmailCodeMutation()
	const [checkCode] = useCheckEmailCodeMutation()
	const [saveReq, { isLoading: isSaveLoading }] = useSaveRequestMutation()

	const methods = useForm<RegInputs>({
		mode: 'onBlur',
		resolver: yupResolver(regSchema as unknown as yup.ObjectSchema<RegInputs>),
		defaultValues: {
			surname: '',
			firstname: '',
			fathname: '',
			birthdate: '',
			psevdoname: '',
			place: '',
			email: '',
			phone: '',
			code: '',
			workname: '',
			form: '',
			genre: '',
			annotation: '',
			url: '',
			itemfile: null,
		},
	})

	const emailValue = useWatch({ control: methods.control, name: 'email' })
	const prevEmailRef = useRef<string | undefined>(undefined)

	useEffect(() => {
		if (prevEmailRef.current === undefined) {
			prevEmailRef.current = emailValue
			return
		}

		if (prevEmailRef.current === emailValue) return

		prevEmailRef.current = emailValue
		setErrorForm('')
		setIsCodeAccepted(false)
		methods.setValue('code', '', { shouldDirty: true, shouldValidate: true })
	}, [emailValue, methods])

	const onSubmit: SubmitHandler<RegInputs> = async (data) => {
		if (!isCodeAccepted) {
			methods.setError('code', {
				type: 'manual',
				message: 'Подтвердите электронную почту проверочным кодом',
			})
			setErrorForm('Подтвердите электронную почту проверочным кодом')
			return
		}

		const formData = new FormData()
		formData.append('surname', data.surname)
		formData.append('firstname', data.firstname)
		formData.append('fathname', data.fathname)
		formData.append('birthdate', data.birthdate)
		formData.append('psevdoname', data.psevdoname ?? '')
		formData.append('workname', data.workname)
		formData.append('id_form', getSelectValue(data.form))
		formData.append('id_zhanr', getSelectValue(data.genre))
		formData.append('place', data.place)
		formData.append('phone', data.phone)
		formData.append('email', data.email)
		formData.append('code', data.code)
		formData.append('annotation', data.annotation)
		if (data.url) formData.append('url', data.url)
		if (data.itemfile) formData.append('itemfile', data.itemfile)

		try {
			const res = (await saveReq(formData)) as SaveRequestResponse

			if (res.error) {
				toast.error('Произошла ошибка при подаче заявки', {
					position: 'bottom-right',
				})
				return
			}

			if (res.data?.status === 'ok') {
				toast.success('Подача заявки прошла успешно!', {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
				closeModal()
				return
			}

			const serverError = res.data?.errortext ?? 'Произошла ошибка при подаче заявки'
			toast.error(serverError, {
				position: 'bottom-right',
			})
			setErrorForm(serverError)
		} catch (error) {
			toast.error('Произошла ошибка при подаче заявки', {
				position: 'bottom-right',
			})
			console.error('Unexpected error:', error)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (window.innerWidth < 768) return

			const modalEl = modalRef.current
			const target = event.target as HTMLElement

			if (!modalEl || modalEl.contains(target)) return

			const { clientX, clientY } = event
			const windowWidth = window.innerWidth
			const windowHeight = window.innerHeight
			const scrollbarSize = 16
			const isClickOnScrollbar =
				clientX >= windowWidth - scrollbarSize || clientY >= windowHeight - scrollbarSize

			if (isClickOnScrollbar) return

			closeModal()
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [closeModal])

	return (
		<div className={styles.ticketModal} ref={modalRef}>
			<div className='modal-content'>
				<div className={styles.modalContent}>
					<FormProvider {...methods}>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							noValidate
							className={styles.ticketForm}
						>
							<HeadSection id={id} />
							<RegSection
								genres={lists?.zhanr}
								forms={lists?.forms}
								errorForm={errorForm}
								setErrorForm={setErrorForm}
								isCodeAccepted={isCodeAccepted}
								setIsCodeAccepted={setIsCodeAccepted}
								sendCodeReq={sendCodeReq}
								checkCode={checkCode}
							/>
							<p className={styles.agreementText}>
								Подавая заявку, я подтверждаю, что ознакомлен(а) с{' '}
								<a
									target='_blank'
									rel='noopener noreferrer'
									href={'https://pabapi.npotau.ru/uploads/catfiles/event/36_1780581992_924337.docx'}
									download
								>
									правилами проведения номинации конкурса
								</a>{' '}
								и обязуюсь им следовать
							</p>
							<MainButton type='submit' className={styles.submitBtn} disabled={isSaveLoading}>
								{isSaveLoading ? 'Отправка...' : 'Подать заявку'}
							</MainButton>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
}
