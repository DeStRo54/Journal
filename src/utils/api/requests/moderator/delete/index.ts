import { api } from '@/utils/api/instance';

type deleteModeratorHomeworkParams = { homeworkID: number };

export type deleteModeratorHomeworkConfig = AxiosRequestConfig<deleteModeratorHomeworkParams>;

export const deleteModeratorHomework = async ({ params, config }: deleteModeratorHomeworkConfig) =>
  api.delete<ModeratorDeleteResponse>(`/moderator/delete/${params.homeworkID}`, config);
