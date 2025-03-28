"use client";

import { useState } from "react";
import NextImage from "next/image";

export default function PasswordField({
  label, 
  placeholder,
  name,
  value,
  onChange 
}: {
  label: string, 
  placeholder: string,
  name?: string,
  value?: string,
  onChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
}){
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div className="flex flex-col gap-2 w-[350px] relative">
        <label className="text-sm text-[#032c28]">{label}</label>
        <div className="relative">
          <input
            className="flex items-center leading-none border border-gray-300 p-2 pl-6 rounded-2xl pr-10 focus:outline-none text-[#032c28] placeholder:text-[#888888] h-[48px] w-full text-base"
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="off"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
          />
          <button
            type="button"
            className="absolute right-6 top-1/2 transform -translate-y-1/2 focus:outline-none"
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
      </div>
    );
}

