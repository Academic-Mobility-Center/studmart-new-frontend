'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import InputField from '@/components/fields/input/InputField';
import IStudentFormData from '@/app/(student)/student-personal-account/context';
import { useAuth } from '@/context/AuthContext';
import { getStudentById, updateStudent } from '@/lib/api/students';
import StudentBankCredentialsFormData from '@/types/StudentBankCredentialsFormData';
import StudentPutData from '@/types/StudentPutData';

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

const CredentialsPage = () => {
	const { role, id } = useAuth();
	const router = useRouter();
	const [isSaved, setIsSaved] = useState(false);
	const [isError, setIsError] = useState(false);
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
				const student = await getStudentById(id ?? '');
				setFetchStudent(student);
			} catch (error) {
				console.warn(error);
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

	const hanldeChange = (
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
		<form onSubmit={handleSubmitForm} className="flex flex-col gap-[40px] ">
			<div
				className="border bg-[#F8F8F8] box-border 
                flex justify-start items-stretch flex-col grow-0 
                shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
                border-solid border-[rgba(0,0,0,0.20)] w-[588px] pb-5 gap-5"
			>
				<h3
					className="font-['Nunito_Sans'] text-[24px] 
                    font-extrabold text-[#032c28] m-0 p-0 mt-5"
				>
					Банковские реквизиты
				</h3>
				<div className="flex flex-row gap-6">
					<div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
						<InputField
							label="Фамилия"
							placeholder="Фамилия"
							width={262}
							maxRows={1}
							onChange={hanldeChange}
							name="fullname"
							value={formData?.fullname}
							onBlur={handleBlur}
						/>
						{errors.fullname && (
							<p className="text-red-600 text-sm font-medium">{errors.fullname}</p>
						)}
					</div>
					<div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
						<InputField
							label="Имя"
							placeholder="Имя"
							width={262}
							maxRows={1}
							onChange={hanldeChange}
							name="name"
							value={formData?.name}
							onBlur={handleBlur}
						/>
						{errors.name && <p className="text-red-600 text-sm font-medium">{errors.name}</p>}
					</div>
				</div>
				<div className="flex flex-row gap-6">
					<div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
						<InputField
							label="ИНН/КИО"
							placeholder="ИНН/КИО"
							width={262}
							maxRows={1}
							onChange={hanldeChange}
							name="innOrKio"
							value={formData?.innOrKio}
							onBlur={handleBlur}
						/>
						{errors.innOrKio && (
							<p className="text-red-600 text-sm font-medium">{errors.innOrKio}</p>
						)}
					</div>
					<div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
						<InputField
							label="Отчество"
							placeholder="Отчество"
							width={262}
							maxRows={1}
							onChange={hanldeChange}
							name="patronymic"
							value={formData?.patronymic}
							onBlur={handleBlur}
						/>
						{errors.patronymic && (
							<p className="text-red-600 text-sm font-medium">{errors.patronymic}</p>
						)}
					</div>
				</div>
				<div className="flex flex-row gap-6">
					<div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
						<InputField
							label="Номер счета"
							placeholder="Номер счета"
							width={262}
							maxRows={1}
							autoComplete="off"
							onChange={hanldeChange}
							name="numberAccount"
							value={formData?.numberAccount}
							onBlur={handleBlur}
						/>
						{errors.numberAccount && (
							<p className="text-red-600 text-sm font-medium">{errors.numberAccount}</p>
						)}
					</div>
					<div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
						<InputField
							label="БИК Банка"
							placeholder="БИК Банка"
							width={262}
							maxRows={1}
							autoComplete="off"
							onChange={hanldeChange}
							value={formData?.bic}
							name="bic"
							onBlur={handleBlur}
						/>
						{errors.bic && <p className="text-red-600 text-sm font-medium">{errors.bic}</p>}
					</div>
				</div>
				<button
					type="submit"
					className="bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                    uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border 
                    grow-0 shrink-0 basis-auto  rounded-[15px] border-[none]"
				>
					{isSaved ? 'Сохранено ✓' : 'Сохранить'}
				</button>
				{isError && (
					<p className="text-red-600 text-sm font-medium mt-2">
						Не удалось сохранить. Пожалуйста, проверьте корректность банковских реквизитов.
					</p>
				)}
			</div>
		</form>
	);
};

export default CredentialsPage;
