import { FC, InputHTMLAttributes, TextareaHTMLAttributes, memo } from 'react';

import clsx from 'clsx';

import styles from '../Input.module.css';

export interface IInputTextFieldProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
		'onChange'
	> {
	name: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	label?: string;
	errorText?: string;
	isTextArea?: boolean;
	textAreaResize?: boolean;
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
	textAreaResize = true,
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
			{rows || isTextArea ? (
				<textarea
					{...rest}
					id={currentId}
					name={name}
					className={clsx(styles.input, {
						[styles['error']]: !!errorText,
						[styles['text-area-not-resize']]: !textAreaResize,
					})}
					rows={rows ?? 3}
					placeholder={placeholder}
					onChange={onChange}
				/>
			) : (
				<input
					{...rest}
					id={currentId}
					name={name}
					type={type}
					className={clsx(styles.input, { [styles['error']]: !!errorText })}
					placeholder={placeholder}
					onChange={onChange}
				/>
			)}
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default memo(InputTextField);
