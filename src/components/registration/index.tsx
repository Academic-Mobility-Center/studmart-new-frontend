"use client";
import { useState } from "react";
import InputField from "../fields/input/InputField";
import PasswordField from "../fields/password/PasswordField";
import RegForm1 from "../forms/reg-form-1/RegForm1";
import RegForm2 from "../forms/reg-form-2/RegForm2";
import RegForm3 from "../forms/reg-form-3/RegForm3";


export default function RegistraionForm(){
    const [isFirstPage, setIsFirstPage] = useState(false);
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [isThirdPage, setIsThirdPage] = useState(true);
    return(
        <div className="border bg-[#f8f8f8] 
            flex flex-col gap-5 w-[410px] 
            self-center p-[30px] rounded-[30px] 
            border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
         >
            {isFirstPage && <RegForm1/>}
            {isSecondPage && <RegForm2/>}
            {isThirdPage && <RegForm3/>}
        </div>
    )
}