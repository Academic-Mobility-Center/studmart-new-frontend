'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import RegForm1 from '@/components/forms/reg-forms/RegForm1/RegForm1';
import RegForm2 from '@/components/forms/reg-forms/RegForm2/RegForm2';
import RegForm3 from '@/components/forms/reg-forms/RegForm3/RegForm3';

import {
	getStudentByEmail,
	getStudentCourses,
	getStudentUniversities,
	sendStudentFile,
	studentRegistration,
} from '@/lib/api/students';

import Course from '@/types/Course';
import { Option } from '@/types/Option';
import RegistrationFormData from '@/types/RegistrationFormData';
import University from '@/types/University';

interface ErrorResponse {
	status: number;
}

interface ErrorWithResponse {
	response: ErrorResponse;
}
const genderOptions = [
	{ id: 1, name: 'Мужской' },
	{ id: 2, name: 'Женский' },
];
export default function RegistrationForm() {
	const searchParams = useSearchParams();
	const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
	const [formData, setFormData] = useState<RegistrationFormData>({
		email: '',
		password: '',
		confirmPassword: '',
		promocode: '',
		name: '',
		fullname: '',
		gender: null,
		date: null,
		university: null,
		profession: '',
		course: null,
		file: null,
		sex: false,
		needFile: false,
		consent: false,
	});
	const router = useRouter();
	const [isFirstPage, setIsFirstPage] = useState(true);
	const [isSecondPage, setIsSecondPage] = useState(false);
	const [isThirdPage, setIsThirdPage] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [universities, setUniversities] = useState<University[] | null>(null);
	const [courses, setCourses] = useState<Course[] | null>(null);

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				setIsLoading(true);
				const fetchUniversities = await getStudentUniversities();
				setUniversities(fetchUniversities);
			} catch (error) {
				console.error(error);
			}
			try {
				const fetchCourses = await getStudentCourses();
				setCourses(fetchCourses);
			} catch (error) {
				console.error(error);
			}
		};
		fetchOptions();
		setIsLoading(false);
	}, []);

	const universitiesOptions =
		universities?.map((university) => ({
			label: university.name,
			value: university.id.toString(),
		})) ?? [];
	const coursesOptions =
		courses?.map((course) => ({
			label: course.name,
			value: course.id.toString(),
		})) ?? [];
	const handleChangeForm = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type } = event.target;
		let newValue: string | File | Date | Option | null = value;
		if (type === 'date') {
			newValue = new Date(value);
		} else if (type === 'file') {
			const input = event.target as HTMLInputElement;
			newValue = input.files?.[0] || null;
		}

		if (name === 'gender') {
			const selectedGender = genderOptions.find((option) => option.id.toString() === value);
			newValue = selectedGender
				? { value: selectedGender.id.toString(), label: selectedGender.name }
				: null;
		}

		if (name === 'course') {
			const selectedCourse = courses?.find((option) => option.id.toString() === value);
			newValue = selectedCourse
				? { value: selectedCourse.id.toString(), label: selectedCourse.name }
				: null;
		}

		if (name === 'university') {
			const selectedUniversity = universities?.find((option) => option.id.toString() === value);
			newValue = selectedUniversity
				? { value: selectedUniversity.id.toString(), label: selectedUniversity?.name }
				: null;
		}

		setFormData((prevData) => ({
			...prevData,
			[name]: newValue,
		}));
	};

	const handleSelect = (name: string, value: Option | null) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const setBooleanField = (name: string, value: boolean) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmitForm1 = (event: React.FormEvent) => {
		event.preventDefault();
		setIsFirstPage(false);
		setIsSecondPage(true);
	};

	const handleSubmitForm2 = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSecondPage(false);
		setIsThirdPage(true);
	};

	const handleBackForm2 = () => {
		setIsSecondPage(false);
		setIsFirstPage(true);
	};

	function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const result = reader.result as string;
				// result будет в формате: data:<content-type>;base64,<base64string>
				// Если нужен только base64, можно отрезать префикс:
				const base64String = result.split(',')[1];
				resolve(base64String);
			};
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		});
	}

	const handleSubmitForm3 = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const {
				name,
				fullname,
				gender,
				date,
				email,
				profession,
				password,
				promocode,
				university,
				course,
				needFile,
				file, // предполагаем, что здесь File | undefined
			} = formData;

			if (
				!name ||
				!fullname ||
				!gender ||
				!date ||
				!email ||
				!profession ||
				!password ||
				!university ||
				!course
			) {
				alert('Пожалуйста, заполните все обязательные поля.');
				return;
			}

			try {
				const existingStudent = await getStudentByEmail(email.trim());
				if (existingStudent) {
					console.log(existingStudent?.length);
					alert('Студент с таким email уже существует.');
					return;
				}
			} catch (error: unknown) {
				if (
					typeof error === 'object' &&
					error !== null &&
					'response' in error &&
					typeof (error as ErrorWithResponse).response === 'object' &&
					(error as ErrorWithResponse).response !== null &&
					'status' in (error as ErrorWithResponse).response
				) {
					const status = (error as ErrorWithResponse).response.status;
					if (status !== 404) {
						console.error('Ошибка при проверке email:', error);
						alert('Ошибка при проверке email. Попробуйте позже.');
						// return;
					}
				} else {
					console.error('Неизвестная ошибка при проверке email:', error);
					alert('Ошибка при проверке email. Попробуйте позже.');
					//   return;
				}
			}

			const firstName = name.trim();
			const lastName = fullname.trim();
			const sex = gender.label === 'Мужской';
			const birthDate = date.toISOString().split('T')[0];
			const universityId = parseInt(university.value, 10);
			const courseId = parseInt(course.value, 10);

			const result = await studentRegistration(
				firstName,
				lastName,
				sex,
				birthDate,
				email.trim(),
				profession.trim(),
				password,
				promocode.trim(),
				universityId,
				courseId,
			);

			if (result) {
				const studentResponse = await getStudentByEmail(email.trim());
				if (studentResponse && studentResponse.id) {
					const studentId = studentResponse.id;

					// ⬇️ Обработка файла
					if (needFile && file instanceof File) {
						const base64String = await fileToBase64(file);
						const contentType = file.type;
						const uploadResult = await sendStudentFile(studentId, base64String, contentType);

						if (uploadResult) {
							console.warn('Файл успешно загружен:', uploadResult);
						} else {
							console.warn('Ошибка при загрузке файла');
						}
					}
					setIsSentSuccessfully(true);
					// alert("Регистрация прошла успешно!");
					setTimeout(() => {
						router.push('/login');
					}, 3000);
				} else {
					console.warn('Не удалось получить ID студента по email.');
					alert('Ошибка при получении данных студента.');
				}
			} else {
				alert('Ошибка при регистрации. Попробуйте позже.');
				setIsSentSuccessfully(false);
			}
		} catch (error) {
			console.error('Ошибка при отправке формы:', error);
			alert('Что-то пошло не так.');
			setIsSentSuccessfully(false);
		}
	};

	const handleBackForm3 = () => {
		setIsThirdPage(false);
		setIsSecondPage(true);
	};

	useEffect(() => {
		const promo = searchParams.get('promocode');
		if (promo) {
			setFormData((prev) => ({
				...prev,
				promocode: promo,
			}));
		}
	}, [searchParams]);
	if (isLoading) {
		return <>Загрузка...</>;
	}

	return (
		<>
			{!isSentSuccessfully && (
				<>
					{isFirstPage && (
						<RegForm1
							handleChange={handleChangeForm}
							onClick={handleSubmitForm1}
							formData={formData}
							handleSelect={handleSelect}
						/>
					)}
					{isSecondPage && (
						<RegForm2
							handleChange={handleChangeForm}
							formData={formData}
							onClick={handleSubmitForm2}
							onBack={handleBackForm2}
							handleSelect={handleSelect}
						/>
					)}
					{isThirdPage && (
						<RegForm3
							handleChange={handleChangeForm}
							formData={formData}
							onClick={handleSubmitForm3}
							onBack={handleBackForm3}
							universitiesOptions={universitiesOptions}
							coursesOptions={coursesOptions}
							setBooleanField={setBooleanField}
							handleSelect={handleSelect}
						/>
					)}
				</>
			)}
			{isSentSuccessfully && (
				<div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-[400px] text-center mt-[25px]">
					<h2 className="text-2xl font-extrabold mb-4">Благодарим за регистрацию!</h2>
					<p className=" text-sm font-medium">
						Просим вас проверить ваш почтовый ящик и подтвердить адрес электронной почты.
					</p>
				</div>
			)}
		</>
	);
}
