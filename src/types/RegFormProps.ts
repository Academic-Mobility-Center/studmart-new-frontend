import { ChangeEvent } from 'react';

import RegistrationFormData from './RegistrationFormData';

export type FormDataType = {
	[key: string]: string | File;
};
export type FormEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default interface RegFormProps {
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
	validate?: () => boolean;
}
