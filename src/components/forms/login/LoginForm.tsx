'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import InputField from '@/components/fields/input/InputField';
import PasswordField from '@/components/fields/password/PasswordField';
import { useAuth } from '@/context/AuthContext';
import { loginWithCookie } from '@/lib/api/auth';
import LoginFormData from '@/types/LoginFormData';

import ForgotPasswordEmail from '../forgot-password-email/ForgotPasswordEmail';

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
				await login(); // login() из useAuth — вызовет verifySession и обновит контекст
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
		<form
			onSubmit={handleSubmit}
			className="border bg-[#f8f8f8] 
        flex flex-col gap-5 w-[410px] self-center p-[30px] 
        rounded-[30px] border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
		>
			<h2
				className="text-2xl font-extrabold 
          text-[#032c28]"
			>
				Вход
			</h2>
			<div className="flex flex-col gap-1">
				<InputField
					label="Почта"
					placeholder="Example@gmail.com"
					name="email"
					value={formData.email}
					onChange={handleChange}
					width={350}
					labelFontSize={14}
					maxRows={1}
				/>
				{errors.email && <p className="text-red-600 text-sm font-medium mt-1">{errors.email}</p>}
			</div>
			<div className="flex flex-col gap-1">
				<PasswordField
					label="Пароль"
					placeholder="********"
					name="password"
					value={formData.password}
					onChange={handleChange}
					width={350}
					labelFontSize={14}
				/>
				{errors.password && (
					<p className="text-red-600 text-sm font-medium mt-1">{errors.password}</p>
				)}
			</div>
			<p
				className="text-sm text-[#888888] underline self-end mt-[-10px] cursor-pointer"
				onClick={handleForgotPasswordClick}
			>
				Забыли пароль?
			</p>
			<div className="flex items-center gap-2">
				<input
					type="checkbox"
					name="rememberMe"
					checked={formData.rememberMe}
					onChange={handleChange}
					className="w-4 h-4 border border-[rgba(0,0,0,0.20)] rounded-sm"
				/>
				<p className="text-sm text-[#032c28]">Запомнить меня</p>
			</div>
			<div className="flex flex-col gap-4">
				<button
					type="submit"
					className="bg-[#6dbc29] text-white p-2 rounded-2xl hover:bg-[#5b9e26]"
				>
					Войти
				</button>
				<p className="text-sm font-bold text-[#032c28] text-center">
					Еще нет аккаунта?
					<Link href="/registration" className="underline text-[#6dbc29]">
						Зарегистрироваться
					</Link>
				</p>
			</div>
			{isPasswordResetVisible && (
				<ForgotPasswordEmail
					formData={formData}
					handleChange={handleChange}
					onClose={() => setIsPasswordResetVisible(false)}
					onClick={() => {
						setIsPasswordResetVisible(false);
					}}
				/>
			)}
		</form>
	);
}
