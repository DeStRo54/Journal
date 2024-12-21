import {
  postModeratorAddHomeworkClass,
  PostModeratorAddHomeworkClassConfig
} from '@/utils/api/requests/moderator/addHomework/class';
import {
  postModeratorAddHomeworkDate,
  PostModeratorAddHomeworkDateConfig
} from '@/utils/api/requests/moderator/addHomework/date';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moderatorApi = createApi({
  reducerPath: 'moderatorApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostModeratorAddHomeworkClass', 'PostModeratorAddHomeworkDate'],
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
    })
  })
});

export const { usePostModeratorAddHomeworkClassMutation, usePostModeratorAddHomeworkDateMutation } = moderatorApi;
