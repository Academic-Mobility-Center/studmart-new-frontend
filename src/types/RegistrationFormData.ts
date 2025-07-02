import { Option } from './Option';

export default interface RegistrationFormData {
	email: string;
	password: string;
	confirmPassword: string;
	promocode: string;
	name: string;
	fullname: string;
	gender: Option | null;
	date: Date | null;
	university: Option | null;
	profession: string;
	course: Option | null;
	file: File | null;
	sex: boolean;
	needFile: boolean;
	consent?: boolean;
}
