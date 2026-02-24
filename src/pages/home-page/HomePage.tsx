import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
import { EventsSection } from 'src/shared/sections-new/EventSection/event-section'
import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { PartnersSection } from 'src/shared/sections/PartnersSection/partners-section'
import { MainImgSection } from 'src/shared/sections-new/MainImgSection/mainImgSection'
import { HistorySection } from 'src/shared/sections-new/HistorySection/historySection'
import { InfoMainSection } from 'src/shared/sections-new/InfoSection/info-section'

export const HomePage = () => {
	return (
		<>
			<MainImgSection />
			<NewsSection id={'1'} />
			<HistorySection />
			<EventsSection />
			<InfoMainSection />
			<VideosSection id={'1'} />
			<PartnersSection id={'1'} />
			<FaqSection id={'1'} />
		</>
	)
}
