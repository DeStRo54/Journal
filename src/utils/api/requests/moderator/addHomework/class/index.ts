import { api } from '@/utils/api/instance';

export type PostmModeratorAddHomeworkClassParams = {
  classSemNumber: number;
  subjectId: number;
  homeworkText: string;
  dueDate: Date;
};

export type PostModeratorAddHomeworkClassConfig = AxiosRequestConfig<PostmModeratorAddHomeworkClassParams>;

export const postModeratorAddHomeworkClass = async ({ params, config }: PostModeratorAddHomeworkClassConfig) =>
  api.post<ModeratorAddHomeworkClassResponse>('/moderator/addHomework/class', params, config);
