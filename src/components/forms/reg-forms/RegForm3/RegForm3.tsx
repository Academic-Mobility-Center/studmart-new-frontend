import { ChangeEvent, useEffect, useState } from 'react';

import Link from 'next/link';

import ButtonCustom from '@/components/ui/ButtonCustom';
import { FileField } from '@/components/ui/fields/file/FileField';
import InputCheckbox from '@/components/ui/inputs/InputCheckbox';
import InputSelectField from '@/components/ui/inputs/InputSelectField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { StudentEmailDomain } from '@/lib/api/students';

import RegistrationFormData from '@/types/RegistrationFormData';

import styles from '../RegForm.module.scss';

export type FormDataType = {
	[key: string]: string | File;
};
export type FormEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

interface Props {
	onClick: (event: React.FormEvent) => void;
	formData: RegistrationFormData;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	onBack?: () => void;
	onChange?: (
		setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
	) => (event: FormEvent) => void;
	universitiesOptions?: {
		label: string;
		value: string;
	}[];
	coursesOptions?: {
		label: string;
		value: string;
	}[];
	setBooleanField: (name: string, value: boolean) => void;
}
type errorRegForm3 = {
	profession?: string;
	file?: string;
	course?: string;
	university?: string;
	consent?: string;
};

const RegForm3: React.FC<Props> = ({
	handleChange,
	onBack,
	formData,
	onClick,
	universitiesOptions,
	coursesOptions,
	setBooleanField,
}) => {
	const [errors, setErrors] = useState<errorRegForm3>({
		profession: '',
		file: undefined,
		course: undefined,
		university: undefined,
		consent: undefined,
	});

	const validate = () => {
		const newErrors: errorRegForm3 = {};

		const minProfessionLength = 3;
		const maxProfessionLength = 100;
		const profession = formData.profession?.trim() ?? '';
		const professionRegex = /^[А-ЯЁ][а-яё]+(?:[\s\-][А-ЯЁа-яё]+)*(?:\s\([А-ЯЁа-яё\s\-]+\))?$/;

		if (!profession) {
			newErrors.profession = 'Введите свою профессию';
		} else if (profession.length < minProfessionLength || profession.length > maxProfessionLength) {
			newErrors.profession = `Профессия должна содержать от ${minProfessionLength} до ${maxProfessionLength} символов`;
		} else if (!professionRegex.test(profession)) {
			newErrors.profession =
				'Неверный формат профессии. Пример: "Инженер", "Ведущий инженер", "Менеджер (по продажам)"';
		}

		if (!formData.course?.value) {
			newErrors.course = 'Выберите ваш курс обучения';
		}

		if (!formData.university?.value.trim()) {
			newErrors.university = 'Выберите свой университет';
		}

		if (!formData.consent) {
			newErrors.consent = 'Вы должны дать согласие на обработку персональных данных';
		}

		if (!formData.file && formData.needFile) {
			newErrors.file = 'Прикрепите файл';
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

	const [prevCheck, setPrevCheck] = useState<{ email: string; university: string } | null>(null);

	useEffect(() => {
		const timeout = setTimeout(async () => {
			const email = formData.email?.trim();
			const university = formData.university?.value;

			if (!email || !university) return;
			if (prevCheck?.email === email && prevCheck?.university === university) return;

			setPrevCheck({ email, university });

			try {
				const status = await StudentEmailDomain(email, Number(university));
				setBooleanField('needFile', status.status !== 204);
			} catch (error) {
				console.log('Ошибка при проверке домена:', error);
				setBooleanField('needFile', true);
			}
		}, 300);

		return () => clearTimeout(timeout);
	}, [formData.email, formData.university, setBooleanField, prevCheck]);

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.header}>
				<h2 className={styles.title}>Регистрация</h2>
				<h3 className={styles.title}>3/3</h3>
			</div>

			<InputSelectField
				label="Университет"
				options={universitiesOptions ?? []}
				name="university"
				value={formData.university ?? undefined}
				onChange={handleChange}
				placeholder="Университет"
				errorText={errors.university}
			/>

			<InputTextField
				label="Специальность"
				placeholder="Специальность"
				name="profession"
				value={formData.profession}
				onChange={handleChange}
				errorText={errors.profession}
			/>

			<InputSelectField
				label="Курс"
				options={coursesOptions || []}
				name="course"
				value={formData.course ?? undefined}
				onChange={handleChange}
				placeholder="Курс"
				errorText={errors.course}
			/>

			<InputCheckbox
				name="consent"
				checked={formData.consent ?? false}
				onChange={(e) => setBooleanField('consent', e.target.checked)}
				errorText={errors.consent}
			>
				<span>
					Даю согласие на обработку персональных данных.
					<Link
						href="/files/Политика конфиденциальности.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className={styles['link']}
					>
						Ознакомиться с документом
					</Link>
				</span>
			</InputCheckbox>

			<FileField
				label="Документ, подтверждающий статус студента"
				name="file"
				onChange={handleChange}
				errorText={errors.file}
			/>

			<div className={styles.actions}>
				<div className={styles['button-wrapper']}>
					<ButtonCustom
						customType="secondary"
						type="button"
						onClick={onBack}
						className={styles['back-button']}
					>
						Назад
					</ButtonCustom>
					<ButtonCustom type="submit" className={styles.submitButton}>
						Зарегистрироваться
					</ButtonCustom>
				</div>
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

export default RegForm3;
