import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LogInSchema, LogInSchemaType, RegisterSchema, RegisterSchemaType } from '../schemas';

import { usePostRegisterMutation } from '@/utils/redux/apiSlices/userApiSlice/userApi';
import { useFormik } from 'formik';

export const useAuth = () => {
	const [stage, setStage] = React.useState<'login' | 'register'>('login');
	const navigate = useNavigate();

	const authInitValues = {
		name: '',
		surname: '',
		group_Id: 0,
		email: '',
		password: ''
	};

	const changeStage = () => {
		setStage((prev) => (prev === 'login' ? 'register' : 'login'));
		form.setErrors({});
		form.setTouched({}, false);
	};

	const setSubmit = (values: LogInSchemaType | RegisterSchemaType) => {
		console.log(
			stage === 'login'
				? {
					email: values.email,
					password: values.password
				}
				: values
		);
		navigate('/journal');
	};

	//Пример с MUTATION
	// const [postRegister, { isLoading }] = usePostRegisterMutation();

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

	const form = useFormik<LogInSchemaType | RegisterSchemaType>({
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
		changeStage
	};
};
