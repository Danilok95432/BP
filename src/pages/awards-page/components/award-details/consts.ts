import { type EventItem } from 'src/types/event'
import { type NavigationItem } from 'src/types/navigation'

export const getMenuItems = (data?: EventItem) => {
	const items: NavigationItem[] = []
	if (data?.event_type_name === 'открытая') {
		items.push({
			title: 'Лонг-лист номинации',
			link: 'participants',
		})
	}
	items.push({
		title: 'Правила отбора',
		link: 'rules',
	})
	items.push({
		title: 'Документы',
		link: 'docs',
	})
	// items.push({
	// 	title: 'Экспертный совет',
	// 	link: 'experts',
	// })
	return items
}
