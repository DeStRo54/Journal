import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogInSchema, RegisterSchema, RegisterSchemaType } from '../schemas';

import { useGetAllGroupsQuery } from '@/utils/redux/apiSlices/groupApiSlice/groupApi';
import { usePostAuthMutation, usePostRegisterMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useFormik } from 'formik';

export const useAuth = () => {
  const [stage, setStage] = React.useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const getAllGroups = useGetAllGroupsQuery(
    { config: {} },
    {
      selectFromResult: (data) => {
        return data;
      }
    }
  );

  const getAllGroupsResponse = getAllGroups?.data;
  // console.log(getAllGroupsResponse);

  // const getAllGroupsResponse = [
  // 	{
  // 		group_id: 1,
  // 		name: 'БСБО-01-23',
  // 		course: 2
  // 	},
  // 	{
  // 		group_id: 2,
  // 		name: 'БСБО-02-23',
  // 		course: 2
  // 	},
  // 	{
  // 		group_id: 3,
  // 		name: 'БСБО-03-23',
  // 		course: 2
  // 	},
  // 	{
  // 		group_id: 4,
  // 		name: 'БСБО-04-23',
  // 		course: 2
  // 	},
  // 	{
  // 		group_id: 5,
  // 		name: 'БСБО-05-23',
  // 		course: 2
  // 	},
  // 	{
  // 		group_id: 6,
  // 		name: 'БСБО-06-23',
  // 		course: 2
  // 	},
  // 	{
  // 		group_id: 7,
  // 		name: 'БСБО-07-23',
  // 		course: 2
  // 	}
  // ];

  const groupsList = getAllGroupsResponse?.reduce((acc: Record<string, number>, group) => {
    acc[group.name] = group.group_id;
    return acc;
  }, {});

  const authInitValues = {
    name: '',
    surname: '',
    groupName: '',
    email: '',
    password: ''
  };

  const changeStage = () => {
    setStage((prev) => (prev === 'login' ? 'register' : 'login'));
    form.setErrors({});
    form.setTouched({}, false);
  };

  const [postRegister, { isLoading: isRegisterLoading, isError: isRegisterError, isSuccess: isRegisterSuccess }] =
    usePostRegisterMutation();
  const [postAuth, { isLoading: isAuthLoading, isError: isAuthError, isSuccess: isAuthSuccess }] =
    usePostAuthMutation();

  const currentState =
    stage === 'register'
      ? {
          isLoading: isRegisterLoading,
          isError: isRegisterError,
          isSuccess: isRegisterSuccess
        }
      : {
          isLoading: isAuthLoading,
          isError: isAuthError,
          isSuccess: isAuthSuccess
        };

  const setSubmit = async (values: RegisterSchemaType) => {
    if (stage !== 'login') {
      const postRegisterResponse = await postRegister({
        params: {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
          groupId: groupsList?.[values.groupName] as number
        },
        config: {}
      });

      if (!postRegisterResponse.error) {
        setStage('login');
      } else {
        console.log(postRegisterResponse.error);
      }
    } else {
      const postAuthResponse = await postAuth({
        params: {
          email: values.email,
          password: values.password
        },
        config: {}
      });
      if (!postAuthResponse.error) {
        navigate('/journal');
      } else {
        console.log(postAuthResponse.error);
      }
    }
  };

  const form = useFormik<RegisterSchemaType>({
    initialValues: authInitValues,
    validationSchema: stage === 'login' ? LogInSchema : RegisterSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      setSubmit(values);
    }
  });

  return {
    form,
    stage,
    groups: getAllGroupsResponse,
    func: { changeStage },
    state: currentState
  };
};
