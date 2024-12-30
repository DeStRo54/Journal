import { postUserAuth, PostUserAuthConfig } from '@/utils/api/requests/user/auth';
import { GetUserConfig, getUserData } from '@/utils/api/requests/user/get';
import { UserResponse } from '@/utils/api/requests/user/get/response';
import { postUserRegister, PostUserRegisterConfig } from '@/utils/api/requests/user/register';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostUserRegister', 'PostUserAuth', 'GetUserConfig'],
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      queryFn: ({ params, config }: PostUserRegisterConfig) => postUserRegister({ params, config }),
      invalidatesTags: ['PostUserRegister']
    }),
    postAuth: builder.mutation({
      queryFn: ({ params, config }: PostUserAuthConfig) => postUserAuth({ params, config }),
      invalidatesTags: ['PostUserAuth']
    }),
    getUser: builder.query<UserResponse, GetUserConfig>({
      queryFn: (requestConfig: GetUserConfig) => getUserData(requestConfig),
      providesTags: ['GetUserConfig']
    })
  })
});

export const { usePostRegisterMutation, usePostAuthMutation, useGetUserQuery } = userApi;
