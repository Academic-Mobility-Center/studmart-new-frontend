'use client';

import { FC, useState } from 'react';

import clsx from 'clsx';
import NextImage from 'next/image';

import styles from '../Input.module.css';
import { IInputTextFieldProps } from '../InputTextField/InputTextField';

interface IInputPasswordFieldProps
	extends Omit<IInputTextFieldProps, 'name' | 'rows' | 'isTextArea'> {
	name?: string;
}
const InputPasswordField: FC<IInputPasswordFieldProps> = ({
	placeholder = '********',
	label = 'Пароль',
	name = 'password',
	className,
	id,
	onChange,
	type,
	errorText,
	...rest
}) => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const currentId = id ?? name + 'Id';
	return (
		<div className={clsx(styles['input-text-field'], className)}>
			{label && (
				<label className={styles.label} htmlFor={currentId}>
					{label}
				</label>
			)}
			<div className={styles['input-container']}>
				<input
					{...rest}
					id={currentId}
					name={name}
					type={isShowPassword ? (type ?? 'text') : 'password'}
					className={clsx(styles.input, styles['input-password'])}
					placeholder={placeholder}
					onChange={onChange}
				></input>
				{!rest.disabled && (
					<button
						type="button"
						aria-label="Показать пароль"
						className={styles.button}
						onClick={() => setIsShowPassword(!isShowPassword)}
					>
						<NextImage
							src={isShowPassword ? '/icons/auth/closed-eye.svg' : '/icons/auth/open-eye.svg'}
							alt="Toggle Password Visibility"
							width={24}
							height={24}
						/>
					</button>
				)}
			</div>
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default InputPasswordField;
