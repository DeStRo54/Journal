import { useState } from 'react';

import styles from './Auth.module.css';
import { useAuth } from './hooks/useAuth';
import { RegisterSchemaType } from './schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CurrentGroup } from '@/utils/api/requests/group/getAllGroup/response';
import { useGetAllGroupsQuery } from '@/utils/redux/apiSlices/groupApiSlice/groupApi';
import { FormikTouched } from 'formik';

export const Auth = () => {
	const { form, stage, func, state } = useAuth();

	const acceptButtonText = stage === 'login' ? 'Войти' : 'Зарегистрироваться';
	const stageButtonText = stage === 'login' ? ' Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти';

	// Пример с QUERY
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

	type groupType = CurrentGroup;

	// const groupsList = [...getAllGroupsResponse.map((group: groupType) => group.name)];

	const [isOpen, setIsOpen] = useState(false);

	// Состояние для хранения текущего выбранного значения
	// Варианты ответа

	const handleOptionClick = (option: groupType) => {
		setIsOpen(false); // Закрываем выпадающий список
		func.setCurrId(option.group_id);
		form.setFieldValue('group_Id', option.name);
	};

	const handleInputClick = () => {
		setIsOpen((prev) => !prev); // Переключаем состояние видимости
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Здесь будет какой-то заголовок и логотип</h1>

			<form onSubmit={form.handleSubmit} className={styles.form}>
				<div>
					{stage === 'register' && (
						<>
							<Input
								name="name"
								label="Имя"
								type="text"
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={(form.values as RegisterSchemaType).name}
								{...((form.touched as FormikTouched<RegisterSchemaType>).name && {
									error: (form.errors as RegisterSchemaType).name
								})}
							/>
							<Input
								name="surname"
								label="Фамилия"
								type="text"
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={(form.values as RegisterSchemaType).surname}
								{...((form.touched as FormikTouched<RegisterSchemaType>).surname && {
									error: (form.errors as RegisterSchemaType).surname
								})}
							/>
							<div style={{ position: 'relative' }}>
								<Input
									name="group_Id"
									label="Группа"
									type="text"
									readOnly={true}
									onClick={handleInputClick}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={(form.values as RegisterSchemaType).group_Id}
									{...((form.touched as FormikTouched<RegisterSchemaType>).group_Id && {
										error: (form.errors as RegisterSchemaType).group_Id
									})}
								/>
								{isOpen && (
									<div className={styles['group-list']}>
										{getAllGroupsResponse.map((option, index) => (
											<div className={styles['group-name']}
												key={index}
												onClick={() => handleOptionClick(option)}
											>
												{option.name}
											</div>
										))}
									</div>
								)}
							</div>
						</>
					)}
					<Input
						name="email"
						label="Почта"
						type="text"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.email}
						{...(form.touched.email && { error: form.errors.email })}
					/>
					<Input
						name="password"
						label="Пароль"
						type="password"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.password}
						{...(form.touched.password && { error: form.errors.password })}
					/>
				</div>

				<Button type="submit" variant="accept" disabled={state.isLoading} children={state.isLoading ? 'Отправка...' : acceptButtonText} />
				<Button type="reset" variant="question" onClick={func.changeStage} children={stageButtonText} />
			</form>
		</div>
	);
};
