import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC, useEffect, useRef } from 'react'
import { FormInput, type CodeMutationTrigger } from 'src/widgets/FormInput/form-input'
import { MaskedDateInput } from 'src/widgets/masked-date-input/masked-date-input'
import classNames from 'classnames'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext, useWatch } from 'react-hook-form'
import { type SelOption } from 'src/types/select'
import { FileUpload } from '../file-upload/file-upload'

type RegSectionProps = {
	errorForm?: string
	setErrorForm?: (value: string) => void
	isCodeAccepted?: boolean
	setIsCodeAccepted?: (arg0: boolean) => void
	regions?: SelOption[]
	citys?: SelOption[]
	lockSearch?: boolean
	setLockSearch?: (arg0: boolean) => void
	genres?: SelOption[]
	forms?: SelOption[]
	sendCodeReq?: CodeMutationTrigger
	checkCode?: CodeMutationTrigger
}

export const RegSection: FC<RegSectionProps> = ({
	isCodeAccepted,
	setIsCodeAccepted,
	errorForm,
	setErrorForm,
	regions = [{ label: '', value: '' }],
	citys = [{ label: '', value: '' }],
	lockSearch,
	setLockSearch,
	genres = [{ label: '', value: '' }],
	forms = [{ label: '', value: '' }],
	sendCodeReq,
	checkCode,
}) => {
	const emailInputRef = useRef<HTMLDivElement>(null)
	const codeInputRef = useRef<HTMLDivElement>(null)

	const {
		control,
		formState: { errors },
	} = useFormContext()

	const useCode = useWatch({
		control,
		name: 'code',
		defaultValue: false,
	})

	console.log(useCode)

	useEffect(() => {
		if (errorForm) {
			const targetRef = isCodeAccepted ? emailInputRef : codeInputRef

			if (targetRef.current) {
				targetRef.current.focus()
				targetRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		}
	}, [errorForm, isCodeAccepted])

	return (
		<div className={classNames(styles.formSection, styles.formSectionReg)}>
			<span className={styles.sectionTitle}>Личные данные</span>
			<FlexRow className={styles.groupInputs}>
				<FormInput
					name='surname'
					label='Фамилия *'
					className={classNames(styles.first, styles.noMargin)}
				/>
				<MaskedDateInput
					name='birthdate'
					placeholder='дд.мм.гггг'
					className={styles.adminDateInput}
					label='Дата рождения  *'
				/>
			</FlexRow>
			<FlexRow className={styles.groupInputs}>
				<FormInput name='firstname' label='Имя  *' className={styles.noMargin} />
				<FormInput
					name='fathname'
					label='Отчество *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
			</FlexRow>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='psevdoname'
					label='Авторский псевдоним'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
				<span>Укажите, чтобы вместо имени и фамилии на сайте отображался псевдоним.</span>
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='place'
					label='Откуда вы *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
				{errors.place && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name='place' />
					</p>
				)}
			</div>
			<FlexRow className={styles.groupInputsStart}>
				<div className={styles.inputwithLabel} ref={emailInputRef}>
					<FormInput
						name='email'
						label='Адрес e-mail *'
						isEmailCode
						className={classNames(styles.noMargin, styles.first)}
						isCodeAccepted={isCodeAccepted}
						setIsCodeAccepted={setIsCodeAccepted}
						setErrorForm={setErrorForm}
						sendCodeReq={sendCodeReq}
					/>
					<span className={styles.phoneSpan}>
						На этот адрес поступят письма с проверочным кодом и ссылкой на билет
					</span>
				</div>
				<div className={styles.inputwithLabel} ref={codeInputRef}>
					<FormInput
						name='code'
						label='Проверочный код *'
						isCode
						isCodeAccepted={isCodeAccepted}
						errorForm={errorForm}
						setErrorForm={setErrorForm}
						setIsCodeAccepted={setIsCodeAccepted}
						checkCode={checkCode}
						className={styles.noMargin}
					/>
					{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
					{(useCode === '' || !useCode) && !errors.code && <span>Введите код для проверки</span>}
				</div>
			</FlexRow>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='phone'
					label='Номер телефона *'
					isPhone
					className={classNames(styles.noMargin, styles.first)}
				/>
				{errors.phone && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name='phone' />
					</p>
				)}
			</div>
			<span className={styles.sectionTitle}>Загрузка работы</span>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='workname'
					label='Название работы *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
				{errors.workname && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name='workname' />
					</p>
				)}
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='form'
					label='Выбор формы *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
					selectOptions={forms ?? [{ label: '', value: '' }]}
					is_select
				/>
				{errors.form && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name='form' />
					</p>
				)}
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='genre'
					label='Основной жанр *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
					selectOptions={genres ?? [{ label: '', value: '' }]}
					is_select
				/>
				{errors.genre && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name='genre' />
					</p>
				)}
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='annotation'
					label='Краткая аннотация *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
					isTextArea
					heightTextArea='201px'
				/>
				{errors.annotation && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name='annotation' />
					</p>
				)}
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='url'
					label='Ссылка на электронную публикацию'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
			</div>
			<FileUpload className={styles.filesDrop} name='itemfile' buttonText='Загрузить работу' />
		</div>
	)
}
