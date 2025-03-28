import PasswordField from "@/components/fields/password/PasswordField";
import LoginFormData from "@/types/LoginFormData";
import React, { ChangeEvent, useState, useEffect, useRef } from "react";

interface ForgotPasswordConfirmProps {
    onClick: () => void;
    formData: LoginFormData;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const ForgotPasswordConfirm: React.FC<ForgotPasswordConfirmProps> = ({ 
    onClick,
    formData,
    handleChange
 }) =>{
    const [errors, setErrors] = useState<{ passwordReset?: string; passwordResetConfirm?: string }>({
        passwordReset: '',
        passwordResetConfirm: '',
    });

    const validate = () => {
        const newErrors: { passwordReset?: string, passwordResetConfirm?: string } = {};

        if (formData.passwordReset.length < 6) {
            newErrors.passwordReset = "Пароль должен содержать минимум 6 символов";
        }
        if (formData.passwordResetConfirm.length < 6) {
            newErrors.passwordResetConfirm = "Пароль должен содержать минимум 6 символов";
        }
        if (formData.passwordReset !== formData.passwordResetConfirm) {
            newErrors.passwordResetConfirm = "Пароли не совпадают";
        }        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onClick();
        }
    };

    return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-[5px] z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Сброс пароля</h2>
                <PasswordField 
                    label="Введите новый пароль" 
                    placeholder="********"
                    name="passwordReset"
                    value={formData.passwordReset}
                    onChange={handleChange}                    
                />
                    {errors?.passwordReset && (
                        <p className="text-red-600 text-sm font-medium mt-1">{errors.passwordReset}</p>
                    )}                
                <PasswordField 
                    label="Подтвердите новый пароль" 
                    placeholder="********"
                    name="passwordResetConfirm"
                    value={formData.passwordResetConfirm}
                    onChange={handleChange}                      
                />
                {errors?.passwordResetConfirm && (
                        <p className="text-red-600 text-sm font-medium mt-1">{errors.passwordResetConfirm}</p>
                )} 
                <button className="w-full bg-[#8fe248] text-[#032c28] p-2 rounded-2xl mt-4" onClick={handleSubmit}>
                    Сохранить
                </button>
            </div>
        </div>
    )
}

export default ForgotPasswordConfirm;
