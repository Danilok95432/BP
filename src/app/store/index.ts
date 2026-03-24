import { configureStore } from '@reduxjs/toolkit'
import { aboutApi } from 'src/features/about/api/about'
import { authApi } from 'src/features/auth/api/auth.api'
import { contentApi } from 'src/features/content/api/content'
import { uploadFilesApi } from 'src/features/files/api/files'
import { homeApi } from 'src/features/home/api/home.api'
import { modalReducer } from 'src/features/modal/store/modal.slice'
import { pagesHeaderApi } from 'src/features/pages-header/api/pages-header.api'
import { NameSpace } from 'src/shared/helpers/consts'
import { breadCrumbsReducer } from 'src/widgets/bread-crumbs/store/bread-crumbs.slice'

export const store = configureStore({
	reducer: {
		[NameSpace.Modal]: modalReducer,
		[NameSpace.BreadCrumbs]: breadCrumbsReducer,
		[homeApi.reducerPath]: homeApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[aboutApi.reducerPath]: aboutApi.reducer,
		[contentApi.reducerPath]: contentApi.reducer,
		[uploadFilesApi.reducerPath]: uploadFilesApi.reducer,
		[pagesHeaderApi.reducerPath]: pagesHeaderApi.reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			homeApi.middleware,
			authApi.middleware,
			aboutApi.middleware,
			contentApi.middleware,
			uploadFilesApi.middleware,
			pagesHeaderApi.middleware,
		),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
