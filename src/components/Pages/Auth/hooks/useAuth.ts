import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogInSchema, RegisterSchema, RegisterSchemaType } from '../schemas';

import { usePostRegisterMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useFormik } from 'formik';

export const useAuth = () => {
	const [stage, setStage] = React.useState<'login' | 'register'>('login');
	const [currId, setCurrId] = React.useState<number>(0);
	const navigate = useNavigate();

	const authInitValues = {
		name: '',
		surname: '',
		group_Id: '',
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
					groupId: currId //Першинша момент
				},
				config: {}
			});

			if (!postRegisterResponse.error) {
				navigate('/journal');
			}
			else {
				console.log(postRegisterResponse.error);
			}
		}
	};

	//Пример с MUTATION
	// const firstTest = async () => {
	// 	await postRegister({
	// 		params: {
	// 			name: 'Test',
	// 			surname: 'Test',
	// 			email: 'test@mail.ri',
	// 			password: '1233413',
	// 			groupId: 0
	// 		}, config: {}
	// 	});
	// }

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
		func: { changeStage, setCurrId },
		state: {
			isLoading,
			isError,
			isSuccess
		}
	};
};
