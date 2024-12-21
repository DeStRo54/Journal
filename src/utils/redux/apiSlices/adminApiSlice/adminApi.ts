import { postAdminAddGroup, PostAdminAddGroupConfig } from "@/utils/api/requests/admin/addGroup";
import { PatchAdminRefreshAllDataConfig, patchAdminRefreshAllData } from "@/utils/api/requests/admin/refreshAllData";
import { patchAdminUpdateClasses, PatchAdminUpdateClasses } from "@/utils/api/requests/admin/updateClasses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['PostAdminAddGroup', 'PatchAdminRefreshAllData', 'PatchAdminUpdateClasses'],
  endpoints: (builder) => ({
    postAdminAddGroup: builder.mutation({
      queryFn: ({ params, config }: PostAdminAddGroupConfig) => postAdminAddGroup({ params, config }),
      invalidatesTags: ['PostAdminAddGroup']
    }),
    patchAdminRefreshAllData: builder.mutation<AdminRefreshAllDataResponse, PatchAdminRefreshAllDataConfig>({
      queryFn: (requestConfig?: PatchAdminRefreshAllDataConfig) => patchAdminRefreshAllData(requestConfig),
      invalidatesTags: ['PatchAdminRefreshAllData']
    }),
    patchAdminUpdateClasses: builder.mutation<AdminUpdateClassesResponse, PatchAdminUpdateClasses>({
      queryFn: (requestConfig?: PatchAdminUpdateClasses) => patchAdminUpdateClasses(requestConfig),
      invalidatesTags: ['PatchAdminUpdateClasses']
    }),
  }),
});

export const { usePostAdminAddGroupMutation, usePatchAdminRefreshAllDataMutation, usePatchAdminUpdateClassesMutation } = adminApi;