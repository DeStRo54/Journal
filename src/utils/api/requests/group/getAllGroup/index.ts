import { api } from '@/utils/api/instance';

type GetAllGroupsConfig = AxiosRequestConfig;

export const getAllGroups = async (requestConfig?: GetAllGroupsConfig) =>
	api.get<AllGroupsResponse>('/group/getAllGroup', requestConfig?.config);
