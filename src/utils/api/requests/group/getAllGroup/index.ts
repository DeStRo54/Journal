import { AllGroupsResponse } from './response';
import { api } from '@/utils/api/instance';

export type GetAllGroupsConfig = AxiosRequestConfig;

export const getAllGroups = async (requestConfig?: GetAllGroupsConfig) =>
  api.get<AllGroupsResponse>('/group/getAllGroup', requestConfig?.config);
