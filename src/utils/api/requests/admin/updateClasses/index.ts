import { api } from "@/utils/api/instance";


type PatchAdminUpdateClasses = AxiosRequestConfig;

export const patchAdminUpdateClasses = async (requestConfig?: PatchAdminUpdateClasses) =>
	api.patch<AdminUpdateClassesResponse>('/admin/updateClasses', requestConfig?.config);