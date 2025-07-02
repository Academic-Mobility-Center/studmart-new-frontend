import { FC, InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import defaultInputStyles from '../Input.module.css';
import styles from './InputCheckbox.module.css';

export interface IInputCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string;
	errorText?: string;
}

const InputCheckbox: FC<IInputCheckboxProps> = ({
	label,
	className,
	id,
	name,
	checked,
	onChange,
	children,
	errorText,
	...props
}) => {
	const currentId = id ?? name + 'Id';
	return (
		<div className={defaultInputStyles['input-text-field']}>
			<div className={clsx(styles['input-checkbox'], className)}>
				<input
					{...props}
					id={currentId}
					type="checkbox"
					name={name}
					checked={checked}
					onChange={onChange}
					className={styles['checkbox']}
				/>
				{children ? (
					<label htmlFor={currentId} className={styles['label']}>
						{children}
					</label>
				) : (
					label && (
						<label htmlFor={currentId} className={styles['label']}>
							{label}
						</label>
					)
				)}
			</div>
			{errorText && <span className={defaultInputStyles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default InputCheckbox;
