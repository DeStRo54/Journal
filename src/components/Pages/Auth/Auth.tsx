import React from 'react';

import styles from './Auth.module.css';
import { useAuth } from './hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typhography } from '@/components/ui/Typhography';
import { CurrentGroup } from '@/utils/api/requests/group/getAll/response';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export const Auth = () => {
  const { form, stage, groups, func, state } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const acceptButtonText = stage === 'login' ? 'Войти' : 'Зарегистрироваться';
  const stageButtonText = stage === 'login' ? ' Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти';

  type groupType = CurrentGroup;

  const chooseGroup = (currentGroup: groupType) => {
    form.setFieldValue('groupName', currentGroup.name);
    setIsOpen(false);
  };

  const getGroups = () => {
    setIsOpen((prev) => !prev);
  };

  const hideGroups = () => {
    setIsOpen(false);
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
                autoComplete="name"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.name}
                {...(form.touched.name && {
                  error: form.errors.name
                })}
              />
              <Input
                name="surname"
                label="Фамилия"
                type="text"
                variant="primary"
                autoComplete="family-name"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.surname}
                {...(form.touched.surname && {
                  error: form.errors.surname
                })}
              />
              <div onBlur={hideGroups}>
                <p className={styles.label}>{'Группа'}</p>
                <Input
                  name="group_Id"
                  label="Группа"
                  type="text"
                  variant="primary"
                  custom={true}
                  autoComplete="off"
                  className={clsx(styles['group-input'], isOpen && styles['active'])}
                  readOnly={true}
                  onClick={getGroups}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  value={form.values.groupName}
                  {...(form.touched.groupName && {
                    error: form.errors.groupName
                  })}
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: 'easeInOut' }}
                      className={styles['group-list']}
                    >
                      {groups?.map((group) => (
                        <div className={styles['group-name']} key={group.group_id} onClick={() => chooseGroup(group)}>
                          {group.name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
          <Input
            name="email"
            label="Почта"
            type="text"
            variant="primary"
            autoComplete="email"
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
            autoComplete="current-password"
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
