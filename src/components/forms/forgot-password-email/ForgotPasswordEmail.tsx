import InputField from "@/components/fields/input/InputField";
import LoginFormData from "@/types/LoginFormData";
import React, { ChangeEvent, useState, useEffect, useRef } from "react";

interface ForgotPasswordEmailProps {
    onClose: () => void;
    onClick: () => void;
    formData: LoginFormData;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({
    onClose,
    onClick,
    handleChange,
    formData
}) => {
    const [errors, setErrors] = useState<{ passwordResetEmail?: string }>({});
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const validate = () => {
        const newErrors: { passwordResetEmail?: string } = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.passwordResetEmail)) {
            newErrors.passwordResetEmail = "Некорректный email";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onClick();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-[5px] z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Сброс пароля</h2>
                <div className="flex flex-col gap-1">
                    <InputField
                        label="Почта от личного кабинета вуза"
                        placeholder="Введите почту"
                        name="passwordResetEmail"
                        value={formData.passwordResetEmail}
                        onChange={handleChange}
                        width={350}
                        labelFontSize={14}                        
                    />
                    {errors.passwordResetEmail && (
                        <p className="text-red-600 text-sm font-medium mt-1">{errors.passwordResetEmail}</p>
                    )}
                </div>
                <button type="button" className="w-full bg-[#8fe248] text-[#032c28] p-2 rounded-2xl mt-4" onClick={handleSubmit}>
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordEmail;
