/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, {
	useState,
	useRef,
	type InputHTMLAttributes,
	type TextareaHTMLAttributes,
	useEffect,
} from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import styles from './index.module.scss'
import { Controller, type FieldError, useFormContext } from 'react-hook-form'
import { type SelOption } from 'src/types/select'
import { toast } from 'react-toastify'
import {
	useCheckRegistrationCodeMutation,
	useGetRegistrationCodeMutation,
} from 'src/features/auth/api/auth.api'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

export type CodeMutationTrigger = (body: FormData) => Promise<unknown>

type MutationResponseData = {
	status?: string
	errortext?: string
	ticket?: string
	ticket_link?: string
}

interface CustomProps {
	label: string
	error?: string
	isPassword?: boolean
	isPhone?: boolean
	isSmallLabel?: boolean
	isPhoneWithCode?: boolean
	isEmailCode?: boolean
	maskChar?: string
	dynamicError?: FieldError | undefined
	name: string
	is_select?: boolean
	is_city_select?: boolean
	isCode?: boolean
	isTextArea?: boolean
	heightTextArea?: string
	selectOptions?: SelOption[]
	errorForm?: string
	searchValue?: string
	setSearchValue?: (value: string) => void
	setErrorForm?: (value: string) => void
	disabled?: boolean
	disabledList?: boolean
	accept?: boolean
	isCodeAccepted?: boolean
	setIsCodeAccepted?: (arg0: boolean) => void
	setRegionValue?: (arg0: string) => void
	lockSearch?: boolean
	setLockSearch?: (arg0: boolean) => void
	sendCodeClass?: string
	setTicketUrl?: (arg0: string) => void
	sendCodeReq?: CodeMutationTrigger
	checkCode?: CodeMutationTrigger
	codeLength?: number
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> &
	TextareaHTMLAttributes<HTMLTextAreaElement> &
	CustomProps

const getMutationData = (response: unknown): MutationResponseData | undefined => {
	if (!response || typeof response !== 'object' || !('data' in response)) return undefined

	return (response as { data?: MutationResponseData }).data
}

const hasMutationError = (response: unknown) => {
	return !!response && typeof response === 'object' && 'error' in response
}

const isFilled = (value: unknown) => {
	if (Array.isArray(value)) return value.length > 0
	if (value && typeof value === 'object') {
		const option = value as Partial<SelOption>
		return Boolean(option.label ?? option.value)
	}

	return String(value ?? '').length > 0
}

const getSelectInputValue = (value: unknown) => {
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		return String((value as Partial<SelOption>).label ?? '')
	}

	return String(value ?? '')
}

