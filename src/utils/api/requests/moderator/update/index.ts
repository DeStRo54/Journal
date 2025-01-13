import { api } from "@/utils/api/instance";


type patchModeratorHomeworkParams = {
  homeworkID: number,
  homeworkText: string,
}

export type patchModeratorHomeworkConfig = AxiosRequestConfig<patchModeratorHomeworkParams>;

export const patchModeratorHomework = async ({ params, config }: patchModeratorHomeworkConfig) =>
  api.patch<ModeratorUpdateResponse>('/moderator/update', params, config)