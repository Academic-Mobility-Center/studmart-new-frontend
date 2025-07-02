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
	inputClassName?: string;
	clearButtonClass?: string;
	onClear?: () => void;
	showClear?: boolean;
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
	inputClassName,
	clearButtonClass,
	onClear,
	showClear = true,
	...rest
}) => {
	const currentId = id ?? name + 'Id';
	const isShowClear = showClear && !!rest.value && !rest.disabled;

	const handleClear = () => {
		if (onClear) return onClear();
		if (!onChange) return;

		const event = {
			...new Event('input', { bubbles: true }),
			target: {
				name,
				value: '',
			},
		} as unknown as React.ChangeEvent<HTMLInputElement>;

		onChange(event);
	};

	return (
		<div className={clsx(styles['input-text-field'], className)}>
			{label && (
				<label className={styles.label} htmlFor={currentId}>
					{label}
				</label>
			)}

			<div className={styles['input-container']}>
				{rows || isTextArea ? (
					<textarea
						{...rest}
						id={currentId}
						name={name}
						className={clsx(
							styles.input,
							{
								[styles['error']]: !!errorText,
								[styles['text-area-not-resize']]: !textAreaResize,
								[styles['show-clear-input']]: isShowClear,
							},
							inputClassName,
						)}
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
						className={clsx(
							styles.input,
							{ [styles['error']]: !!errorText, [styles['show-clear-input']]: isShowClear },
							inputClassName,
						)}
						placeholder={placeholder}
						onChange={onChange}
					/>
				)}
				{isShowClear && (
					<button
						type="button"
						className={clsx(styles['clear-button'], clearButtonClass)}
						onClick={handleClear}
						aria-label="Очистить поле"
					>
						×
					</button>
				)}
			</div>

			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default memo(InputTextField);
