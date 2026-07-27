import { type ImageItemWithText } from './photos'
import { type SelOption } from './select'

type DocType = {
	id: string
	name: string
	url: string
	size: string
}

export type PagesHeader = {
	page_type: string
	title: string
	short: string
	full: string
	full2: string
	mainphoto: ImageItemWithText[]
	photoGallery: ImageItemWithText[]
	documents: DocType[]
}

export type ParticipantItem = {
	id: string
	participant: string
	subgenre: string
	submittedAt: string
	workForm: string
	workTitle: string
	status: string
}

export type LongListResponse = {
	participants: ParticipantItem[]
	forms: SelOption[]
}
