"use client";
import { ChangeEvent, useState } from "react";
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
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [isThirdPage, setIsThirdPage] = useState(false);
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; email?: string }>({
        password: '',
        confirmPassword: '',
        email: ""
    });

    const handleChangeForm = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;
        
        let newValue: string | File | Date = value;
        
        if (type === "date") {
            newValue = new Date(value);
        } else if (type === "file" && files) {
            newValue = files[0];
        }
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    }

    const validate = () => {
        const newErrors: { email?: string, password?: string, confirmPassword?: string} = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Некорректный email";
        }
        if (formData.password.length < 6) {
            newErrors.password = "Пароль должен содержать минимум 6 символов";
        }
        if (formData.confirmPassword.length < 6){
            newErrors.confirmPassword = "Пароль должен содержать минимум 6 символов";
        }
        if (formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Пароли не совпадают";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };    

    const handleSubmitForm1 = (event: React.FormEvent) => {
        event.preventDefault();
        if (validate()) {
            console.log(formData)
            setIsFirstPage(false);
            setIsSecondPage(true);
        }
    };     

    const handleSubmitForm2 = (event: React.FormEvent) => {
        event.preventDefault();
        if (validate()) {
            console.log(formData)
            setIsSecondPage(false);
            setIsThirdPage(true);
        }
    };  

    const handleBackForm2 = () => {
        setIsSecondPage(false);
        setIsFirstPage(true);
    }

    const handleSubmitForm3 = (event: React.FormEvent) => {
        event.preventDefault();
        if (validate()){
            console.log(formData);
        }
    }
    const handleBackForm3 = () => {
        setIsThirdPage(false);
        setIsSecondPage(true);
    }

    return(
        <>
        {isFirstPage && <RegForm1 handleChange={handleChangeForm} onClick={handleSubmitForm1} formData={formData}/>} 
        {isSecondPage && <RegForm2 handleChange={handleChangeForm} formData={formData} onClick={handleSubmitForm2} onBack={handleBackForm2}/>}   
        {isThirdPage && <RegForm3 handleChange={handleChangeForm} formData={formData} onClick={handleSubmitForm3} onBack={handleBackForm3}/>}
        </>
    )
}