"use client";

import { useState } from "react";
import NextImage from "next/image";
export default function PasswordField({
  label, 
  placeholder,
  name,
  value,
  onChange,
  width,
  labelFontSize,
  onBlur,
  disabled = false
}: {
  label: string, 
  placeholder: string,
  name?: string,
  value?: string,
  width: number,
  labelFontSize: number;
  onChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;

}){
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div className="flex flex-col gap-2 relative" style={{width: `${width}px`}}>
        <label className="text-[#032c28]" style={{fontSize: `${labelFontSize}px`}}>{label}</label>
        <div className="relative">
          <input
            className="flex items-center leading-none border 
            border-gray-300 p-2 pl-6 rounded-2xl pr-10 focus:outline-none 
            text-[#032c28] placeholder:text-[#888888] h-[48px] w-full text-base bg-white"
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="off"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            onBlur={onBlur}
            disabled={disabled}
          />
          <button
            type="button"
            className="absolute right-6 top-1/2 transform -translate-y-1/2 focus:outline-none"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          > 
            {!disabled &&  <NextImage
              src={isPasswordVisible ? "/icons/auth/open-eye.svg" : "/icons/auth/closed-eye.svg"}
              alt="Toggle Password Visibility"
              width={24}
              height={24}
            />}
           
          </button>
        </div>
      </div>
    );
}

