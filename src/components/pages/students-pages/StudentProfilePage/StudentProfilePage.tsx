'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import ForgotPasswordEmail from '@/components/forms/forgot-password-email/ForgotPasswordEmail';
import LoginInfo from '@/components/forms/student-profile-elements/login-info/LoginInfo';
import MainInfo from '@/components/forms/student-profile-elements/main-info/MainInfo';
import UniversityInfo from '@/components/forms/student-profile-elements/university-info/UniversityInfo';
import ButtonCustom from '@/components/ui/ButtonCustom';
import Loader from '@/components/ui/Loader';

import { transformToOption, transformToOptions } from '@/utils/dataTransform';
import { getPartnerRegions } from '@/lib/api/partners';
import {
	getLanguages,
	getStudentById,
	getStudentCities,
	getStudentCourses,
	getStudentUniversities,
	updateStudent,
} from '@/lib/api/students';

import { useAuth } from '@/context/AuthContext';
import IStudentFormData, {
	courseOptions,
	familyStatusOptions,
	genderOptions,
	isWorkOptions,
	validateField,
} from '@/context/StudentPersonalContext';
import City from '@/types/Cities';
import LoginFormData from '@/types/LoginFormData';
import { StudentFormData } from '@/types/StudentProfileData';
import StudentPutData from '@/types/StudentPutData';
import University from '@/types/University';

import styles from './StudentProfilePage.module.css';

