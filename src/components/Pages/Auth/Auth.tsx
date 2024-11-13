import styles from './Auth.module.css';
import { useAuth } from './hooks/useAuth';
import { RegisterSchemaType } from './schemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FormikTouched } from 'formik';

export const Auth = () => {
  const { form, stage, changeStage } = useAuth();

  const acceptButtonText = stage === 'login' ? 'Войти' : 'Зарегистрироваться';
  const stageButtonText = stage === 'login' ? ' Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти';

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

        <Button type="submit" variant="accept" children={acceptButtonText} />
        <Button type="reset" variant="question" onClick={changeStage} children={stageButtonText} />
      </form>
    </div>
  );
};
