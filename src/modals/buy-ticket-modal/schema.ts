/* eslint-disable @typescript-eslint/naming-convention */
import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type RegInputs = {
	surname: string
	firstname: string
	fathname: string
	birthdate: string
	psevdoname?: string
	place: string
	email: string
	phone: string
	code: string
	workname: string
	form: SelOption | string
	genre: SelOption | string
	annotation: string
	url?: string
	itemfile: File | null
}

const requiredSelect = (message: string) =>
	yup
		.mixed<SelOption | string>()
		.required(message)
		.test('required-select', message, (value) => {
			if (typeof value === 'string') return value.trim().length > 0
			if (value && typeof value === 'object' && 'value' in value) {
				return String(value.value ?? '').trim().length > 0
			}

			return false
		})

const isRealDate = (value?: string) => {
	if (!value) return false

	const [day, month, year] = value.split('.').map(Number)
	const date = new Date(year, month - 1, day)
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day &&
		date <= today
	)
}

const isFile = (value: unknown) =>
	(typeof File !== 'undefined' && value instanceof File) ||
	(!!value && typeof value === 'object' && 'name' in value && 'size' in value)

export const regSchema = yup.object().shape({
	surname: yup.string().trim().required('Введите фамилию'),
	firstname: yup.string().trim().required('Введите имя'),
	fathname: yup.string().trim().required('Введите отчество'),
	birthdate: yup
		.string()
		.required('Введите дату рождения')
		.matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Введите дату в формате дд.мм.гггг')
		.test('real-date', 'Введите корректную дату рождения', isRealDate),
	psevdoname: yup.string().trim().notRequired(),
	place: yup.string().trim().required('Введите название населенного пункта'),
	email: yup.string().trim().required('Введите электронную почту').email('Введите верную почту'),
	phone: yup
		.string()
		.required('Введите номер телефона')
		.test('phone-length', 'Введите полный номер телефона', (value) => {
			return (value ?? '').replace(/\D/g, '').length === 11
		}),
	code: yup
		.string()
		.required('Введите проверочный код')
		.matches(/^\d{5}$/, 'Введите 5 цифр проверочного кода'),
	workname: yup.string().trim().required('Введите название работы'),
	form: requiredSelect('Выберите форму'),
	genre: requiredSelect('Выберите жанр'),
	annotation: yup.string().trim().required('Введите краткую аннотацию'),
	url: yup
		.string()
		.trim()
		.notRequired()
		.test('url', 'Введите корректную ссылку', (value) => {
			if (!value) return true

			return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i.test(value)
		}),
	itemfile: yup
		.mixed<File>()
		.required('Загрузите файл')
		.test('file-required', 'Загрузите файл', isFile),
})
