"use client";

import PasswordField from "@/components/fields/password/PasswordField";
interface ForgotPasswordConfirmProps {
    onClose: () => void;
    onClick: () => void;
}
const ForgotPasswordConfirm: React.FC<ForgotPasswordConfirmProps> = ({ onClose, onClick }) =>{
    return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-[5px] z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Сброс пароля</h2>
                <PasswordField label="Введите новый пароль" placeholder="********"/>
                <PasswordField label="Подтвердите новый пароль" placeholder="********"/>
                <button className="w-full bg-[#8fe248] text-[#032c28] p-2 rounded-2xl mt-4" onClick={onClick}>
                    Сохранить
                </button>
                <button
                    className="mt-2 text-sm text-[#888888] underline block mx-auto"
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </div>
    )
}

export default ForgotPasswordConfirm;
