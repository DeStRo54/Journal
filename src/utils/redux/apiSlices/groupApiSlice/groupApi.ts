import { getAllGroups, GetAllGroupsConfig } from '@/utils/api/requests/group/getAllGroup';
import { CurrentGroup } from '@/utils/api/requests/group/getAllGroup/response';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Group'],
  endpoints: (builder) => ({
    getAllGroups: builder.query<CurrentGroup[], GetAllGroupsConfig>({
      queryFn: (requestConfig?: GetAllGroupsConfig) => getAllGroups(requestConfig),
      providesTags: ['Group']
    })
  })
});

export const { useGetAllGroupsQuery } = groupApi;
