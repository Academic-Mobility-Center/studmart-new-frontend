"use client";
import CompanyInfo from '@/components/forms/partner-profile-elements/company-info/CompanyInfo';
import PaymentInfo from '@/components/forms/partner-profile-elements/payment-info/PaymentInfo';
import LoginInfo from '@/components/forms/student-profile-elements/login-info/LoginInfo';
import { PartnerPersonalAccountFormData } from '@/types/PartnerPesonalAccount';
import { StudentFormData } from '@/types/StudentProfileData';
import { transformToOption, transformToOptions } from '@/utils/dataTransform';
import { Button } from '@mui/base';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";

const industryOptions = [
    { id: 1, name: "ИТ-услуги" },
    { id: 2, name: "Финансы" },
];

const countryOptions = [
    { id: 1, name: "Россия" },
    { id: 2, name: "США" },
    { id: 3, name: "ОАЭ" },
];

const regionOptions = [
    { id: 1, name: "НСК" },
    { id: 2, name: "СПБ" },
    { id: 3, name: "МСК" },
    { id: 4, name: "ЕКБ" },
];

const regionsValues = [
    { name: "НСК", id: 1 },
    { name: "СПБ", id: 2 },
]
const industry = { id: 1, name: "ИТ-услуги" }
const country ={ id: 1, name: "Россия" }

const validateField = (
    name: string,
    value: string | boolean | string[],
    fullFormData: StudentFormData
): string | string[] | undefined => {
    switch (name) {
        case "email":
            return /^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/.test(value as string)
                ? undefined : "Некорректный email";
        case "password":
            return (value as string).length >= 6 ? undefined : "Пароль должен содержать минимум 6 символов";            
                
        default:
            return undefined;
    }
};


const ProfilePage: React.FC = () => {

    const regions = transformToOptions(regionsValues)
    const industryValue = transformToOption(industry)
    const countryValue = transformToOption(country)
    const [formData, setFormData] = useState<StudentFormData>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        date: null,
        gender: undefined,
        region: undefined,
        city: undefined,
        familyStatus: undefined,
        isWork: undefined,
        languageProfiency: undefined,
        university: undefined,
        profession: "",
        course: undefined
    });

    const [errors, setErrors] = useState<{ 
        email?: string; 
        password?: string; 
        firstName?: string 
        lastName?: string;
        date: null;
        gender: undefined,
        region: undefined,
        city: undefined,
        familyStatus: undefined,
        isWork: undefined,
        languageProfiency: undefined,
        university: undefined,
        profession: "",
        course: undefined    
    }>({
        email: '',
        password: '',
        firstName: "",
        lastName: "",
        date: null,
        gender: undefined,
        region: undefined,
        city: undefined,
        familyStatus: undefined,
        isWork: undefined,
        languageProfiency: undefined,
        university: undefined,
        profession: "",
        course: undefined
    });

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = event.target as HTMLInputElement;
        const newValue = type === 'checkbox' || type === 'radio' ? checked : value;
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, newValue, {
                ...formData,
                [name]: newValue,
            }),
        }));
    };    


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;
    
        let newValue: string | File | Date | any = value;
    
        if (type === "date") {
            newValue = new Date(value);
        } else if (type === "file" && files) {
            newValue = files[0];
        }
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, newValue, {
                ...formData,
                [name]: newValue,
            }),
        }));
    };
    

    const handleSubmitForm = (event: React.FormEvent) => {
        console.log("Отправка формы:", formData); 
        event.preventDefault();

        // let hasErrors = false;
        // const newErrors: typeof errors = {};
    
        // Object.entries(formData).forEach(([key, value]) => {
        //     const error = validateField(key, value, formData);
        //     if (error) {
        //         (newErrors as any)[key] = error;
        //         hasErrors = true;
        //     }
        // });
    
        // setErrors(newErrors);
    
        // if (hasErrors) return;
    
        console.log("Отправка формы:", formData);     
    };    

    return (
        <>
        <form onSubmit={handleSubmitForm} className={profileCardClasses}>
            <div className="grow-0 shrink-0 basis-auto">
                <h3 className={profileTitleClasses}>Личная информация</h3>
                <div className="mt-5">
                    <LoginInfo
                        formData={formData}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                    />
                </div>
            </div>   
            <Button type="submit" className={saveButtonClasses}>
                Сохранить
            </Button>
        </form>   
        </>
    );
};

export default ProfilePage;


