import { useState } from 'react';

import Link from 'next/link';

import ButtonCustom from '@/components/ui/ButtonCustom';
import InputDateField from '@/components/ui/inputs/InputDateField';
import InputSelectField from '@/components/ui/inputs/InputSelectField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { transformToOptions } from '@/utils/dataTransform';

import RegFormProps from '@/types/RegFormProps';

import styles from '../RegForm.module.scss';

const genderOptions = [
	{ id: 1, name: 'Мужской' },
	{ id: 2, name: 'Женский' },
];

const RegForm2: React.FC<RegFormProps> = ({
	handleChange,
	onBack,
	formData,
	onClick,
	handleSelect,
}) => {
	const [errors, setErrors] = useState<{
		name?: string;
		fullname?: string;
		date?: string;
		gender?: string;
	}>({
		name: '',
		fullname: '',
		date: '',
		gender: '',
	});

	const validate = () => {
		const newErrors: { name?: string; fullname?: string; date?: string; gender?: string } = {};

		const nameRegex = /^[а-яА-Я\s\'’-]+$/;
		const minNameLength = 3;
		const maxNameLength = 30;

		const name = formData.name?.trim() ?? '';
		const fullname = formData.fullname?.trim() ?? '';
		const selectedDate = formData.date ? new Date(formData.date) : null;

		if (!name) {
			newErrors.name = 'Введите имя';
		} else if (!nameRegex.test(name)) {
			newErrors.name = 'Имя может содержать только русские буквы, пробелы, дефисы и апострофы';
		} else if (name.length < minNameLength || name.length > maxNameLength) {
			newErrors.name = `Имя должно содержать от ${minNameLength} до ${maxNameLength} символов`;
		}

		if (!fullname) {
			newErrors.fullname = 'Введите фамилию';
		} else if (!nameRegex.test(fullname)) {
			newErrors.fullname =
				'Фамилия может содержать только русские буквы, пробелы, дефисы и апострофы';
		} else if (fullname.length < minNameLength || fullname.length > maxNameLength) {
			newErrors.fullname = `Фамилия должна содержать от ${minNameLength} до ${maxNameLength} символов`;
		}

		if (!selectedDate) {
			newErrors.date = 'Введите дату рождения';
		}

		if (!formData.gender?.value) {
			newErrors.gender = 'Выберите пол';
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
				<h3 className={styles.title}>2/3</h3>
			</div>
			<InputTextField
				label="Имя"
				placeholder="Дмитрий"
				onChange={handleChange}
				name="name"
				value={formData.name}
				errorText={errors.name}
			/>
			<InputTextField
				label="Фамилия"
				placeholder="Орлов"
				onChange={handleChange}
				name="fullname"
				value={formData.fullname}
				errorText={errors.fullname}
			/>
			<InputSelectField
				errorText={errors.gender}
				label="Пол"
				options={transformToOptions(genderOptions)}
				name="gender"
				value={formData.gender ?? undefined}
				onChange={handleSelect}
				placeholder="Мужской"
				searchOn={false}
			/>
			<InputDateField
				label="Дата рождения"
				name="date"
				onChange={handleChange}
				value={formData.date}
				errorText={errors.date}
			/>

			<div className={styles.actions}>
				<div className={styles['button-wrapper']}>
					<ButtonCustom className={styles['back-button']} customType="secondary" onClick={onBack}>
						Назад
					</ButtonCustom>
					<ButtonCustom type="submit" onClick={handleSubmit}>
						Далее
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

export default RegForm2;
