'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import ButtonCustom from '@/components/ui/ButtonCustom';
import Loader from '@/components/ui/Loader';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { getStudentById, updateStudent } from '@/lib/api/students';

import { useAuth } from '@/context/AuthContext';
import IStudentFormData from '@/context/StudentPersonalContext';
import StudentBankCredentialsFormData from '@/types/StudentBankCredentialsFormData';
import StudentPutData from '@/types/StudentPutData';

import styles from './StudentCredentialsPage.module.css';

const validateField = (name: string, value: string | boolean | string[]): string | undefined => {
	switch (name) {
		case 'fullname':
		case 'name':
		case 'patronymic':
			return /^[a-zA-Zа-яА-ЯёЁ\s-']+$/.test(value as string)
				? undefined
				: 'Введите корректное значение';

		case 'innOrKio':
			return /^\d{12}$/.test(value as string) ? undefined : 'ИНН должен содержать 12 цифр';
		case 'numberAccount':
			return /^\d{20}$/.test(value as string) ? undefined : 'Номер счета должен содержать 20 цифр';

		case 'bic':
			return /^\d{9}$/.test(value as string) ? undefined : 'БИК должен содержать 9 цифр';

		default:
			return undefined;
	}
};

const StudentCredentialsPage = () => {
	const { role, id } = useAuth();
	const router = useRouter();
	const [isSaved, setIsSaved] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoadingStudent, setIsLoadingStudent] = useState(false);

	useEffect(() => {
		if (role && role !== 'Student') {
			router.replace('/partner-personal-account');
		}
	}, [role, router]);
	const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null);
	const [formData, setFormData] = useState<StudentBankCredentialsFormData>({
		fullname: '',
		name: '',
		innOrKio: '',
		numberAccount: '',
		bic: '',
		patronymic: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoadingStudent(true);
				const student = await getStudentById(id ?? '');
				setFetchStudent(student);
			} catch (error) {
				console.warn(error);
			} finally {
				setIsLoadingStudent(false);
			}
		};
		if (id) {
			fetchData();
		}
	}, [id]);

	useEffect(() => {
		if (!fetchStudent) return;
		if (fetchStudent) {
			setFormData({
				fullname: fetchStudent.lastName,
				name: fetchStudent.firstName,
				innOrKio: fetchStudent?.paymentInformation?.inn.toString() ?? '',
				numberAccount: fetchStudent?.paymentInformation?.accountNumber ?? '',
				bic: fetchStudent?.paymentInformation?.bik ?? '',
				patronymic: fetchStudent?.paymentInformation?.patronymic ?? '',
			});
		}
	}, [fetchStudent]);
	const [errors, setErrors] = useState<{
		fullname?: string;
		name?: string;
		middleName?: string;
		innOrKio?: string;
		kpp?: string;
		numberAccount?: string;
		bic?: string;
		patronymic?: string;
	}>({
		fullname: '',
		name: '',
		middleName: '',
		innOrKio: '',
		kpp: '',
		numberAccount: '',
		bic: '',
		patronymic: '',
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target as HTMLInputElement;

		const newValue: string = value;

		setFormData((prevData) => ({
			...prevData,
			[name]: newValue,
		}));
	};
	const handleBlur = (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type, checked } = event.target as HTMLInputElement;

		const newValue = type === 'checkbox' || type === 'radio' ? checked : value;

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: validateField(name, newValue),
		}));
	};
	const handleSubmitForm = async (event: React.FormEvent) => {
		event.preventDefault();
		let hasErrors = false;
		const newErrors: typeof errors = {};
		Object.entries(formData).forEach(([key, value]) => {
			const error = validateField(key, value);
			if (error) {
				(newErrors as typeof errors)[key as keyof typeof errors] = error;
				hasErrors = true;
			}
		});

		setErrors(newErrors);

		if (hasErrors) return;

		if (isLoadingStudent) return <Loader />;

		const dataToSend: StudentPutData = {
			id: id ?? '',
			firstName: formData?.name ?? '',
			lastName: formData?.fullname ?? '',
			birthDate: fetchStudent?.birthDate ?? '',
			sex: fetchStudent?.sex ?? false,
			email: fetchStudent?.email ?? '',
			specialisation: fetchStudent?.specialisation ?? '',
			status: fetchStudent?.status ?? null,
			universityId: Number(fetchStudent?.university.id),
			regionId: fetchStudent?.region?.id ?? null,
			balance: fetchStudent?.balance ?? 0,
			hasWork: fetchStudent?.hasWork ?? false,
			cityId: fetchStudent?.city?.id ?? null,
			languageIds: fetchStudent?.languages?.map((item) => Number(item.id)) ?? [],
			courseId: Number(fetchStudent?.course?.id),
			paymentInformation: {
				bik: formData.bic,
				inn: Number(formData.innOrKio),
				accountNumber: formData.numberAccount,
				patronymic: formData.patronymic,
			},
		};
		const response = await updateStudent(id ?? '', dataToSend);
		if (response.error || response.status < 200 || response.status >= 300) {
			// Неудачный ответ — ничего не сохраняем
			console.warn('Произошла ошибка:', response.error);
			setIsError(true);
			return;
		}

		// Если всё прошло успешно
		setIsSaved(true);
		setIsError(false);
		setTimeout(() => setIsSaved(false), 3000);
	};
	return (
		<form onSubmit={handleSubmitForm} className={styles['credentials-form']}>
			<h3 className={styles['credentials-title']}>Банковские реквизиты</h3>
			<div className={styles['form-row']}>
				<InputTextField
					label="Фамилия"
					placeholder="Фамилия"
					onChange={handleChange}
					name="fullname"
					value={formData?.fullname}
					onBlur={handleBlur}
					errorText={errors.fullname}
				/>
				<InputTextField
					label="Имя"
					placeholder="Имя"
					onChange={handleChange}
					name="name"
					value={formData?.name}
					onBlur={handleBlur}
					errorText={errors.name}
				/>
				<InputTextField
					label="Отчество"
					placeholder="Отчество"
					onChange={handleChange}
					name="patronymic"
					value={formData?.patronymic}
					onBlur={handleBlur}
					errorText={errors.patronymic}
				/>
			</div>
			<div className={styles['form-row']}>
				<InputTextField
					label="ИНН/КИО"
					placeholder="ИНН/КИО"
					onChange={handleChange}
					name="innOrKio"
					value={formData?.innOrKio}
					onBlur={handleBlur}
					errorText={errors.innOrKio}
				/>
			</div>
			<div className={styles['form-row']}>
				<InputTextField
					label="Номер счета"
					placeholder="Номер счета"
					autoComplete="off"
					onChange={handleChange}
					name="numberAccount"
					value={formData?.numberAccount}
					onBlur={handleBlur}
					errorText={errors.numberAccount}
				/>
				<InputTextField
					label="БИК Банка"
					placeholder="БИК Банка"
					autoComplete="off"
					onChange={handleChange}
					value={formData?.bic}
					name="bic"
					onBlur={handleBlur}
					errorText={errors.bic}
				/>
			</div>
			<ButtonCustom type="submit" className={styles['save-button']}>
				{isSaved ? 'Сохранено ✓' : 'Сохранить'}
			</ButtonCustom>
			{isError && (
				<p className={styles['server-error']}>
					Не удалось сохранить. Пожалуйста, проверьте корректность банковских реквизитов.
				</p>
			)}
		</form>
	);
};

export default StudentCredentialsPage;
