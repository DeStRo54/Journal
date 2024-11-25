import { postUserRegister, PostUserRegisterConfig } from '../../requests/user/register';

import { useMutation } from '@tanstack/react-query';

export const usePostRegisterMutation = () =>
  useMutation({
    mutationKey: ['postRegister'],
    mutationFn: ({ params, config }: PostUserRegisterConfig) => postUserRegister({ params, config })
  });
