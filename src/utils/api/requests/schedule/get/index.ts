import { api } from '@/utils/api/instance';

export type GetAllScheduleConfig = AxiosRequestConfig | undefined;

export const getAllSchedule = async (requestConfig: GetAllScheduleConfig) =>
  api.get<AllScheduleResponse>('/schedule/get', requestConfig?.config);
