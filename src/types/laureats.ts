import { type ImageItemWithText } from './photos'

export type LaureatsResponse = {
	laureats: LaureatItem[]
}

export type LaureatItemResponse = {
	laureats: LaureatInfoResponse
}

export type LaureatInfoResponse = {
	id: string
	laureat_name: string
	laureat_info: string
	laureat_year: string
	laureat_desc: string
	laureat_full: string
	mainphoto: ImageItemWithText[]
	photos: ImageItemWithText[]
}

export type LaureatsList = {
	id: string
	title: string
	desc: string
	rule: string
	mainphoto: ImageItemWithText[]
	is_etnosport: boolean
	is_single: boolean
	is_group: boolean
	users_count: string
	groups_count: string
}

export type LaureatItem = {
	id: string
	laureat_name: string
	laureat_year: string
	laureat_info: string
	laureat_desc: string
	mainphoto: ImageItemWithText[]
}

export type EtnosportSubEventItem = {
	id: string
	date: string
	mainEvent: string
	subEventTitle: string
	place: string
	request: boolean
}

export type FunSubEventItem = {
	id: string
	date: string
	mainEvent: string
	subEventTitle: string
	place: string
	request: boolean
}

export type LaureatCardItem = {
	id: string
	title: string
	desc: string
	rule: string
	mainphoto: ImageItemWithText[]
	is_etnosport: boolean
	is_single: boolean
	is_group: boolean
	users_count: string
	groups_count: string
}
