// Предположим, что CSS модули уже настроены и используются в проекте.

import { useState } from 'react';

import NextImage from 'next/image';

import styles from './PasswordField.module.css'; // Путь к вашему CSS модулю

export default function PasswordField({
	label,
	placeholder,
	name,
	value,
	onChange,
	labelFontSize,
	onBlur,
	disabled = false,
	width,
}: {
	label: string;
	placeholder: string;
	name?: string;
	value?: string;
	labelFontSize: number;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	width?: number;
}) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className={styles.container} style={{ width: '100%', maxWidth: width }}>
			<label className={styles.label} style={{ fontSize: `${labelFontSize}px` }}>
				{label}
			</label>
			<div className={styles.relative}>
				<input
					className={`${styles.input} ${styles.border} ${styles.text} ${styles.placeholder} ${styles.inputHeight} ${styles.fullWidth}`}
					type={isPasswordVisible ? 'text' : 'password'}
					autoComplete="off"
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					name={name}
					onBlur={onBlur}
					disabled={disabled}
				/>
				<button
					type="button"
					className={styles.button}
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}
				>
					{!disabled && (
						<NextImage
							src={isPasswordVisible ? '/icons/auth/open-eye.svg' : '/icons/auth/closed-eye.svg'}
							alt="Toggle Password Visibility"
							width={24}
							height={24}
						/>
					)}
				</button>
			</div>
		</div>
	);
}
