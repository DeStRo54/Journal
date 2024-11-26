import React from 'react';

import styles from './Input.module.css';
import clsx from 'clsx';

type InputVarinat = 'primary' | 'secondary';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  name: string;
  error?: string;
  variant?: InputVarinat;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, name, label, className, error, type, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={label[0].toLowerCase() + label.slice(1)}
          className={clsx(styles[variant ?? ''], styles.input, className)}
          {...props}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);
