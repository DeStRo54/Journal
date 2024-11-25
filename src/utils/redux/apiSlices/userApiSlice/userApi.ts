import { postUserAuth, PostUserAuthConfig } from '@/utils/api/requests/user/auth';
import { postUserRegister, PostUserRegisterConfig } from '@/utils/api/requests/user/register';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      queryFn: ({ params, config }: PostUserRegisterConfig) => postUserRegister({ params, config }),
      invalidatesTags: ['User']
    }),
    postAuth: builder.mutation({
      queryFn: ({ params, config }: PostUserAuthConfig) => postUserAuth({ params, config }),
      invalidatesTags: ['User']
    })
  })
});

export const { usePostRegisterMutation, usePostAuthMutation } = userApi;