export const FormInput: React.FC<TextInputProps> = ({
	label,
	error,
	isPassword = false,
	isSmallLabel,
	isPhone = false,
	isCode = false,
	isCodeAccepted,
	disabledList,
	setIsCodeAccepted,
	setErrorForm,
	isPhoneWithCode = false,
	isEmailCode = false,
	setRegionValue,
	className,
	errorForm,
	onFocus,
	maskChar = '_',
	name,
	is_select,
	is_city_select,
	isTextArea = false,
	heightTextArea = '120px',
	lockSearch,
	setLockSearch,
	selectOptions,
	searchValue = '',
	disabled,
	accept,
	setSearchValue,
	sendCodeClass,
	setTicketUrl,
	sendCodeReq,
	checkCode,
	codeLength = 5,
	...restProps
}) => {
	const {
		register,
		control,
		watch,
		trigger,
		setValue,
		formState: { errors },
	} = useFormContext()
	const inputRef = useRef<HTMLInputElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const selectWrapperRef = useRef<HTMLDivElement>(null)
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const [isFocused, setIsFocused] = useState(false)
	const [isSended, setIsSended] = useState(false)
	const [showOptions, setShowOptions] = useState(false)
	const [forceShowAllOptions, setForceShowAllOptions] = useState(false)
	const [codeStatus, setCodeStatus] = useState<'idle' | 'ok' | 'error'>('idle')
	const fieldValue = watch(name)
	const shouldRaiseLabel = isFocused || isFilled(fieldValue)
	const fieldError = error ?? (errors as Record<string, { message?: string }>)[name]?.message

	const [getCode] = useGetRegistrationCodeMutation()
	const [checkPhoneCode] = useCheckRegistrationCodeMutation()

	const handleFocus = () => setIsFocused(true)
	const handleBlur = () => setIsFocused(false)
	const [countdown, setCountdown] = useState<number>(0)

	useEffect(() => {
		if (!is_select) return

		const handleClickOutside = (event: MouseEvent) => {
			if (selectWrapperRef.current && !selectWrapperRef.current.contains(event.target as Node)) {
				setShowOptions(false)
				setForceShowAllOptions(false)
				setIsFocused(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [is_select])

	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
		}
	}, [])

	const startCountdown = () => {
		if (timerRef.current) clearInterval(timerRef.current)

		setIsSended(true)
		setCountdown(120)

		timerRef.current = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					if (timerRef.current) clearInterval(timerRef.current)
					setIsSended(false)
					return 0
				}

				return prev - 1
			})
		}, 1000)
	}

	const handleSendPhoneCode = async (phone: string) => {
		try {
			const response = await getCode(phone)

			if ('error' in response) {
				toast.error('Не удалось отправить код. Проверьте соединение.', {
					position: 'bottom-right',
					autoClose: 5000,
				})
				return
			}
			const { status, errortext, ticket } = response.data

			if (status === 'ok') {
				startCountdown()
				setIsCodeAccepted?.(false)
				setTicketUrl?.(ticket ?? '')
				setErrorForm?.('')
			} else if (status === 'error') {
				toast.error(errortext ?? 'Ошибка при отправке кода. Повторите попытку позже', {
					position: 'bottom-right',
					autoClose: 5000,
				})
			}
		} catch (error) {
			toast.error('Неизвестная ошибка', {
				position: 'bottom-right',
				autoClose: 5000,
			})
			console.error('handleSendPhoneCode error:', error)
		}
	}

	const handleSendEmailCode = async (email: string) => {
		const isValidEmail = await trigger(name)
		const normalizedEmail = email.trim()

		if (!normalizedEmail || !isValidEmail) {
			toast.error('Введите корректную электронную почту', {
				position: 'bottom-right',
				autoClose: 5000,
			})
			return
		}

		if (!sendCodeReq) {
			toast.error('Не настроен запрос отправки кода', {
				position: 'bottom-right',
				autoClose: 5000,
			})
			return
		}

		const formData = new FormData()
		formData.append('email', normalizedEmail)

		try {
			const response = await sendCodeReq(formData)
			const data = getMutationData(response)

			if (hasMutationError(response)) {
				toast.error('Не удалось отправить код. Проверьте соединение.', {
					position: 'bottom-right',
					autoClose: 5000,
				})
				return
			}

			if (data?.status === 'ok') {
				startCountdown()
				setValue('code', '', { shouldDirty: true, shouldValidate: false })
				setCodeStatus('idle')
				setIsCodeAccepted?.(false)
				setErrorForm?.('')
				toast.success('Код отправлен на почту', {
					position: 'bottom-right',
					autoClose: 5000,
				})
				return
			}

			toast.error(data?.errortext ?? 'Ошибка при отправке кода. Повторите попытку позже', {
				position: 'bottom-right',
				autoClose: 5000,
			})
		} catch (error) {
			toast.error('Неизвестная ошибка', {
				position: 'bottom-right',
				autoClose: 5000,
			})
			console.error('handleSendEmailCode error:', error)
		}
	}

	if (is_select) {
		return (
			<div className={cn(styles.inputContainer, className)}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => {
						const inputValue = getSelectInputValue(field.value)
						const filteredOptions = forceShowAllOptions
							? selectOptions
							: selectOptions?.filter((opt) =>
									opt.label.toLowerCase().includes(inputValue.toLowerCase()),
								)

						return (
							<div
								className={cn(styles.inputWrapper, {
									[styles.focused]: isFocused,
									[styles.error]: !!fieldError,
									[styles.disabled]: disabled,
									[styles.active]: isFilled(field.value),
								})}
								ref={selectWrapperRef}
							>
								<input
									className={cn(styles.input, { [styles.active]: isFilled(field.value) })}
									value={inputValue}
									disabled={disabled}
									onChange={(e) => {
										field.onChange(e.target.value)
										setRegionValue?.(e.target.value)
										setShowOptions(true)
										setForceShowAllOptions(false)
										if (is_city_select && lockSearch && setLockSearch) {
											setLockSearch?.(false)
										}
									}}
									onFocus={() => {
										setIsFocused(true)
										setShowOptions(true)
										setForceShowAllOptions(true)
									}}
								/>
								<label
									className={cn(styles.label, {
										[styles.raised]: isFocused || isFilled(field.value),
										[styles.active]: isFilled(field.value),
									})}
								>
									{label}
								</label>
								{showOptions && !disabledList && filteredOptions && filteredOptions.length > 0 && (
									<ul className={styles.selectOptions}>
										{filteredOptions.map((option) => (
											<li
												key={option.value}
												className={styles.option}
												onClick={() => {
													field.onChange(option)
													setShowOptions(false)
													setForceShowAllOptions(false)
													if (is_city_select && setLockSearch) {
														setLockSearch?.(true)
													}
												}}
											>
												{option.label}
											</li>
										))}
									</ul>
								)}
							</div>
						)
					}}
				/>
			</div>
		)
	} else if (isCode) {
		return (
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
						const rawValue = e.target.value.replace(/\D/g, '').slice(0, codeLength)
						field.onChange(rawValue)
						setErrorForm?.('')

						if (rawValue.length !== codeLength) {
							setCodeStatus('idle')
							setIsCodeAccepted?.(false)
							return
						}

						if (checkCode) {
							const email = String(watch('email') ?? '').trim()
							const isValidEmail = await trigger('email')

							if (!email || !isValidEmail) {
								setCodeStatus('error')
								setIsCodeAccepted?.(false)
								setErrorForm?.('Введите корректную электронную почту')
								return
							}

							const formData = new FormData()
							formData.append('email', email)
							formData.append('code', rawValue)

							try {
								const response = await checkCode(formData)
								const data = getMutationData(response)

								if (!hasMutationError(response) && data?.status === 'ok') {
									setCodeStatus('ok')
									setIsCodeAccepted?.(true)
									setErrorForm?.('')
									return
								}

								setCodeStatus('error')
								setIsCodeAccepted?.(false)
								setErrorForm?.(data?.errortext ?? 'Неверный код')
							} catch (err) {
								setCodeStatus('error')
								setIsCodeAccepted?.(false)
								setErrorForm?.('Не удалось проверить код')
							}
							return
						}

						try {
							const res = await checkPhoneCode({ phone: watch('phone'), code: rawValue })
							if ('data' in res && res.data?.status === 'ok') {
								setCodeStatus('ok')
								setIsCodeAccepted?.(true)
								setTicketUrl?.(res.data?.ticket_link ?? '')
							} else {
								setCodeStatus('error')
								setIsCodeAccepted?.(false)
							}
						} catch (err) {
							setCodeStatus('error')
						}
					}

					return (
						<div className={cn(styles.inputContainer, className)}>
							<div
								className={cn(styles.inputWrapper, {
									[styles.focused]: isFocused,
									[styles.error]: codeStatus === 'error' || !!fieldError,
									[styles.accept]: codeStatus === 'ok',
									[styles.disabled]: (disabled ?? isCodeAccepted) && errorForm === '',
									[styles.active]: isFilled(field.value),
								})}
							>
								<input
									type='text'
									inputMode='numeric'
									pattern='[0-9]*'
									maxLength={codeLength}
									className={cn(styles.input, { [styles.active]: isFilled(field.value) })}
									value={field.value || ''}
									disabled={(disabled ?? isCodeAccepted) && errorForm === ''}
									onChange={handleChange}
									onFocus={() => setIsFocused(true)}
									onBlur={() => setIsFocused(false)}
								/>
								<label
									className={cn(styles.label, {
										[styles.raised]: isFocused || !!field.value,
										[styles.active]: isFilled(field.value),
									})}
								>
									{label}
								</label>
							</div>
						</div>
					)
				}}
			/>
		)
	}

	if (isEmailCode) {
		return (
			<div className={cn(styles.inputContainer, className)}>
				<div
					className={cn(styles.inputWrapper, {
						[styles.focused]: isFocused,
						[styles.error]: !!fieldError,
						[styles.disabled]: disabled,
						[styles.accept]: accept ?? isCodeAccepted,
						[styles.active]: isFilled(fieldValue),
					})}
				>
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<>
								<input
									name={field.name}
									value={field.value || ''}
									className={cn(styles.input, { [styles.active]: isFilled(field.value) })}
									disabled={disabled}
									ref={(e) => {
										field.ref(e)
										;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e
									}}
									onChange={(e) => {
										field.onChange(e)
										setValue('code', '', { shouldDirty: true, shouldValidate: false })
										setCodeStatus('idle')
										setIsCodeAccepted?.(false)
										setErrorForm?.('')
									}}
									onFocus={handleFocus}
									onBlur={handleBlur}
								/>
								<MainButton
									className={cn(sendCodeClass, styles.sendCodeBtn, styles.sendCodeBtnEmail, {
										[styles.resend]: countdown > 0 && !isCodeAccepted,
										[styles.codeAccepted]: isCodeAccepted,
										[styles.activeBtn]: isFilled(field.value),
									})}
									onClick={async (e: { preventDefault: () => void }) => {
										e.preventDefault()
										await handleSendEmailCode(String(field.value ?? ''))
									}}
									disabled={!field.value || isSended || countdown > 0 || isCodeAccepted}
								>
									{isCodeAccepted
										? 'Код верный'
										: countdown > 0
											? `Код отправлен`
											: 'Отправить код'}
								</MainButton>
							</>
						)}
					/>
					<label
						className={cn(styles.label, {
							[styles.raised]: shouldRaiseLabel,
							[styles.active]: isFilled(fieldValue),
							[styles.smallLable]: isSmallLabel,
						})}
					>
						{label}
					</label>
				</div>
			</div>
		)
	}

	return (
		<div className={cn(styles.inputContainer, className)}>
			<div
				className={cn(styles.inputWrapper, {
					[styles.focused]: isFocused,
					[styles.error]: !!fieldError,
					[styles.disabled]: disabled,
					[styles.accept]: accept,
					[styles.textarea]: isTextArea,
					[styles.active]: isFilled(fieldValue),
				})}
			>
				{isPhone || isPhoneWithCode ? (
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<>
								<InputMask
									mask='+9 (999) 999-99-99'
									inputRef={(e) => {
										field.ref(e)
										;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e
									}}
									value={field.value ?? ''}
									onChange={field.onChange}
									onBlur={field.onBlur}
									onFocus={() => {
										handleFocus()
									}}
								>
									<input
										className={cn(styles.input, { [styles.active]: isFilled(fieldValue) })}
										type='tel'
										ref={field.ref}
										{...restProps}
									/>
								</InputMask>
								{isPhoneWithCode && (
									<MainButton
										className={cn(sendCodeClass, styles.sendCodeBtn, {
											[styles.resend]: countdown > 0 && !isCodeAccepted,
											[styles.codeAccepted]: isCodeAccepted,
										})}
										onClick={async (e: { preventDefault: () => void }) => {
											e.preventDefault()
											await handleSendPhoneCode(String(fieldValue ?? ''))
										}}
										disabled={
											!fieldValue ||
											String(fieldValue).includes('_') ||
											isSended ||
											countdown > 0 ||
											isCodeAccepted
										}
									>
										{isCodeAccepted
											? 'Код верный'
											: countdown > 0
												? `Повторная отправка: ${countdown}`
												: 'Отправить код'}
									</MainButton>
								)}
							</>
						)}
					/>
				) : isTextArea ? (
					<textarea
						{...register(name)}
						className={cn(styles.input, { [styles.active]: isFilled(fieldValue) })}
						disabled={disabled}
						style={{ height: heightTextArea }}
						ref={(e) => {
							register(name).ref(e)
							;(textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = e
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						{...(restProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
					/>
				) : (
					<input
						{...register(name)}
						{...(restProps as InputHTMLAttributes<HTMLInputElement>)}
						className={cn(styles.input, { [styles.active]: isFilled(fieldValue) })}
						disabled={disabled}
						type={isPassword ? 'password' : restProps.type}
						ref={(e) => {
							register(name).ref(e)
							;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
				)}
				<label
					className={cn(styles.label, {
						[styles.raised]: shouldRaiseLabel,
						[styles.active]: isFilled(fieldValue),
						[styles.smallLable]: isSmallLabel,
					})}
				>
					{label}
				</label>
			</div>
		</div>
	)
}
