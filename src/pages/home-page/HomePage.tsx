import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
// import { EventsSection } from 'src/shared/sections-new/EventSection/event-section'
import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { PartnersSection } from 'src/shared/sections/PartnersSection/partners-section'
import { MainImgSection } from 'src/shared/sections-new/MainImgSection/mainImgSection'
import { HistorySection } from 'src/shared/sections-new/HistorySection/historySection'
import { InfoMainSection } from 'src/shared/sections-new/InfoSection/info-section'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'

export const HomePage = () => {
	const { data: settingsData } = useGetSettingsSiteQuery(null)
	return (
		<>
			{settingsData?.isShowPromo && <MainImgSection />}
			{settingsData?.isShowNews && <NewsSection id={'1'} />}
			{settingsData?.isShowHistory && <HistorySection />}
			{/* {settingsData?.isShowEvents && <EventsSection />} */}
			{settingsData?.isShowInfo && <InfoMainSection />}
			{settingsData?.isShowVideos && <VideosSection id={'1'} />}
			{settingsData?.isShowPartners && <PartnersSection id={'1'} />}
			{settingsData?.isShowFaq && <FaqSection id={'1'} />}
		</>
	)
}
