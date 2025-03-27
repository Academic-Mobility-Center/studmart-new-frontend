"use client";

import { useState } from "react";
import NextImage from "next/image";

export default function PasswordField({label, placeholder}: {label: string, placeholder: string}){
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