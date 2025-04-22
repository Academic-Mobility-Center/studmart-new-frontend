"use client";
import { useState } from "react";
import RegForm1 from "../forms/reg-form-1/RegForm1";
import RegForm2 from "../forms/reg-form-2/RegForm2";
import RegForm3 from "../forms/reg-form-3/RegForm3";
import RegistrationFormData from "@/types/RegistrationFormData";
import { Option } from "@/types/Option";
const genderOptions = [
    { id: 1, name: "Мужской" },
    { id: 2, name: "Женский" },
];
const univercityOptions = [
    { id: 1, name: "НГТУ" },
    { id: 3, name: "НГУ" },
    { id: 5, name: "ТГУ" },
];
const courceOptions = [
    { id: 1, name: "Первый" },
    { id: 2, name: "Второй" },
    { id: 123, name: "Третий" },
];
export default function RegistraionForm(){
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        promocode: "",
        name: "",
        fullname: "",
        gender: null,
        date: null,
        university: null,
        profession: "",
        course: null,
        file: null
    })
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [isThirdPage, setIsThirdPage] = useState(false);
    const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        
        let newValue: string | File | Date | Option | null = value;
    
        if (type === "date") {
            newValue = new Date(value);
        } else if (type === "file") {
            const input = event.target as HTMLInputElement;
            newValue = input.files?.[0] || null;
        }
    
        if (name === "gender") {
            const selectedGender = genderOptions.find(option => option.id.toString() === value);
            newValue = selectedGender
                ? { value: selectedGender.id.toString(), label: selectedGender.name }
                : null;
        }
    
        if (name === "course") {
            const selectedCourse = courceOptions.find(option => option.id.toString() === value);
            newValue = selectedCourse
                ? { value: selectedCourse.id.toString(), label: selectedCourse.name }
                : null;
        }
    
        if (name === "university") {
            const selectedUnivercity = univercityOptions.find(option => option.id.toString() === value);
            newValue = selectedUnivercity
                ? { value: selectedUnivercity.id.toString(), label: selectedUnivercity.name }
                : null;
        }
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    }
     

    const handleSubmitForm1 = (event: React.FormEvent) => {
        event.preventDefault();
        setIsFirstPage(false);
        setIsSecondPage(true);
    };     

    const handleSubmitForm2 = (event: React.FormEvent) => {
        console.log(formData)
        event.preventDefault();
        setIsSecondPage(false);
        setIsThirdPage(true);
    };  

    const handleBackForm2 = () => {
        setIsSecondPage(false);
        setIsFirstPage(true);
    }

    const handleSubmitForm3 = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);
    }
    const handleBackForm3 = () => {
        setIsThirdPage(false);
        setIsSecondPage(true);
    }

    return(
        <>
            {isFirstPage && <RegForm1 
                handleChange={handleChangeForm} 
                onClick={handleSubmitForm1} 
                formData={formData}
                />} 
            {isSecondPage && <RegForm2 handleChange={handleChangeForm} formData={formData} onClick={handleSubmitForm2} onBack={handleBackForm2}/>}   
            {isThirdPage && <RegForm3 handleChange={handleChangeForm} formData={formData} onClick={handleSubmitForm3} onBack={handleBackForm3}/>}
        </>
    )
}