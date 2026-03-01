import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC, useEffect, useRef } from 'react'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { MaskedDateInput } from 'src/widgets/masked-date-input/masked-date-input'
import classNames from 'classnames'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { type SelOption } from 'src/types/select'
import { ReactDropzoneFiles } from 'src/widgets/reactDropzoneFiles/reactDropzoneFiles'
import { AddButton } from 'src/shared/ui/AddButton/AddButton'

type RegSectionProps = {
	errorForm?: string
	setErrorForm?: (value: string) => void
	isCodeAccepted?: boolean
	setIsCodeAccepted?: (arg0: boolean) => void
	regions?: SelOption[]
	citys?: SelOption[]
	lockSearch?: boolean
	setLockSearch?: (arg0: boolean) => void
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
}) => {
	const phoneInputRef = useRef<HTMLInputElement>(null)
	const codeInputRef = useRef<HTMLInputElement>(null)

	const {
		formState: { errors },
	} = useFormContext()
	// const region = useWatch({ control, name: 'id_region' })

	useEffect(() => {
		if (errorForm) {
			const targetRef = isCodeAccepted ? phoneInputRef : codeInputRef

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
					name='author'
					label='Авторский псевдоним'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
				<span>Укажите, чтобы вместо имени и фамилии на сайте отображался псевдоним.</span>
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='id_region'
					label='Откуда вы *'
					className={styles.noMargin}
					is_select
					selectOptions={regions ?? [{ label: 'Не выбрано', value: '0' }]}
				/>
				{errors.id_region && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={'id_region'} />
					</p>
				)}
			</div>
			<FlexRow className={styles.groupInputsStart}>
				<div className={styles.inputwithLabel} ref={phoneInputRef}>
					<FormInput
						name='email'
						label='Адрес e-mail *'
						isEmailCode={true}
						className={classNames(styles.noMargin, styles.first)}
						isCodeAccepted={isCodeAccepted}
					/>
					{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
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
						className={styles.noMargin}
					/>
					{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>Неверный код</p>}
					<span>Введите код для проверки</span>
				</div>
			</FlexRow>
			<div className={styles.inputwithLabel} ref={phoneInputRef}>
				<FormInput
					name='phone'
					label='Номер телефона *'
					isPhone
					className={classNames(styles.noMargin, styles.first)}
					isCodeAccepted={isCodeAccepted}
				/>
				{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
			</div>
			<span className={styles.sectionTitle}>Загрузка работы</span>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='nameWork'
					label='Название работы *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='form'
					label='Выбор формы *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
					selectOptions={[{ label: '', value: '' }]}
					is_select
				/>
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='genre'
					label='Основной жанр'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
					selectOptions={[{ label: '', value: '' }]}
					is_select
				/>
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='short_annotation'
					label='Краткая аннотация *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
					isTextArea
					height='201px'
				/>
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='link'
					label='Ссылка на электронную публикацию'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
			</div>
			<ReactDropzoneFiles
				className={styles.filesDrop}
				name='files'
				variant='text'
				multiple
				customUploadBtn={<AddButton>Загрузить работу</AddButton>}
			/>
		</div>
	)
}
