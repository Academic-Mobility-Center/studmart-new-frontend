import InputField from "@/components/fields/input/InputField";
import PasswordField from "@/components/fields/password/PasswordField";
import RegistrationFormData from "@/types/RegistrationFormData";
import React, { ChangeEvent, useState } from "react";

interface RegForm1Props{
    onClose: () => void;
    onClick: () => void;
    formData: RegistrationFormData;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RegForm1: React.FC<RegForm1Props> = ({
    onClose,
    onClick,
    formData,
    handleChange
}) => {

    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; email?: string }>({
        password: '',
        confirmPassword: '',
        email: ""
    });
    
    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Некорректный email";
        }
        if (formData.password.length < 6) {
            newErrors.password = "Пароль должен содержать минимум 6 символов";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        };    
    
        const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData)
        if (validate()) {
            console.log("Форма отправлена", formData);
        }
        };        
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
                <h2 className="text-2xl font-extrabold text-[#032c28]">1/3</h2>
            </div>

            <InputField label="Почта" placeholder="Example@gmail.com"/>
            <PasswordField label="Пароль" placeholder="********"/>
            <PasswordField label="Повторите пароль" placeholder="********"/>
            <InputField label="Есть промокод?" placeholder="Hhufs8a7auh40egij"/>
    
            <div className="flex flex-col gap-4">
                <button className="bg-[#8fe248] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl">Далее</button>
                <p className="text-sm font-bold text-[#032c28] text-center">
                    Уже есть аккаунт? <span className="text-[#6dbc29] underline">Войти</span>
                </p>
            </div>    
        </>
    )
}

export default RegForm1;