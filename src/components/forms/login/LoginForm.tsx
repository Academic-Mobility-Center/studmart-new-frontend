'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import InputField from '@/components/fields/input/InputField';
import PasswordField from '@/components/fields/password/PasswordField';
import InputTextField from '@/components/ui/InputTextField';
import { useAuth } from '@/context/AuthContext';
import { loginWithCookie } from '@/lib/api/auth';
import LoginFormData from '@/types/LoginFormData';

import ForgotPasswordEmail from '../forgot-password-email/ForgotPasswordEmail';
import styles from './LoginForm.module.css';

export default function LoginForm() {
	const router = useRouter();
	const { login } = useAuth();

	const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
		rememberMe: false,
		passwordResetEmail: '',
		passwordReset: '',
		passwordResetConfirm: '',
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type, checked } = event.target as HTMLInputElement;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleForgotPasswordClick = () => {
		setIsPasswordResetVisible(true);
	};

	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	const validate = () => {
		const newErrors: { email?: string; password?: string } = {};
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Некорректный email';
		}
		if (formData.password.length < 6) {
			newErrors.password = 'Пароль должен содержать минимум 6 символов';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!validate()) return;
		try {
			const result = await loginWithCookie({
				email: formData.email,
				password: formData.password,
				twoFactorCode: '',
				twoFactorRecoveryCode: '',
			});

			if (!result.error) {
				await login();
				router.push('/home');
			} else {
				setErrors({
					email: ' ',
					password: result.error,
				});
			}
		} catch (error) {
			console.error(error);
			setErrors({
				email: ' ',
				password: 'Ошибка соединения',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles['form']}>
			<h2 className={styles['form-title']}>Вход</h2>
			<InputTextField
				label="Почта"
				name="email"
				placeholder="Example@gmail.com"
				value={formData.email}
				onChange={handleChange}
				errorText={errors.email}
			/>
			<div className={styles['field-wrapper']}>
				<InputField
					label="Почта"
					placeholder="Example@gmail.com"
					name="email"
					value={formData.email}
					onChange={handleChange}
					width={350}
					labelFontSize={14}
					marginBottom={0}
				/>
				{errors.email && <p className={styles['error-text']}>{errors.email}</p>}
			</div>
			<div className={styles['field-wrapper']}>
				<PasswordField
					label="Пароль"
					placeholder="********"
					name="password"
					value={formData.password}
					onChange={handleChange}
					labelFontSize={14}
				/>
				{errors.password && <p className={styles['error-text']}>{errors.password}</p>}
			</div>

			<p className={styles['forgot-password']} onClick={handleForgotPasswordClick}>
				Забыли пароль?
			</p>

			<div className={styles['checkbox-wrapper']}>
				<input
					id="rememberMe"
					type="checkbox"
					name="rememberMe"
					checked={formData.rememberMe}
					onChange={handleChange}
					className={styles['checkbox']}
				/>
				<label htmlFor="rememberMe" className={styles['checkbox-label']}>
					Запомнить меня
				</label>
			</div>

			<div className={styles['actions']}>
				<button type="submit" className={styles['submit-button']}>
					Войти
				</button>
				<p className={styles['register-text']}>
					Еще нет аккаунта?
					<Link href="/registration" className={styles['register-link']}>
						Зарегистрироваться
					</Link>
				</p>
			</div>

			{isPasswordResetVisible && (
				<ForgotPasswordEmail
					formData={formData}
					handleChange={handleChange}
					onClose={() => setIsPasswordResetVisible(false)}
					onClick={() => setIsPasswordResetVisible(false)}
				/>
			)}
		</form>
	);
}