const StudentProfilePage: React.FC = () => {
	const { role, id, isLoading } = useAuth();
	const router = useRouter();

	const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null);
	const [fetchCourses, setFetchCourses] = useState(courseOptions);
	const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
	const [fetchUniversities, setFetchUniversities] = useState<University[]>([]);
	const [fetchCities, setFetchCities] = useState<City[]>([]);
	const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
	const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);

	const [isLoadingFetch, setIsLoadingFetch] = useState(false);

	const [formData, setFormData] = useState<StudentFormData>({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		date: undefined,
		gender: undefined,
		region: undefined,
		city: undefined,
		familyStatus: undefined,
		isWork: undefined,
		languageProfiency: undefined,
		university: undefined,
		profession: '',
		course: undefined,
	});

	const [formDataChangePassword, setFormDataChangePassword] = useState<LoginFormData>({
		email: '',
		password: '',
		rememberMe: false,
		passwordResetEmail: '',
		passwordReset: '',
		passwordResetConfirm: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		date: undefined,
		gender: '',
		region: '',
		city: '',
		familyStatus: '',
		isWork: '',
		languageProfiency: '',
		university: '',
		profession: '',
		course: '',
	});

	const [isSaved, setIsSaved] = useState(false);

	useEffect(() => {
		if (role && role !== 'Student') {
			router.replace('/partner-personal-account');
		}
	}, [role, router]);

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			try {
				setIsLoadingFetch(true);
				const [student, universities, langs, courses, cities, regions] = await Promise.all([
					getStudentById(id),
					getStudentUniversities(),
					getLanguages(),
					getStudentCourses(),
					getStudentCities(),
					getPartnerRegions(),
				]);

				if (student) {
					setFetchStudent(student);
				}
				setFetchUniversities(universities);
				setLanguages(langs);
				setFetchCourses(courses);
				setFetchCities(cities);
				setRegions(regions);
				setIsLoadingFetch(false);
			} catch (e) {
				console.error('Ошибка при загрузке данных:', e);
				setIsLoadingFetch(false);
			}
		};

		fetchData();
	}, [id]);

	useEffect(() => {
		if (!fetchStudent) return;

		const genderOption = fetchStudent.sex ? { id: 1, name: 'Мужской' } : { id: 2, name: 'Женский' };
		const workOptions = fetchStudent.hasWork
			? { id: 1, name: 'Работает' }
			: { id: 2, name: 'Не работает' };
		const familyStatusOption = familyStatusOptions.find((item) => item.id === fetchStudent.status);

		setFormData({
			email: fetchStudent.email,
			password: '',
			firstName: fetchStudent.firstName,
			lastName: fetchStudent.lastName,
			date: new Date(fetchStudent.birthDate),
			gender: transformToOption(genderOption),
			region: fetchStudent.region ? transformToOption(fetchStudent.region) : undefined,
			city: fetchStudent.city ? transformToOption(fetchStudent.city) : undefined,
			familyStatus: familyStatusOption ? transformToOption(familyStatusOption) : undefined,
			isWork: transformToOption(workOptions),
			languageProfiency: fetchStudent.languages
				? transformToOptions(fetchStudent.languages)
				: undefined,
			university: transformToOption(fetchStudent.university) ?? undefined,
			profession: fetchStudent.specialisation,
			course: transformToOption(fetchStudent.course) ?? undefined,
		});
	}, [fetchStudent]);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type, files, checked } = event.target as HTMLInputElement;
		let newValue: any = value;

		if (type === 'checkbox' || type === 'radio') {
			newValue = checked;
		} else if (type === 'date') {
			newValue = new Date(value);
		} else if (type === 'file' && files) {
			newValue = files[0];
		}

		const selectMapping = {
			gender: genderOptions,
			region: regions,
			city: fetchCities,
			familyStatus: familyStatusOptions,
			isWork: isWorkOptions,
			languageProfiency: languages,
			university: fetchUniversities,
			course: fetchCourses,
		};

		if (name in selectMapping) {
			const options = selectMapping[name as keyof typeof selectMapping];
			const selected = options.find((option) => option.id.toString() === value);
			newValue = selected ? { value: selected.id.toString(), label: selected.name } : undefined;
		}

		setFormData((prev) => ({ ...prev, [name]: newValue }));
		setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
	};

	const handleSubmitForm = async (event: React.FormEvent) => {
		event.preventDefault();
		let hasErrors = false;
		const newErrors: any = {};

		Object.entries(formData).forEach(([key, value]) => {
			const error = validateField(key, value);
			if (error) {
				newErrors[key] = error;
				hasErrors = true;
			}
		});

		if (hasErrors) {
			setErrors((prev) => ({ ...prev, ...newErrors }));
			return;
		}

		const dataToSend: StudentPutData = {
			id: id ?? '',
			firstName: formData.firstName ?? '',
			lastName: formData.lastName ?? '',
			birthDate: formData.date?.toISOString().split('T')[0] ?? '',
			sex: formData.gender?.label === 'Мужской',
			email: formData.email ?? '',
			specialisation: formData.profession ?? '',
			status: Number(formData.familyStatus?.value) ?? null,
			universityId: Number(formData.university?.value),
			regionId: Number(formData.region?.value) ?? null,
			balance: fetchStudent?.balance ?? 0,
			hasWork: formData.isWork?.label === 'Работает',
			cityId: Number(formData.city?.value) ?? null,
			languageIds: formData.languageProfiency?.map((item) => Number(item.value)) ?? [],
			courseId: Number(formData.course?.value),
			paymentInformation: fetchStudent?.paymentInformation || null,
		};

		const response = await updateStudent(id ?? '', dataToSend);
		if (response.error || response.status < 200 || response.status >= 300) return;

		setIsSaved(true);
		setTimeout(() => setIsSaved(false), 3000);
	};

	const handleChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormDataChangePassword((prev) => ({ ...prev, [name]: value }));
	};

	if (isLoading || isLoadingFetch) return <Loader />;

	return (
		<form onSubmit={handleSubmitForm} className={styles['profile-card']}>
			<div className={styles['section-data']}>
				<h3 className={styles['profile-title']}>Личная информация</h3>
				<LoginInfo
					formData={formData}
					handleChange={handleChange}
					errors={errors}
					handleForgotPasswordClick={() => setIsPasswordResetVisible(true)}
				/>
				<MainInfo
					formData={formData}
					handleChange={handleChange}
					errors={errors}
					genderOptions={genderOptions}
					familyStatusOptions={familyStatusOptions}
					isWorkOptions={isWorkOptions}
					languageProfiencyOptions={languages}
					newCityOptions={fetchCities}
					newRegionOptions={regions}
				/>
				<UniversityInfo
					formData={formData}
					handleBlur={() => {}}
					handleChange={handleChange}
					errors={errors}
					courseOptions={fetchCourses}
					newUniversityOptions={fetchUniversities}
				/>
			</div>
			<ButtonCustom type="submit">{isSaved ? 'Сохранено ✓' : 'Сохранить'}</ButtonCustom>
			{isPasswordResetVisible && (
				<ForgotPasswordEmail
					formData={formDataChangePassword}
					handleChange={handleChangePassword}
					onClose={() => setIsPasswordResetVisible(false)}
					onClick={() => setIsPasswordResetVisible(false)}
				/>
			)}
		</form>
	);
};

export default StudentProfilePage;
