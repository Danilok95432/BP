import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/shared/helpers/consts'
import { type AboutGeneralPage } from 'src/types/about'
import { type LaureatItemResponse, type LaureatsResponse } from 'src/types/laureats'

export const aboutApi = createApi({
	reducerPath: ReducerPath.About,
	tagTypes: ['About'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getAboutGeneral: build.query<AboutGeneralPage, null>({
			query: () => ({
				url: `about/general`,
			}),
		}),
		getAllLaureats: build.query<LaureatsResponse, null>({
			query: () => ({
				url: `vids`,
			}),
		}),
		getLaureatInfoById: build.query<LaureatItemResponse, string>({
			query: (id) => ({
				url: `vids/${id}`,
				params: {
					id,
				},
			}),
		}),
	}),
})

export const { useGetAboutGeneralQuery, useGetAllLaureatsQuery, useGetLaureatInfoByIdQuery } =
	aboutApi
