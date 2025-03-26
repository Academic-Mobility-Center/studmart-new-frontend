import React from "react";

interface ForgotPasswordEmailProps {
    onClose: () => void;
}

const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-[5px] z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Сброс пароля</h2>
                <p className="text-sm text-[#032c28] mt-2">Почта от личного кабинета вуза</p>
                <input
                    className="w-full border border-gray-300 p-2 rounded-2xl mt-2"
                    type="email"
                    placeholder="Введите почту"
                />
                <button className="w-full bg-[#8fe248] text-[#032c28] p-2 rounded-2xl mt-4">
                    Отправить
                </button>
                <button
                    className="mt-2 text-sm text-[#888888] underline block mx-auto"
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default ForgotPasswordEmail;