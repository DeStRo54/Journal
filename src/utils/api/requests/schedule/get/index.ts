import { api } from '@/utils/api/instance';

type GetAllScheduleParams = {
  from_time: string;
  days_count: number;
}

export type GetAllScheduleConfig = AxiosRequestConfig<GetAllScheduleParams>;

export const getAllSchedule = async (requestConfig: GetAllScheduleConfig) =>
  api.get<AllScheduleResponse>('/schedule/get', requestConfig?.config);
