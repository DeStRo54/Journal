import { postUserAuth, PostUserAuthConfig } from '../../requests/user/auth';

import { useMutation } from '@tanstack/react-query';

export const usePostAuthMutation = () =>
  useMutation({
    mutationKey: ['postAuth'],
    mutationFn: ({ params, config }: PostUserAuthConfig) => postUserAuth({ params, config })
  });
