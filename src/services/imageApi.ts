// services/imageApi.ts
import { BASE_API_URL } from '@/constants/API';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return {
          url: 'api/upload',
          method: 'POST',
          body: formData
        };
      }
    }),
    removeImage: builder.mutation({
      query: (id: number) => {
        return {
          url: `api/images/${id}`,
          method: 'DELETE'
        };
      }
    }),
    getOriginalImage: builder.query({
      query: (path: string) => {
        return {
          url: `cdn/img/${path}`,
          method: 'GET'
        };
      }
    }),
    getProcessedImage: builder.query({
      query: ({ path, options }: { path: string; options: string }) => {
        return {
          url: `cdn/img/${options}/${path}`,
          method: 'GET'
        };
      }
    })
  })
});
export const {
  useUploadImageMutation,
  useRemoveImageMutation,
  useGetOriginalImageQuery,
  useGetProcessedImageQuery
} = imageApi;
