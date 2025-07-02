import React, { useState } from 'react';

import Link from 'next/link';

import ButtonCustom from '@/components/ui/ButtonCustom';
import InputPasswordField from '@/components/ui/inputs/InputPasswordField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import RegFormProps from '@/types/RegFormProps';

import styles from '../RegForm.module.scss';

const RegForm1: React.FC<RegFormProps> = ({ onClick, formData, handleChange }) => {
	const [errors, setErrors] = useState<{
		password?: string;
		confirmPassword?: string;
		email?: string;
	}>({
		password: '',
		confirmPassword: '',
		email: '',
	});

	const validate = () => {
		const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

		const emailRegex =
			/^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/;
		const minEmailLength = 5;
		const maxEmailLength = 70;

		if (!formData.email?.trim()) {
			newErrors.email = 'Введите email';
		} else if (!emailRegex.test(formData.email.trim())) {
			newErrors.email = 'Некорректный email';
		} else if (
			formData.email.trim().length < minEmailLength ||
			formData.email.trim().length > maxEmailLength
		) {
			newErrors.email = `Email должен содержать от ${minEmailLength} до ${maxEmailLength} символов`;
		}

		const password = formData?.password;
		const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(
			password,
		);

		if (!password) {
			newErrors.password = 'Введите пароль';
		} else if (password.length < 8) {
			newErrors.password = 'Длина пароля должна составлять не менее 8 символов';
		} else if (!isValidPassword) {
			newErrors.password =
				'Пароль должен состоять из заглавных и строчных букв, цифр и одного специального символа';
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'Подтвердите пароль';
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Пароли не совпадают';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (validate()) {
			onClick(event);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.header}>
				<h2 className={styles.title}>Регистрация</h2>
				<h3 className={styles.title}>1/3</h3>
			</div>
			<InputTextField
				label="Почта"
				placeholder="Example@gmail.com"
				autoComplete="off"
				name="email"
				onChange={handleChange}
				value={formData.email}
				errorText={errors.email}
			/>
			<InputPasswordField
				name="password"
				onChange={handleChange}
				value={formData.password}
				errorText={errors.password}
			/>
			<InputPasswordField
				label="Повторите пароль"
				name="confirmPassword"
				onChange={handleChange}
				value={formData.confirmPassword}
				errorText={errors.confirmPassword}
			/>
			<InputTextField
				label="Есть промокод?"
				placeholder="Hhufs8a7auh40egij"
				name="promocode"
				autoComplete="off"
				onChange={handleChange}
				value={formData?.promocode}
			/>
			<div className={styles.actions}>
				<ButtonCustom type="submit">Далее</ButtonCustom>
				<p className={styles['login-link']}>
					Уже есть аккаунт?
					<Link href="/login" className={styles['login-anchor']}>
						Войти
					</Link>
				</p>
			</div>
		</form>
	);
};

export default RegForm1;
