import { api } from "@/utils/api/instance";


type PatchAdminRefreshAllDataConfig = AxiosRequestConfig;

export const postAdminRefreshAllData = async (requestConfig?: PatchAdminRefreshAllDataConfig) =>
	api.patch<AdminRefreshAllDataResponse>('/admin/refreshAllData', requestConfig?.config);