import { getAllSchedule, GetAllScheduleConfig } from '@/utils/api/requests/schedule/get';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GetAllSchedule'],
  endpoints: (builder) => ({
    getAllSchedule: builder.query<AllScheduleResponse, GetAllScheduleConfig>({
      queryFn: (requestConfig?: GetAllScheduleConfig) => getAllSchedule(requestConfig),
      providesTags: ['GetAllSchedule']
    })
  })
});

export const { useGetAllScheduleQuery } = scheduleApi;
