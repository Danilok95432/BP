import { type ChangeEvent, type FC, useRef } from 'react'
import classNames from 'classnames'
import { ErrorMessage } from '@hookform/error-message'
import { useController, useFormContext } from 'react-hook-form'
import { AddButton } from 'src/shared/ui/AddButton/AddButton'
import styles from '../../index.module.scss'
import { FileUploadedSVG } from 'src/shared/ui/icons/fileUploadedSVG'
import { AddFIlePlusSvg } from 'src/shared/ui/icons/addFilePlusSVg'
import { TrashIconSvg } from 'src/shared/ui/icons/trashIconSVG'

type FileUploadProps = {
	name: string
	className?: string
	buttonText?: string
	accept?: string
}

export const FileUpload: FC<FileUploadProps> = ({
	name,
	className,
	buttonText = 'Загрузить файл',
	accept,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const {
		control,
		formState: { errors },
	} = useFormContext()

	const {
		field,
		fieldState: { error: fieldError },
	} = useController({ name, control })

	const file = field.value as File | null

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] ?? null
		field.onChange(selectedFile)
	}

	const handleClear = () => {
		field.onChange(null)

		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	return (
		<>
			<div className={classNames(className)}>
				<input
					ref={inputRef}
					type='file'
					accept={accept}
					style={{ display: 'none' }}
					onChange={handleChange}
				/>

				<AddButton
					onClick={(event) => {
						event.preventDefault()
						inputRef.current?.click()
					}}
					icon={file ? <FileUploadedSVG /> : <AddFIlePlusSvg />}
				>
					{file?.name ?? buttonText}
				</AddButton>

				{file && (
					<div className={styles.vector} onClick={handleClear}>
						<TrashIconSvg />
					</div>
				)}
			</div>
			{fieldError && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</>
	)
}
