import { type ImageItemWithText } from './photos'

type DocType = {
	id: string
	name: string
	url: string
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
