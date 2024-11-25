import { getAllGroups, GetAllGroupsConfig } from '../../requests/group/getAllGroup';

import { useQuery } from '@tanstack/react-query';

export const useGetAllGroups = (axiosConfig?: GetAllGroupsConfig) =>
  useQuery({
    queryKey: ['getAllGroups'],
    queryFn: () => getAllGroups(axiosConfig)
  });
