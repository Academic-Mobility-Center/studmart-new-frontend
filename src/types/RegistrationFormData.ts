export default interface RegistrationFormData{
    email: string;
    password: string;
    confirmPassword: string;
    promocode: string;
    name: string;
    fullname: string;
    gender: "man" | "woman";
    date: Date | null;
    university: string;
    profession: string;
    course: string;
    file: File | null;
}