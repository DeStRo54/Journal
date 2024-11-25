import { api } from '@/utils/api/instance';

export type PatchAdminRefreshAllDataConfig = AxiosRequestConfig;

export const postAdminRefreshAllData = async (requestConfig?: PatchAdminRefreshAllDataConfig) =>
  api.patch<AdminRefreshAllDataResponse>('/admin/refreshAllData', requestConfig?.config);
