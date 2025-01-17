import { api } from '../../instance';

export type GetSubjectsConfig = AxiosRequestConfig;

export const getSubjects = async (requestConfig?: GetSubjectsConfig) =>
  api.get<GetSubjectsResponse>('/subjects', requestConfig?.config);
