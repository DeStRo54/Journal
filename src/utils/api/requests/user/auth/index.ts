import { api } from '@/utils/api/instance';

type PostUserAuthParams = {
  email: string;
  password: string;
};

type PostUserAuthConfig = AxiosRequestConfig<PostUserAuthParams>;

export const postUserAuth = async ({ params, config }: PostUserAuthConfig) =>
  api.post<UserAuthResponse>('/user/auth', params, config);
