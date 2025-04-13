"use client";
import LoginInfo from '@/components/forms/student-profile-elements/login-info/LoginInfo';
import MainInfo from '@/components/forms/student-profile-elements/main-info/MainInfo';
import UniversityInfo from '@/components/forms/student-profile-elements/university-info/UniversityInfo';
import { StudentFormData } from '@/types/StudentProfileData';
import { transformToOption, transformToOptions } from '@/utils/dataTransform';
import { Button } from '@mui/base';
import React, { ChangeEvent, useState } from 'react';
const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";

const regionOptions = [
    { id: 1, name: "НСК" },
    { id: 2, name: "СПБ" },
    { id: 3, name: "МСК" },
    { id: 4, name: "ЕКБ" },
];

const cityOptions = [
    { name: "НСК", id: 1 },
    { name: "СПБ", id: 2 },
]

const genderOptions= [
    {id: 1, name: "Мужской"},
    {id: 2, name: "Женский"}
]

const familyStatusOptions = [
    {id: 1, name: "Состоит в браке"},
    {id: 2, name: "Не состоит в браке" }
]

const isWorkOptions = [
    {id: 1, name: "Не работает"},
    {id: 2, name: "Работает"}
]

const languageProfiencyOptions = [
    {id: 1, name: "A уровень"},
    {id: 2, name: "B уровень"}
]

const universityOptions = [
    {id: 1, name: "НГТУ"},
    {id: 2, name: "НГУ"}
]

const courseOptions = [
    {id: 1, name: "1"},
    {id: 2, name: "2"},
    {id: 3, name: "3"}
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
        email: string; 
        password: string; 
        firstName: string;
        lastName: string;
        date: undefined;
        gender: string[];
        region: string[];
        city: string[];
        familyStatus: string[];
        isWork: string[];
        languageProfiency: string[];
        university: string[];
        profession: string,
        course: string[]
    }>({
        email: '',
        password: '',
        firstName: "",
        lastName: "",
        date: undefined,
        gender: [],
        region: [],
        city: [],
        familyStatus: [],
        isWork: [],
        languageProfiency: [],
        university: [],
        profession: "",
        course: []
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
                    <MainInfo
                        formData={formData}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        regionOptions={regionOptions}
                        genderOptions={genderOptions}
                        cityOptions={cityOptions}
                        familyStatusOptions={familyStatusOptions}
                        isWorkOptions={isWorkOptions}
                        languageProfiencyOptions={languageProfiencyOptions}
                    />
                    <UniversityInfo
                        formData={formData}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        errors={errors}
                        universityOptions={universityOptions}
                        courseOptions={courseOptions}
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


