import { api } from '@/utils/api/instance';

export type PostmModeratorAddHomeworkDateParams = {
  subjectId: number;
  homeworkText: string;
  dueDate: Date;
};

export type PostModeratorAddHomeworkDateConfig = AxiosRequestConfig<PostmModeratorAddHomeworkDateParams>;

export const postModeratorAddHomeworkDate = async ({ params, config }: PostModeratorAddHomeworkDateConfig) =>
  api.post<ModeratorAddHomeworkDateResponse>('/moderator/addHomework/date', params, config);
