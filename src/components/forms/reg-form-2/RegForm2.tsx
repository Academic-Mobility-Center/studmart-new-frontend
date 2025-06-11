import { useState } from 'react';

import Link from 'next/link';

import { DateField } from '@/components/fields/date/DateField';
import InputField from '@/components/fields/input/InputField';
import { SelectField } from '@/components/fields/select/SelectField';
import { transformToOptions } from '@/utils/dataTransform';
import RegFormProps from '@/types/RegFormProps';

const genderOptions = [
	{ id: 1, name: 'Мужской' },
	{ id: 2, name: 'Женский' },
];

const RegForm2: React.FC<RegFormProps> = ({ handleChange, onBack, formData, onClick }) => {
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
		event.preventDefault(); // Добавьте это!
		if (validate()) {
			console.log('Форма отправлена, вызываем onClick');
			onClick(event); // Переход на следующую страницу
		}
	};
	return (
		<div
			className="border bg-[#f8f8f8] 
            flex flex-col gap-5 w-full max-w-[410px] 
            self-center p-[30px] rounded-[30px] 
            border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
		>
			<div className="flex justify-between">
				<h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
				<h2 className="text-2xl font-extrabold text-[#032c28]">2/3</h2>
			</div>
			<div className="flex flex-col gap-1">
				<InputField
					label="Имя"
					placeholder="Дмитрий"
					onChange={handleChange}
					name="name"
					value={formData.name}
					width={350}
					labelFontSize={14}
					maxRows={1}
				/>
				{errors.name && <p className="text-red-600 text-sm font-medium mt-1">{errors.name}</p>}
			</div>
			<div className="flex flex-col gap-1">
				<InputField
					label="Фамилия"
					placeholder="Орлов"
					onChange={handleChange}
					name="fullname"
					value={formData.fullname}
					width={350}
					labelFontSize={14}
					maxRows={1}
				/>
				{errors.fullname && (
					<p className="text-red-600 text-sm font-medium mt-1">{errors.fullname}</p>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<DateField
					label="Дата рождения"
					onChange={handleChange}
					name="date"
					value={formData?.date instanceof Date ? formData?.date?.toISOString().split('T')[0] : ''}
					labelFontSize={14}
					width={350}
				/>
				{errors.date && <p className="text-red-600 text-sm font-medium mt-1">{errors.date}</p>}
			</div>

			<SelectField
				label="Пол"
				options={transformToOptions(genderOptions)}
				name="gender"
				value={formData.gender ?? undefined}
				onChange={handleChange}
				width={350}
				labelFontSize={14}
				placeholder="Мужской"
			/>
			<div className="flex flex-col gap-4">
				<div className="flex justify-center gap-[15px]">
					<button
						onClick={onBack}
						className="bg-[#EFEFEF] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl w-full max-w-[116px] h-[48]"
					>
						Назад
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						className="bg-[#8fe248] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl w-full max-w-[219px]"
					>
						Далее
					</button>
				</div>
				<p className="text-sm font-bold text-[#032c28] text-center">
					Уже есть аккаунт?
					<Link href="/login" className="text-[#6dbc29] underline pl-2">
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};
export default RegForm2;
