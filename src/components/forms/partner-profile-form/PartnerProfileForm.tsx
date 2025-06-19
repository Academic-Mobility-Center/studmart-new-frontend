'use client';

import { useEffect, useState } from 'react';

import { Button } from '@mui/base';
import { useRouter } from 'next/navigation';

import {
	PartnerProfileData,
	profileCardClasses,
	profileTitleClasses,
	saveButtonClasses,
	validateField,
} from '@/app/(partner)/partner-personal-account/context';

import { transformToOption, transformToOptions } from '@/utils/dataTransform';
import {
	getPartnerCategories,
	getPartnerCountries,
	getPartnerInfo,
	getPartnerRegions,
	updateEmployee,
	updatePartner,
} from '@/lib/api/partners';

import { useAuth } from '@/context/AuthContext';
import LoginFormData from '@/types/LoginFormData';
import { Option } from '@/types/Option';
import { PartnerPersonalAccountFormData } from '@/types/PartnerPesonalAccount';
import { EmployeePutData, PartnerPutData } from '@/types/PartnerUpdateData';

import ForgotPasswordEmail from '../forgot-password-email/ForgotPasswordEmail';
import CompanyInfo from '../partner-profile-elements/company-info/CompanyInfo';
import LoginInfo from '../partner-profile-elements/login-info/LoginInfo';
import PaymentInfo from '../partner-profile-elements/payment-info/PaymentInfo';

