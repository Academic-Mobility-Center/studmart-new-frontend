"use client";
import { ChangeEvent, useState } from "react";
import InputField from "../fields/input/InputField";
import PasswordField from "../fields/password/PasswordField";
import RegForm1 from "../forms/reg-form-1/RegForm1";
import RegForm2 from "../forms/reg-form-2/RegForm2";
import RegForm3 from "../forms/reg-form-3/RegForm3";
import RegistrationFormData from "@/types/RegistrationFormData";


export default function RegistraionForm(){
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        promocode: "",
        name: "",
        fullname: "",
        gender: "man",
        date: null,
        university: "",
        profession: "",
        course: "",
        file: null
    })
    const [isFirstPage, setIsFirstPage] = useState(false);
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [isThirdPage, setIsThirdPage] = useState(true);
    const handleChangeForm1 = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:  value,
        }));
      };  
    // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     const { name, value, type, checked, files } = event.target;
      
    //     setFormData((prevData) => {
    //       let newValue: any;
      
    //       switch (name) {
    //         case "gender":
    //           newValue = value as "man" | "woman";
    //           break;
    //         case "date":
    //           newValue = value ? new Date(value) : null;
    //           break;
    //         case "file":
    //           newValue = files ? files[0] : null;
    //           break;
    //         default:
    //           newValue = type === "checkbox" ? checked : value;
    //       }
      
    //       return {
    //         ...prevData,
    //         [name]: newValue,
    //       };
    //     });
    //   };    
    return(
        <div className="border bg-[#f8f8f8] 
            flex flex-col gap-5 w-[410px] 
            self-center p-[30px] rounded-[30px] 
            border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
         >
            {isFirstPage && <RegForm1 formData={formData} handleChange={handleChangeForm1} onClose={() => {}} onClick={() => {}}/>}
            {isSecondPage && <RegForm2/>}
            {isThirdPage && <RegForm3/>}
        </div>
    )
}