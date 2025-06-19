import InputSelectField from '@/components/ui/inputs/InputSelectField';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { transformToOptions } from '@/utils/dataTransform';

import { SelectOption } from '@/types/SelectOption';
import { StudentFormData } from '@/types/StudentProfileData';
import University from '@/types/University';

import styles from './UniversityInfo.module.css';

interface Props {
	formData: StudentFormData | null;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	errors: {
		university: string;
		profession: string;
		course: string;
	};
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	courseOptions: SelectOption[];
	newUniversityOptions: University[];
}

const UniversityInfo: React.FC<Props> = ({
	formData,
	handleBlur,
	handleChange,
	courseOptions,
	errors,
	newUniversityOptions,
}) => {
	const filteredUniversityOptions = formData?.region
		? newUniversityOptions.filter((u) => u.city.region.id.toString() === formData.region?.value)
		: newUniversityOptions;

	return (
		<div className={styles.form}>
			<h2 className={styles['section-title']}>Информация об образовательном учреждении</h2>

			<div className={styles['fields-row']}>
				<InputSelectField
					name="university"
					label="Университет"
					placeholder="Университет"
					value={formData?.university}
					onChange={handleChange}
					onBlur={handleBlur}
					options={transformToOptions(filteredUniversityOptions)}
					errorText={errors.university}
				/>
				<InputTextField
					name="profession"
					label="Специальность"
					placeholder="Специальность"
					value={formData?.profession}
					onChange={handleChange}
					onBlur={handleBlur}
					errorText={errors.profession}
				/>
			</div>
			<div className={styles['single-field']}>
				<InputSelectField
					name="course"
					label="Курс"
					placeholder="Курс"
					value={formData?.course}
					onChange={handleChange}
					onBlur={handleBlur}
					options={transformToOptions(courseOptions)}
					errorText={errors.course}
				/>
			</div>
		</div>
	);
};

export default UniversityInfo;
