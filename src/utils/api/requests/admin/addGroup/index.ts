import { api } from '@/utils/api/instance';

type PostAdminAddGroupParams = {
	name: string;
	course: number;
	icalLink: string;
};

type PostAdminAddGroupConfig = AxiosRequestConfig<PostAdminAddGroupParams>;

export const postAdminAddGroup = async ({ params, config }: PostAdminAddGroupConfig) =>
	api.post<AdminAddGroupResponse>('/admin/addGroup', params, config);
