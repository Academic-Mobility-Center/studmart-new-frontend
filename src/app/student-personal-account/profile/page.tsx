"use client";
import LoginInfo from '@/components/forms/student-profile-elements/login-info/LoginInfo';
import MainInfo from '@/components/forms/student-profile-elements/main-info/MainInfo';
import UniversityInfo from '@/components/forms/student-profile-elements/university-info/UniversityInfo';
import { StudentFormData } from '@/types/StudentProfileData';
import { Button } from '@mui/base';
import React, { ChangeEvent, useState } from 'react';
const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";
import { 
    regionOptions as newRegionOptions, 
    cityOptions as newCityOptions,
    universityOptions as newUniversityOptions
} from '@/app/partner-personal-account/statistics/context';
import { courseOptions, familyStatusOptions, genderOptions, isWorkOptions, languageProfiencyOptions, validateField } from '../context';

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
    
        if (name === "gender") {
            const selectedIndustry = genderOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
        }

        if (name === "region") {
            const selectedRegion = newRegionOptions.find(option => option.id.toString() === value);
            newValue = selectedRegion
                ? { value: selectedRegion.id.toString(), label: selectedRegion.name }
                : undefined;
            if (formData.region?.value !== newValue?.value){
                setFormData((prevData) => ({
                    ...prevData,
                    region: newValue,
                    city: undefined,
                    university: undefined
                }));
                return;
            }

        }
        
        
        if (name === "city") {
            const selectedIndustry = newCityOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
        }

        if (name === "familyStatus") {
            const selectedIndustry = familyStatusOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
        }

        if (name === "isWork") {
            const selectedIndustry = isWorkOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
        }

        if (name === "languageProfiency") {
            const selectedIndustry = languageProfiencyOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
        }

        if (name === "university") {
            const selectedIndustry = newUniversityOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
        }

        if (name === "course") {
            const selectedIndustry = courseOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
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

        let hasErrors = false;
        const newErrors: Partial<typeof errors> = {};
        
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value, formData);
            if (error) {
                (newErrors as any)[key] = error;
                hasErrors = true;
            }
        });
        
        setErrors({ ...errors, ...newErrors });
    
        if (hasErrors) return;
    
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
                        genderOptions={genderOptions}
                        familyStatusOptions={familyStatusOptions}
                        isWorkOptions={isWorkOptions}
                        languageProfiencyOptions={languageProfiencyOptions}
                        newCityOptions={newCityOptions}
                        newRegionOptions={newRegionOptions}
                    />
                    <UniversityInfo
                        formData={formData}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        errors={errors}
                        courseOptions={courseOptions}
                        newUniversityOptions={newUniversityOptions}
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


