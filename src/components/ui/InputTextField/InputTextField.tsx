import { FC, InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './InputTextField.module.css';

export interface IInputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorText?: string;
	name: string;
}

const InputTextField: FC<IInputTextFieldProps> = ({
	id,
	label,
	errorText,
	className,
	onChange,
	name,
	placeholder,
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
			<input
				{...rest}
				id={currentId}
				name={name}
				className={styles.input}
				type="text"
				placeholder={placeholder}
				onChange={onChange}
			/>
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default InputTextField;
