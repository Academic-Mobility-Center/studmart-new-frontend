import { FC, InputHTMLAttributes, TextareaHTMLAttributes, memo } from 'react';

import clsx from 'clsx';

import styles from '../Input.module.css';

export interface IInputTextFieldProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
		'onChange'
	> {
	onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	label?: string;
	errorText?: string;
	name: string;
	isTextArea?: boolean;
}

const InputTextField: FC<IInputTextFieldProps> = ({
	id,
	label,
	errorText,
	className,
	onChange,
	name,
	placeholder,
	rows,
	isTextArea = false,
	type = 'text',
	...rest
}) => {
	const currentId = id ?? name + 'Id';

	return (
		<div className={clsx(styles['input-text-field'], className)}>
			{label && (
				<label className={styles.label} htmlFor={currentId}>
					{label}
				</label>
			)}
			{(rows || isTextArea) && (
				<textarea
					{...rest}
					id={currentId}
					name={name}
					className={styles.input}
					rows={rows ?? 3}
					placeholder={placeholder}
					onChange={onChange}
				/>
			)}
			<input
				{...rest}
				id={currentId}
				name={name}
				type={type}
				className={styles.input}
				placeholder={placeholder}
				onChange={onChange}
			/>
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default memo(InputTextField);
