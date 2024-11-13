import React from 'react';

import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonVariant = 'accept' | 'question' | 'menu-item';

interface ButtonProps extends React.ComponentProps<'button'> {
	variant: ButtonVariant;
	children: React.ReactNode;
}

export const Button = ({ variant, className, ref, children, type, ...props }: ButtonProps) => (
	<button ref={ref} type={type} className={clsx(styles['Button'], styles[variant], className)} {...props}>
		{children}
	</button>
);
