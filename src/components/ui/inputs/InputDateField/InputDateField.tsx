import { FC, InputHTMLAttributes, memo } from 'react';

import clsx from 'clsx';

import styles from '../Input.module.css';

export interface IInputDateFieldProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	errorText?: string;
	name: string;
	value?: Date | string | null;
}

const InputDateField: FC<IInputDateFieldProps> = ({
	id,
	label,
	errorText,
	className,
	onChange,
	name,
	value,
	...rest
}) => {
	const currentId = id ?? `${name}Id`;
	const normalizedValue =
		value instanceof Date && !isNaN(value.getTime())
			? value.toISOString().split('T')[0]
			: typeof value === 'string'
				? value
				: '';
	const date = new Date();
	const year = date.getFullYear();
	const maxYear = year - 18;
	const minYear = year - 60;
	return (
		<div className={clsx(styles['input-text-field'], className)}>
			{label && (
				<label htmlFor={currentId} className={styles.label}>
					{label}
				</label>
			)}
			<input
				{...rest}
				value={normalizedValue}
				id={currentId}
				name={name}
				type="date"
				min={`${minYear}-01-01`}
				max={`${maxYear}-12-31`}
				className={styles.input}
				onChange={onChange}
			/>
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default memo(InputDateField);