const PartnerProfileForm: React.FC = () => {
	const { role, id } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Employee') {
			router.replace('/student-personal-account');
		}
	}, [role, router]);
	const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
	const [fetchedIndustyOptions, setFetchingIndustryOptions] = useState<
		{ id: number; name: string }[]
	>([]);
	const [fetchedCountryOptions, setFetchingCountryOptions] = useState<
		{ id: number; name: string }[]
	>([]);
	const [fetchPartner, setFetchPartner] = useState<PartnerProfileData | null>(null);
	const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
	const [isSaved, setIsSaved] = useState(false);

	const [formData, setFormData] = useState<PartnerPersonalAccountFormData>({
		personalEmail: '',
		password: '',
		companyName: '',
		site: '',
		phoneNumber: '',
		companyEmail: '',
		industry: undefined,
		country: undefined,
		regions: undefined,
		inn: '',
		currentAccount: '',
		corAccount: '',
		bic: '',
		allRegions: false,
		specificRegions: false,
	});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const partner = await getPartnerInfo(id ?? '');
				setFetchPartner(partner);
			} catch (error) {
				console.log(error);
			}
			try {
				const countries = await getPartnerCountries();
				setFetchingCountryOptions(countries);
			} catch (e) {
				console.error('Ошибка загрузки стран', e);
				setFetchingCountryOptions([]);
			}

			try {
				const regions = await getPartnerRegions();
				setRegions(regions);
			} catch (error) {
				console.warn(error);
			}

			try {
				const categories = await getPartnerCategories();
				setFetchingIndustryOptions(categories);
			} catch (e) {
				console.error('Ошибка загрузки категорий', e);
				setFetchingIndustryOptions([]);
			}
		};
		if (id) {
			fetchData();
		}
	}, [id]);
	useEffect(() => {
		if (!fetchPartner) return;
		setFormData({
			personalEmail: fetchPartner.email,
			password: '',
			companyName: fetchPartner.partner.name,
			site: fetchPartner.partner.site,
			phoneNumber: fetchPartner.partner.phone,
			companyEmail: fetchPartner.partner.email,
			industry: fetchPartner.partner?.category
				? transformToOption(fetchPartner.partner?.category)
				: undefined,
			country: fetchPartner.partner?.country
				? transformToOption(fetchPartner.partner?.country)
				: undefined,
			regions: fetchPartner.partner?.regions
				? transformToOptions(fetchPartner.partner?.regions)
				: undefined,
			inn: fetchPartner.partner.inn.toString(),
			currentAccount: fetchPartner.partner.paymentInformation.accountNumber,
			corAccount: fetchPartner.partner.paymentInformation.correspondentAccountNumber,
			bic: fetchPartner.partner.paymentInformation.bik,
			allRegions: fetchPartner.partner.hasAllRegions,
			specificRegions: !fetchPartner.partner.hasAllRegions,
		});
	}, [fetchPartner]);

	const handleForgotPasswordClick = () => {
		setIsPasswordResetVisible(true);
	};
	const [errors, setErrors] = useState<{
		personalEmail?: string;
		password?: string;
		companyName?: string;
		site?: string;
		phoneNumber?: string;
		companyEmail?: string;
		industry?: string[];
		country?: string[];
		regions?: string[];
		inn?: string;
		currentAccount?: string;
		corAccount?: string;
		bic?: string;
	}>({
		personalEmail: '',
		password: '',
		companyName: '',
		site: '',
		phoneNumber: '',
		companyEmail: '',
		industry: [],
		country: [],
		regions: [],
		inn: '',
		currentAccount: '',
		corAccount: '',
		bic: '',
	});

	const handleBlur = (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, type, value, checked } = event.target as HTMLInputElement;

		const newValue = type === 'checkbox' ? checked : value;

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: validateField(name, newValue, {
				...formData,
				[name]: newValue,
			}),
		}));
	};
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, type, value, checked } = event.target as HTMLInputElement;

		let newValue: string | boolean | File | Date | Option | undefined = value;

		if (type === 'checkbox') {
			newValue = checked;
		}

		const selectMap = {
			industry: fetchedIndustyOptions,
			country: fetchedCountryOptions,
		};

		if (selectMap[name as keyof typeof selectMap]) {
			const selected = selectMap[name as keyof typeof selectMap].find(
				(opt) => opt.id.toString() === value,
			);
			newValue = selected ? { value: selected.id.toString(), label: selected.name } : '';
		}

		// Логика "все регионы" / "выбранные регионы"
		if (name === 'allRegions' && checked) {
			setFormData((prev) => ({
				...prev,
				allRegions: true,
				specificRegions: false,
				regions: regions.map((r) => ({ value: r.id.toString(), label: r.name })),
			}));
			return;
		}

		if (name === 'specificRegions' && checked) {
			setFormData((prev) => ({
				...prev,
				allRegions: false,
				specificRegions: true,
				regions: [],
			}));
			return;
		}

		// Формируем новое состояние formData вручную
		const updatedFormData = {
			...formData,
			[name]: newValue,
		};

		setFormData(updatedFormData);

		// Теперь для валидации используем updatedFormData
		setErrors((prevErrors) => {
			let validationValue: string | boolean | string[];

			if (newValue === undefined) {
				validationValue = '';
			} else if (newValue instanceof Date) {
				validationValue = newValue.toISOString();
			} else if (typeof newValue === 'object' && 'value' in newValue) {
				validationValue = (newValue as Option).value;
			} else {
				validationValue = newValue;
			}

			return {
				...prevErrors,
				[name]: validateField(name, validationValue, updatedFormData),
			};
		});
	};

	const handleSubmitForm = async (event: React.FormEvent) => {
		event.preventDefault();
		let hasErrors = false;
		const newErrors: Record<string, string | string[]> = {}; // Изменили тип на Record
		Object.entries(formData).forEach(([key, value]) => {
			const error = validateField(key, value, formData);
			if (error) {
				newErrors[key] = error; // Теперь без any
				hasErrors = true;
			}
		});
		if (
			!formData?.bic ||
			!formData?.currentAccount ||
			!formData?.corAccount ||
			!formData?.industry ||
			!formData?.site ||
			!formData?.country ||
			!formData?.inn ||
			!formData.companyName ||
			!formData?.companyEmail ||
			!formData?.phoneNumber
		) {
			alert('Для сохранения данных, убедитесь, что все поля формы заполнены');
			return;
		}
		setErrors(newErrors);

		if (hasErrors) return;
		const EmployeeDataToSend: EmployeePutData = {
			id: id ?? '',
			email: fetchPartner?.email ?? '',
			firstName: fetchPartner?.firstName ?? '',
			lastName: fetchPartner?.lastName ?? '',
			partnerId: fetchPartner?.partner.id ?? '',
		};

		const PartnerDataToSend: PartnerPutData = {
			id: fetchPartner?.partner.id ?? '',
			name: formData.companyName ?? '',
			subtitle: fetchPartner?.partner.subtitle ?? '',
			description: fetchPartner?.partner.description ?? '',
			priority: fetchPartner?.partner.priority ?? 0,
			email: formData?.companyEmail ?? '',
			phone: formData?.phoneNumber ?? '',
			inn: Number(formData?.inn) ?? null,
			countryId: Number(formData?.country?.value) ?? null,
			site: formData?.site ?? null,
			categoryId: Number(formData?.industry?.value) ?? null,
			hasAllRegions: formData?.regions && formData?.regions?.length > 0 ? false : true,
			regionIds: formData?.regions?.map((item) => Number(item?.value)) ?? [],
			paymentInformation: {
				bik: formData?.bic,
				accountNumber: formData?.currentAccount,
				correspondentAccountNumber: formData?.corAccount,
			},
		};

		const responseEmployee = await updateEmployee(id ?? '', EmployeeDataToSend);
		if (responseEmployee.error || responseEmployee.status < 200 || responseEmployee.status >= 300) {
			console.warn('Произошла ошибка:', responseEmployee.error);
			return;
		}
		const responsePartner = await updatePartner(fetchPartner?.partner?.id ?? '', PartnerDataToSend);
		if (responsePartner.error || responsePartner.status < 200 || responsePartner.status >= 300) {
			console.warn('Произошла ошибка:', responsePartner.error);
			return;
		}
		setIsSaved(true);
		setTimeout(() => setIsSaved(false), 3000);
	};
	const [formDataChangePassword, setFormDataChangePassword] = useState<LoginFormData>({
		email: '',
		password: '',
		rememberMe: false,
		passwordResetEmail: '',
		passwordReset: '',
		passwordResetConfirm: '',
	});

	const handleChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormDataChangePassword((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	return (
		<>
			<form onSubmit={handleSubmitForm} className={profileCardClasses}>
				<div className="grow-0 shrink-0 basis-auto">
					<h3 className={profileTitleClasses}>Профиль партнера</h3>
					<div className="mt-5">
						<LoginInfo
							formData={formData}
							handleForgotPasswordClick={handleForgotPasswordClick}
							handleChange={handleChange}
							errors={errors}
							handleBlur={handleBlur}
						/>
						<CompanyInfo
							formData={formData}
							handleChange={handleChange}
							errors={errors}
							handleBlur={handleBlur}
							industryOptions={fetchedIndustyOptions}
							countryOptions={fetchedCountryOptions}
							regionOptions={regions}
						/>
						<PaymentInfo
							formData={formData}
							handleChange={handleChange}
							errors={errors}
							handleBlur={handleBlur}
						/>
					</div>
				</div>
				<Button type="submit" className={saveButtonClasses}>
					{isSaved ? 'Сохранено ✓' : 'Сохранить'}
				</Button>
				{isPasswordResetVisible && (
					<ForgotPasswordEmail
						formData={formDataChangePassword}
						handleChange={handleChangePassword}
						onClose={() => setIsPasswordResetVisible(false)}
						onClick={() => {
							setIsPasswordResetVisible(false);
						}}
					/>
				)}
			</form>
		</>
	);
};

export default PartnerProfileForm;
