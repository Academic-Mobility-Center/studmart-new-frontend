import { Option } from "./Option";

export default interface RegistrationFormData{
    email: string;
    password: string;
    confirmPassword: string;
    promocode: string;
    name: string;
    fullname: string;
    gender: Option | undefined;
    date: Date | null;
    university: Option | undefined;
    profession: string;
    course: Option | undefined;
    file: File | null;
}