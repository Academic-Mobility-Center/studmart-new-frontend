import InputField from "@/components/fields/input/InputField";
import PasswordField from "@/components/fields/password/PasswordField";
import RegFormProps from "@/types/RegFormProps";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const RegForm1: React.FC<RegFormProps> = ({
    onClick,
    formData,
    handleChange,
    onChange
}) => {

    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; email?: string }>({
        password: '',
        confirmPassword: '',
        email: ""
    });
    
    const validate = () => {
        const newErrors: { email?: string, password?: string, confirmPassword?: string} = {};

        if (!formData?.email){
            newErrors.email = "Введите email";
        }
        if (!formData?.password){
            newErrors.password = "Введите пароль";
        }
        if (!formData?.confirmPassword){
            newErrors.password = "Подтвердите пароль"
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Некорректный email";
        }
        if (formData.password.length < 6) {
            newErrors.password = "Пароль должен содержать минимум 6 символов";
        }
        if (formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Пароли не совпадают";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };    

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validate()){
            console.log("Форма отправлена, вызываем onClick");
            onClick(event);
        }
    };
     
    return (
        <>
        <form 
            onSubmit={handleSubmit}
            className="border bg-[#f8f8f8] 
            flex flex-col gap-5 w-[410px] 
            self-center p-[30px] rounded-[30px] 
            border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
         >
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
                <h2 className="text-2xl font-extrabold text-[#032c28]">1/3</h2>
            </div>
            <div className="flex flex-col gap-1">
                <InputField 
                    label="Почта" 
                    placeholder="Example@gmail.com" 
                    onChange={handleChange} 
                    name="email" 
                    value={formData.email}
                    autoComplete="off"
                />
                {errors.email && <p className="text-red-600 text-sm font-medium mt-1">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <PasswordField 
                    label="Пароль" 
                    placeholder="********" 
                    onChange={handleChange} 
                    name="password" 
                    value={formData.password}
                />
                {errors.password && <p className="text-red-600 text-sm font-medium mt-1">{errors.password}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <PasswordField 
                    label="Повторите пароль" 
                    placeholder="********" 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={formData.confirmPassword}
                />
                {errors.confirmPassword && <p className="text-red-600 text-sm font-medium mt-1">{errors.confirmPassword}</p>}
            </div>

            <InputField 
                label="Есть промокод?" 
                placeholder="Hhufs8a7auh40egij"
            />
    
            <div className="flex flex-col gap-4">
                <button type="submit"
                    className="bg-[#8fe248] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl"
                >Далее</button>
                <p className="text-sm font-bold text-[#032c28] text-center">
                    Уже есть аккаунт? 
                    <Link href="/login" className="text-[#6dbc29] underline pl-2">Войти</Link>
                </p>
            </div>              
        </form>    
        </>
    )
}

export default RegForm1;