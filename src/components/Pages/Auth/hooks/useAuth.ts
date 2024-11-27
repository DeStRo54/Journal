import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogInSchema, RegisterSchema, RegisterSchemaType } from '../schemas';

import { usePostRegisterMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useFormik } from 'formik';
import { useGetAllGroupsQuery } from '@/utils/redux/apiSlices/groupApiSlice/groupApi';

export const useAuth = () => {
	const [stage, setStage] = React.useState<'login' | 'register'>('login');
	const navigate = useNavigate();

	// const getAllGroups = useGetAllGroupsQuery({ config: {} }, {
	// 	selectFromResult: (data) => {
	// 		return data;
	// 	},
	// });

	// const getAllGroupsResponse = getAllGroups?.data;
	// console.log(getAllGroupsResponse);

	const getAllGroupsResponse = [
		{
			group_id: 1,
			name: 'БСБО-01-23',
			course: 2
		},
		{
			group_id: 2,
			name: 'БСБО-02-23',
			course: 2
		},
		{
			group_id: 3,
			name: 'БСБО-03-23',
			course: 2
		},
		{
			group_id: 4,
			name: 'БСБО-04-23',
			course: 2
		},
		{
			group_id: 5,
			name: 'БСБО-05-23',
			course: 2
		},
		{
			group_id: 6,
			name: 'БСБО-06-23',
			course: 2
		},
		{
			group_id: 7,
			name: 'БСБО-07-23',
			course: 2
		}
	];

	const groupsList = getAllGroupsResponse.reduce((acc: Record<string, number>, group) => {
		acc[group.name] = group.group_id;
		return acc;
	}, {});

	console.log(groupsList);

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

	const [postRegister, { isLoading, isError, isSuccess }] = usePostRegisterMutation();

	const setSubmit = async (values: RegisterSchemaType) => {
		// console.log(
		// 	stage === 'login'
		// 		? {
		// 			email: values.email,
		// 			password: values.password
		// 		}
		// 		: values
		// );

		if (stage !== 'login') {
			const postRegisterResponse = await postRegister({
				params: {
					name: values.name,
					surname: values.surname,
					email: values.email,
					password: values.password,
					groupId: groupsList[values.groupName],
				},
				config: {}
			});

			if (!postRegisterResponse.error) {
				navigate('/journal');
			} else {
				console.log(postRegisterResponse.error);
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
		state: {
			isLoading,
			isError,
			isSuccess
		}
	};
};
