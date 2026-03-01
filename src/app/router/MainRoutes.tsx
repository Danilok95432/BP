import { Route, Routes } from 'react-router-dom'
import { AboutLayout } from 'src/pages/about-page/about-layout'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ContentPageLayout } from 'src/pages/content-page/content-page-layout'
import { NewsDetailsNew } from 'src/pages/content-page/news-details/news-details'
import { VideoDetails } from 'src/pages/content-page/video-details/video-details'
import { EventsPage } from 'src/pages/events-page/events-page'
import { HomePage } from 'src/pages/home-page/HomePage'
import { OrgPage } from 'src/pages/org-page/org-page'
import { PartnersPage } from 'src/pages/partners-page/partners-page'
import { AppRoute } from './consts'
import { AboutHistory } from 'src/pages/about-page/layout/history/history'
import { AboutLaureats } from 'src/pages/about-page/layout/laureats/laureats-list/laureats'
import { AboutDocs } from 'src/pages/about-page/layout/docs/docs'
import { LaureatDetails } from 'src/pages/about-page/layout/laureats/laureat/laureat'
import { AboutLaureatsLayout } from 'src/pages/about-page/layout/laureats/laureats-layout'
import { AwardsLayout } from 'src/pages/awards-page/awards-layout'
import { AwardLayout } from 'src/pages/awards-page/components/award-details/award-layout'
import { AwardInfo } from 'src/pages/awards-page/components/award-details/layout/award-info/award-info'
import { AwardRules } from 'src/pages/awards-page/components/award-details/layout/award-rules/award-rules'
import { AwardParticipants } from 'src/pages/awards-page/components/award-details/layout/award-participants/award-participants'
import { AwardExperts } from 'src/pages/awards-page/components/award-details/layout/award-experts/award-experts'
import { AwardDocs } from 'src/pages/awards-page/components/award-details/layout/award-docs/award-docs'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path='/' element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path={'/org'} element={<OrgPage />} />
				<Route path={'/content'} element={<ContentPageLayout />} />
				<Route path={'/content/news/:id'} element={<NewsDetailsNew />} />
				<Route path={'/content/videos/:id'} element={<VideoDetails />} />
				<Route path={'/partners-list'} element={<PartnersPage />} />
				<Route path={'/events-list'} element={<EventsPage />} />
				<Route path={AppRoute.About} element={<AboutLayout />}>
					<Route index element={<AboutHistory />} />
					<Route path={AppRoute.AboutLaureats} element={<AboutLaureatsLayout />}>
						<Route index element={<AboutLaureats />} />
						<Route path=':id' element={<LaureatDetails />} />
					</Route>
					<Route path={AppRoute.AboutDocs} element={<AboutDocs />} />
				</Route>
				<Route path={AppRoute.Awards} element={<AwardsLayout />}>
					<Route path=':id' element={<AwardLayout />}>
						<Route index element={<AwardInfo />} />
						<Route path={`participants`} element={<AwardParticipants />} />
						<Route path={`rules`} element={<AwardRules />} />
						<Route path={`docs`} element={<AwardDocs />} />
						<Route path={`experts`} element={<AwardExperts />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}
