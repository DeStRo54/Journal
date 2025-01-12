import {
  postModeratorAddHomeworkClass,
  PostModeratorAddHomeworkClassConfig
} from '@/utils/api/requests/moderator/addHomework/class';
import {
  postModeratorAddHomeworkDate,
  PostModeratorAddHomeworkDateConfig
} from '@/utils/api/requests/moderator/addHomework/date';
import { deleteModeratorHomework, deleteModeratorHomeworkConfig } from '@/utils/api/requests/moderator/delete';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moderatorApi = createApi({
  reducerPath: 'moderatorApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostModeratorAddHomeworkClass', 'PostModeratorAddHomeworkDate', 'deleteModeratorHomework'],
  endpoints: (builder) => ({
    postModeratorAddHomeworkClass: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkClassConfig) =>
        postModeratorAddHomeworkClass({ params, config }),
      invalidatesTags: ['PostModeratorAddHomeworkClass']
    }),
    postModeratorAddHomeworkDate: builder.mutation({
      queryFn: ({ params, config }: PostModeratorAddHomeworkDateConfig) =>
        postModeratorAddHomeworkDate({ params, config }),
      invalidatesTags: ['PostModeratorAddHomeworkDate']
    }),
    deleteModeratorHomework: builder.mutation({
      queryFn: ({ params, config }: deleteModeratorHomeworkConfig) => deleteModeratorHomework({ params, config }),
      invalidatesTags: ['deleteModeratorHomework']
    })
  })
});

export const {
  usePostModeratorAddHomeworkClassMutation,
  usePostModeratorAddHomeworkDateMutation,
  useDeleteModeratorHomeworkMutation
} = moderatorApi;
