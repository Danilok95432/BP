import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/shared/helpers/consts'
import { type LongListResponse, type PagesHeader } from 'src/types/pages-header'

export const pagesHeaderApi = createApi({
	reducerPath: ReducerPath.PagesHeaderApi,
	tagTypes: ['PagesHeader'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getPageHeader: build.query<{ page: PagesHeader }, string>({
			query: (pageType) => ({
				url: `pages/getinfo`,
				params: {
					page_type: pageType,
				},
			}),
		}),
		getLongList: build.query<
			LongListResponse,
			{ id: string; search?: string; searchWorkTitle?: string; workForm?: string }
		>({
			query: ({ id, search, searchWorkTitle, workForm }) => ({
				url: `longlist/getlist`,
				params: {
					id,
					search,
					searchWorkTitle,
					workForm,
				},
			}),
		}),
		getShortList: build.query<
			LongListResponse,
			{ id: string; search?: string; searchWorkTitle?: string; workForm?: string }
		>({
			query: ({ id, search, searchWorkTitle, workForm }) => ({
				url: `shortlist/getlist`,
				params: {
					id,
					search,
					searchWorkTitle,
					workForm,
				},
			}),
		}),
	}),
})

export const { useGetPageHeaderQuery, useGetLongListQuery, useGetShortListQuery } = pagesHeaderApi
