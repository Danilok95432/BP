import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { type FieldValues } from 'react-hook-form'
import { MAIN_PROD_URL, ReducerPath } from 'src/shared/helpers/consts'
import {
	type FileNewIdResponse,
	type FileInfoResponse,
	type FileUploadRespone,
} from 'src/types/files'

export const uploadFilesApi = createApi({
	reducerPath: ReducerPath.UploadFiles,
	tagTypes: ['FileUpload', 'FileDelete', 'FileInfo', 'CommunityAbout'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getUploadedFile: build.query<FileInfoResponse, string>({
			query: (id) => ({
				url: `files/getinfo`,
				params: {
					id,
				},
			}),
			providesTags: ['FileUpload', 'FileInfo'],
		}),
		saveUploadedFileInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `files/saveinfo`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['FileInfo', 'FileUpload'],
		}),
		getNewIdFile: build.query<FileNewIdResponse, { filetype?: string; idItem?: string }>({
			query: ({ filetype = '', idItem = '' }) => ({
				url: `files/getnew`,
				params: {
					filetype,
					id_item: idItem,
				},
			}),
			providesTags: ['FileInfo', 'FileUpload'],
		}),
		uploadFiles: build.mutation<FileUploadRespone, FieldValues>({
			query: (formData) => ({
				url: `files/upload`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['FileUpload'],
		}),
		deleteFileById: build.mutation<null, string>({
			query: (fileId) => ({
				url: `files/delete`,
				method: 'DELETE',
				body: { id: fileId },
			}),
			invalidatesTags: ['FileDelete'],
		}),
	}),
})

export const {
	useUploadFilesMutation,
	useDeleteFileByIdMutation,
	useGetUploadedFileQuery,
	useSaveUploadedFileInfoMutation,
	useGetNewIdFileQuery,
} = uploadFilesApi
