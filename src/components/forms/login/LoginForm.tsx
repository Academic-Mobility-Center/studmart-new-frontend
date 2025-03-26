"use client"
import { useState } from "react";
import NextImage from "next/image";
import ForgotPasswordEmail from "../forgot-password-email/ForgotPasswordEmail";
export default function LoginForm() {
    const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
    const handleForgotPasswordClick = () => {
      setIsPasswordResetVisible(true);
    };
  
    const handleClosePasswordReset = () => {
      setIsPasswordResetVisible(false);
    };
    return (
      <div className="border bg-[#f8f8f8] 
          flex flex-col gap-5 w-[410px] 
          self-center p-[30px] rounded-[30px] 
          border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
      >
        <h2 className="text-2xl font-extrabold text-[#032c28]">Вход</h2>
  
        <InputField label="Почта" placeholder="Example@gmail.com"/>
        <PasswordField label="Пароль" placeholder="********"/>
        
        <p 
          className="text-sm text-[#888888] underline self-end "
          onClick={handleForgotPasswordClick}
        >Забыли пароль?</p>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-[rgba(0,0,0,0.20)]"></div>
          <p className="text-sm text-[#032c28]">Запомнить меня</p>
        </div>
  
        <div className="flex flex-col gap-4">
          <button className="bg-[#6dbc29] text-white p-2 rounded-2xl hover:bg-[#5b9e26]">Войти</button>
          <p className="text-sm font-bold text-[#6dbc29] text-center">
            Еще нет аккаунта? <span className="underline">Зарегистрироваться</span>
          </p>
        </div>
        {isPasswordResetVisible && <ForgotPasswordEmail onClose={() => setIsPasswordResetVisible(false)} />}
      </div>
    );
  }
  
  function InputField({ label, placeholder }: { label: string, placeholder: string }) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <input 
          className="border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28] placeholder:text-[#888888]" 
          type="text" 
          placeholder={placeholder}
          
        />
      </div>
    );
  }

  function PasswordField({label, placeholder}: {label: string, placeholder: string}){
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div className="flex flex-col gap-2 w-[350px] relative">
        <label className="text-sm text-[#032c28]">{label}</label>
        <input
          className="border border-gray-300 p-2 rounded-2xl pr-10 focus:outline-none text-[#032c28] placeholder:text-[#888888]"
          type={isPasswordVisible ? "text" : "password"}
          autoComplete="off"
          placeholder={placeholder}
        />
        <button
          type="button"
          className="absolute right-3 top-[35px] focus:outline-none"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <NextImage
            src={isPasswordVisible ? "/icons/auth/open-eye.svg" : "/icons/Header/account.svg"}
            alt="Toggle Password Visibility"
            width={24}
            height={24}
          />
        </button>
      </div>
    );
  }
  