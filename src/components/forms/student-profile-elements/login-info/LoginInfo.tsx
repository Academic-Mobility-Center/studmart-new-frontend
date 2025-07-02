import React from 'react';

import InputPasswordField from '@/components/ui/inputs/InputPasswordField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { StudentFormData } from '@/types/StudentProfileData';

import styles from './LoginInfo.module.css';

interface Props {
	formData: StudentFormData | null;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	errors: {
		email?: string;
		password?: string;
	};
	handleBlur?: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	handleForgotPasswordClick: () => void;
}

const LoginInfo: React.FC<Props> = ({
	formData,
	handleChange,
	errors,
	handleBlur,
	handleForgotPasswordClick,
}) => {
	return (
		<div className={styles.info}>
			<h2 className={styles['section-title']}>Логин и пароль</h2>
			<div className={styles['fields-row']}>
				<InputTextField
					name="email"
					label="Почта"
					placeholder="ivanov@gmail.com"
					value={formData?.email}
					errorText={errors.email}
					onChange={handleChange}
					onBlur={handleBlur}
					disabled
				/>
				<div className={styles['change-password-block']}>
					<InputPasswordField
						name="password"
						label="Пароль"
						placeholder="********"
						value={formData?.password}
						errorText={errors.password}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled
					/>
					<p className={styles['change-password-link']} onClick={handleForgotPasswordClick}>
						Сменить пароль
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginInfo;
