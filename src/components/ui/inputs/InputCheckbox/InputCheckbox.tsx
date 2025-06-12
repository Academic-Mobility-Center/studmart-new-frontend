import { FC, InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './InputCheckbox.module.css';

export interface IInputCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: string;
}

const InputCheckbox: FC<IInputCheckboxProps> = ({
	label,
	className,
	id,
	name,
	checked,
	onChange,
}) => {
	const currentId = id ?? name + 'Id';
	return (
		<div className={clsx(styles['input-checkbox'], className)}>
			<input
				id={currentId}
				type="checkbox"
				name={name}
				checked={checked}
				onChange={onChange}
				className={styles['checkbox']}
			/>
			<label htmlFor={currentId} className={styles['label']}>
				{label}
			</label>
		</div>
	);
};

export default InputCheckbox;
