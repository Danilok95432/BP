import { type ImageItemWithText } from './photos'

export type AboutGeneralPage = {
	logo: string
	caption: string
	caption_show: boolean
	mainDescs: string[]
	descs: string[]
	photoGallery: ImageItemWithText[]
	mainphoto: ImageItemWithText[]
}

type ShortTraditionElement = {
	id: string
	title: string
	desc: string
}

export type AboutTraditionPage = {
	topDesc: string
	bottomDesc: string
	photoGallery: ImageItemWithText[]
	traditions: ShortTraditionElement[]
}
