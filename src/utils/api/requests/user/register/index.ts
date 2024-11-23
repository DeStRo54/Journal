import { api } from '@/utils/api/instance';

type PostUserRegisterParams = {
  name: string;
  surname: string;
  email: string;
  password: string;
  groupId: number;
};

type PostUserRegisterConfig = AxiosRequestConfig<PostUserRegisterParams>;

export const postUserRegister = async ({ params, config }: PostUserRegisterConfig) =>
  api.post<UserRegisterResponse>('/user/register', params, config);
