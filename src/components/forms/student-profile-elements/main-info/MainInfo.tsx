import InputDateField from '@/components/ui/inputs/InputDateField';
import InputMultiSelect from '@/components/ui/inputs/InputMultiSelect';
import InputSelectField from '@/components/ui/inputs/InputSelectField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { transformToOptions } from '@/utils/dataTransform';

import City from '@/types/Cities';
import Region from '@/types/Region';
import { SelectOption } from '@/types/SelectOption';
import { StudentFormData } from '@/types/StudentProfileData';

import styles from './MainInfo.module.css'; // Подключаем CSS модули

interface Props {
	formData: StudentFormData | null;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	errors: {
		firstName: string;
		lastName: string;
		date: undefined;
		gender: string;
		region: string;
		city: string;
		familyStatus: string;
		isWork: string;
		languageProfiency: string;
	};
	handleBlur?: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	genderOptions: SelectOption[];
	familyStatusOptions: SelectOption[];
	isWorkOptions: SelectOption[];
	languageProfiencyOptions: SelectOption[];
	newCityOptions: City[];
	newRegionOptions: Region[];
	handleChangeSelectMulti: (name: string, values: string[]) => void;
}

const MainInfo: React.FC<Props> = ({
	handleChange,
	formData,
	errors,
	handleBlur,
	genderOptions,
	familyStatusOptions,
	isWorkOptions,
	languageProfiencyOptions,
	newCityOptions,
	newRegionOptions,
	handleChangeSelectMulti,
}) => {
	return (
		<div className={styles.form}>
			<h2 className={styles['section-title']}>Личная информация</h2>
			<div className={styles['fields-row']}>
				<InputTextField
					name="firstName"
					label="Имя"
					placeholder="Имя"
					value={formData?.firstName}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.firstName}
				/>
				<InputTextField
					name="lastName"
					label="Фамилия"
					placeholder="Фамилия"
					value={formData?.lastName}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.lastName}
				/>
			</div>
			<div className={styles['fields-row']}>
				<InputDateField
					name="date"
					label="Дата рождения"
					value={formData?.date}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.date}
				/>
				<InputSelectField
					options={transformToOptions(genderOptions)}
					name="gender"
					label="Пол"
					placeholder="Пол"
					value={formData?.gender}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.gender}
				/>
			</div>
			<div className={styles['fields-row']}>
				<InputSelectField
					name="region"
					options={transformToOptions(newRegionOptions)}
					label="Регион проживания"
					placeholder="Регион проживания"
					value={formData?.region}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.region}
				/>
				<InputSelectField
					name="city"
					options={transformToOptions(newCityOptions)}
					label="Город проживания"
					placeholder="Город проживания"
					value={formData?.city}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.city}
				/>
			</div>
			<div className={styles['fields-row']}>
				<InputSelectField
					name="familyStatus"
					options={transformToOptions(familyStatusOptions)}
					label="Семейное положение"
					placeholder="Семейное положение"
					value={formData?.familyStatus}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.familyStatus}
				/>
				<InputSelectField
					name="isWork"
					options={transformToOptions(isWorkOptions)}
					label="Наличие работы"
					placeholder="Наличие работы"
					value={formData?.isWork}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.isWork}
				/>
			</div>
			<div className={styles['fields-row']}>
				{/* <MultipleSelectV2
					name="languageProfiency"
					value={formData?.languageProfiency}
					options={transformToOptions(languageProfiencyOptions)}
					width={262}
					labelFontSize={16}
					label="Владение иностранными языками"
					placeholder="Владение иностранными языками"
					onBlur={handleBlur}
					onChange={handleChange}
				/> */}
				<InputMultiSelect
					name="languageProfiency"
					selectedValues={
						formData?.languageProfiency?.map((item) =>
							typeof item === 'string' ? item : item.value,
						) ?? []
					}
					options={transformToOptions(languageProfiencyOptions)}
					label="Владение иностранными языками"
					placeholder="Владение иностранными языками"
					// onBlur={handleBlur}
					onChange={handleChangeSelectMulti}
				/>

				<div className="w-full" />
			</div>
		</div>
	);
};

export default MainInfo;
