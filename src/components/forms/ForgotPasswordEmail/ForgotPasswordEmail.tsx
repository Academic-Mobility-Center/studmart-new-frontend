import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import ButtonCustom from '@/components/ui/ButtonCustom';
import CustomCard from '@/components/ui/CustomCard';
import ModalWindow from '@/components/ui/ModalWindow';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { forgotPassword } from '@/lib/api/auth';

import LoginFormData from '@/types/LoginFormData';

import styles from './ForgotPasswordEmail.module.css';

interface IForgotPasswordEmailProps {
	onClose: () => void;
	onClick: () => void;
	formData: LoginFormData;
	handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	isOpen?: boolean;
}

const ForgotPasswordEmail: React.FC<IForgotPasswordEmailProps> = ({
	onClose,
	onClick,
	handleChange,
	formData,
	isOpen,
}) => {
	const [errors, setErrors] = useState<{ passwordResetEmail?: string }>({});
	const modalRef = useRef<HTMLDivElement>(null);
	const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	useEffect(() => {
		if (isSentSuccessfully) {
			const timeout = setTimeout(() => {
				onClick();
			}, 2000);
			return () => clearTimeout(timeout);
		}
	}, [isSentSuccessfully, onClick]);

	const validate = () => {
		const newErrors: { passwordResetEmail?: string } = {};
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.passwordResetEmail)) {
			newErrors.passwordResetEmail = 'Некорректный email';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;

		setLoading(true);
		try {
			const response = await forgotPassword(formData.passwordResetEmail);
			if (response.status === 204) {
				setIsSentSuccessfully(true);
			} else {
				setErrors({ passwordResetEmail: response.error || 'Ошибка при отправке' });
			}
		} catch (error) {
			console.warn(error);
			setErrors({ passwordResetEmail: 'Ошибка соединения' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<ModalWindow isOpen={isOpen} onClose={onClose}>
			<CustomCard customColor="white" className={styles.card}>
				{isSentSuccessfully ? (
					<>
						<h2 className={styles['title']}>Письмо отправлено</h2>
						<p className={styles['description']}>
							Письмо для сброса пароля будет отправлено на указанную почту в ближайшее время.
						</p>
					</>
				) : (
					<>
						<h2 className={styles['title']}>Сброс пароля</h2>
						<InputTextField
							label="Почта от личного кабинета"
							placeholder="Введите почту"
							name="passwordResetEmail"
							value={formData.passwordResetEmail}
							errorText={errors.passwordResetEmail}
							onChange={handleChange}
						/>
						<ButtonCustom type="button" onClick={handleSubmit} disabled={loading}>
							{loading ? 'Отправка...' : 'Отправить'}
						</ButtonCustom>
					</>
				)}
			</CustomCard>
		</ModalWindow>
	);
};

export default ForgotPasswordEmail;
