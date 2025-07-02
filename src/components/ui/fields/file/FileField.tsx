import { InputHTMLAttributes, useState } from 'react';

import clsx from 'clsx';

import styles from './FileField.module.scss';

interface IFileField extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	errorText?: string;
}

export function FileField({ label, name, onChange, errorText, className, ...rest }: IFileField) {
	const [fileName, setFileName] = useState<string>('');

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			const fileParts = file.name.split('.');
			const extension = fileParts.pop();
			const baseName = fileParts.join('.');
			const shortName = baseName.length > 25 ? baseName.slice(0, 25) + '...' : baseName;
			setFileName(`${shortName}.${extension}`);
		} else {
			setFileName('');
		}
		onChange(event);
	};

	return (
		<div className={clsx(styles.wrapper, className)}>
			<label className={styles.label}>{label}</label>
			<input
				{...rest}
				id={name}
				type="file"
				className={styles['hidden-input']}
				name={name}
				onChange={handleFileChange}
			/>
			<label
				htmlFor={name}
				className={clsx(styles['custom-input'], { [styles['error']]: !!errorText })}
			>
				{fileName || 'Прикрепите файл'}
			</label>
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
}
