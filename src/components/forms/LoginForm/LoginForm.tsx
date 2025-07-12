'use client';

import { useCallback, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ButtonCustom from '@/components/ui/ButtonCustom';
import InputCheckbox from '@/components/ui/inputs/InputCheckbox';
import InputPasswordField from '@/components/ui/inputs/InputPasswordField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { loginWithCookie } from '@/lib/api/auth';

import { useAuth } from '@/context/AuthContext';
import LoginFormData from '@/types/LoginFormData';

import ForgotPasswordEmail from '../ForgotPasswordEmail/ForgotPasswordEmail';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
	const router = useRouter();
	const { login } = useAuth();

	const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
		rememberMe: false,
		passwordResetEmail: '',
		passwordReset: '',
		passwordResetConfirm: '',
	});

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
			const { name, value, type, checked } = event.target as HTMLInputElement;
			setFormData((prevData) => ({
				...prevData,
				[name]: type === 'checkbox' ? checked : value,
			}));
		},
		[],
	);

	const handleModal = () => setIsPasswordResetVisible((prev) => !prev);

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
			<div>
				<InputPasswordField
					value={formData.password}
					onChange={handleChange}
					errorText={errors.password}
					className={styles.password}
				/>
				<div className={styles['forgot-password-container']}>
					<p className={styles['forgot-password']} onClick={handleModal}>
						Забыли пароль?
					</p>
				</div>
			</div>
			<InputCheckbox
				name="rememberMe"
				checked={formData.rememberMe}
				onChange={handleChange}
				label={'Запомнить меня'}
			/>
			<div className={styles['actions']}>
				<ButtonCustom type="submit" className={styles['submit-button']}>
					Войти
				</ButtonCustom>
				<p className={styles['register-text']}>
					Еще нет аккаунта?{' '}
					<Link href="/registration" className={styles['register-link']}>
						Зарегистрироваться
					</Link>
				</p>
			</div>
			<ForgotPasswordEmail
				isOpen={isPasswordResetVisible}
				formData={formData}
				handleChange={handleChange}
				onClose={handleModal}
				onClick={handleModal}
			/>
		</form>
	);
}
