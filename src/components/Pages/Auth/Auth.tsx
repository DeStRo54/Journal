import { useState } from 'react';

import styles from './Auth.module.css';
import { useAuth } from './hooks/useAuth';
import { RegisterSchemaType } from './schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CurrentGroup } from '@/utils/api/requests/group/getAll/response';
import { FormikTouched } from 'formik';
import { Typhography } from '@/components/ui/Typhography';

export const Auth = () => {
  const { form, stage, groups, func, state } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const acceptButtonText = stage === 'login' ? 'Войти' : 'Зарегистрироваться';
  const stageButtonText = stage === 'login' ? ' Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти';

  type groupType = CurrentGroup;

  const showGroups = (currentGroup: groupType) => {
    setIsOpen(false);
    form.setFieldValue('groupName', currentGroup.name);
  };

  const hideGroups = () => {
    setIsOpen((prev) => !prev);
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
                variant="primary"
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
                variant="primary"
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
                  variant="primary"
                  readOnly={true}
                  onClick={hideGroups}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={(form.values as RegisterSchemaType).groupName}
                  {...((form.touched as FormikTouched<RegisterSchemaType>).groupName && {
                    error: (form.errors as RegisterSchemaType).groupName
                  })}
                />
                {isOpen && (
                  <div className={styles['group-list']}>
                    {groups?.map((group) => (
                      <div className={styles['group-name']} key={group.group_id} onClick={() => showGroups(group)}>
                        {group.name}
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
            variant="primary"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.email}
            {...(form.touched.email && { error: form.errors.email })}
          />
          <Input
            name="password"
            label="Пароль"
            type="password"
            variant="primary"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.password}
            {...(form.touched.password && { error: form.errors.password })}
          />
        </div>

        <Button
          type="submit"
          variant="accept"
          disabled={state.isLoading}
          children={state.isLoading ? 'Отправка...' : acceptButtonText}
        />
        {state.isError && <Typhography tag="h1" variant="secondary" children={'Ошибка, повторите попытку позже!'} />}

        <Button type="reset" variant="question" onClick={func.changeStage} children={stageButtonText} />
      </form>
    </div>
  );
};
