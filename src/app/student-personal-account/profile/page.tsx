"use client";
import LoginInfo from '@/components/forms/student-profile-elements/login-info/LoginInfo';
import MainInfo from '@/components/forms/student-profile-elements/main-info/MainInfo';
import UniversityInfo from '@/components/forms/student-profile-elements/university-info/UniversityInfo';
import { StudentFormData } from '@/types/StudentProfileData';
import { Button } from '@mui/base';
import City from "@/types/Cities";
import React, { useEffect, useState } from 'react';
import ForgotPasswordEmail from "@/components/forms/forgot-password-email/ForgotPasswordEmail";
const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";

import University from "@/types/University"
import IStudentFormData, { 
    courseOptions, 
    familyStatusOptions, 
    genderOptions, 
    isWorkOptions, 
    validateField, 
} from '../context';
import { Option } from '@/types/Option';
import { 
    getStudentById, 
    getStudentCourses, 
    getStudentCities, 
    getStudentUniversities,
    getLanguages,
    updateStudent
} from '@/lib/api/students';
import LoginFormData from "@/types/LoginFormData";
import {getPartnerRegions} from '@/lib/api/partners';
import { transformToOption, transformToOptions } from '@/utils/dataTransform';
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import StudentPutData from "@/types/StudentPutData"
const ProfilePage: React.FC = () => {
    const { role, id ,isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (role && role !== "Student") {
            router.replace("/partner-personal-account");
        }
    }, [role, router]);
    const [fetchStudent, setFetchStudent] = useState<IStudentFormData | null>(null)
    const [fetchCourses, setFetchCourses] = useState<{
        id: number;
        name: string;
    }[]>(courseOptions)
    const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
    const [fetchUniversities, setFetchUniversities] = useState<University[]>([])
    const [fetchCities, setFetchCities] = useState<City[]>([]);
    const [regions, setRegions] = useState<{id: number, name: string}[]>([]);
    const [languages, setLanguages] = useState<{id: number, name: string}[]>([])
    const [formData, setFormData] = useState<StudentFormData>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        date: undefined,
        gender: undefined,
        region: undefined,
        city: undefined,
        familyStatus: undefined,
        isWork: undefined,
        languageProfiency: undefined,
        university: undefined,
        profession: '',
        course: undefined,
      });
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const student = await getStudentById(id ?? "");
                if (student) {
                    setFetchStudent(student);
                }
            } catch (e:unknown ) {
                const error = e as { response?: { status: number } };
                if (error?.response?.status === 400) {
                    console.warn("Ошибка 400 при загрузке студентов:", e);
                } else {
                    console.error("Ошибка при загрузке студентов:", e);
                }
                return;
            }
            try{
                const universities = await getStudentUniversities();
                setFetchUniversities(universities)
            } catch (error){
                console.warn(error)
            }
            try{
                const fetchLanguages = await getLanguages();
                setLanguages(fetchLanguages)
            }catch (error){
                console.warn(error)
            }
            try{
                const courses = await getStudentCourses();
                setFetchCourses(courses)
            } catch (error){
                console.warn(error)
            }
            try{
                const cities = await getStudentCities();
                setFetchCities(cities)
            } catch (error){
                console.warn(error)
            }
            try{
                const regions = await getPartnerRegions();
                setRegions(regions)
            } catch (error){
                console.warn(error)
            }
        };
        if (id){
            fetchData();
        }
    }, [id]);
    useEffect(() => {
        if (!fetchStudent) return;
        const genderOption = !fetchStudent?.sex ? { id: 2, name: "Женский" } : { id: 1, name: "Мужской" };
        const workOptions = fetchStudent?.hasWork ? {id: 1, name: "Работает"} : {id:2, name: "Не работает"}
        const familyStatusOption = familyStatusOptions.find((item) => item.id === fetchStudent.status)
        setFormData({
            email: fetchStudent?.email,
            password: "",
            firstName: fetchStudent?.firstName,
            lastName: fetchStudent?.lastName,
            date: new Date(fetchStudent.birthDate),
            gender: transformToOption(genderOption),
            region: fetchStudent?.region ? transformToOption(fetchStudent?.region) : undefined,
            city: fetchStudent?.city ? transformToOption(fetchStudent?.city)  : undefined,
            familyStatus: familyStatusOption ? transformToOption(familyStatusOption) : undefined,
            isWork: transformToOption(workOptions),
            languageProfiency: fetchStudent?.languages ? transformToOptions(fetchStudent?.languages) : undefined,
            university: transformToOption(fetchStudent?.university)  ?? undefined,
            profession: fetchStudent?.specialisation,
            course: transformToOption(fetchStudent.course) ?? undefined
        });
    }, [fetchStudent]);    
    
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
    
    const handleBlur = (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = event.target as HTMLInputElement;
    
        const newValue = type === 'checkbox' || type === 'radio' ? checked : value;
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, newValue),
        }));
    };
    

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, files, checked } = event.target as HTMLInputElement;
        let newValue: string | boolean | File | Date | Option | Option[] | undefined = value;
    
        if (type === "checkbox" || type === "radio") {
            newValue = checked;
        } else if (type === "date") {
            newValue = new Date(value);
        } else if (type === "file" && files) {
            newValue = files[0];
        }
    
        const selectMapping = {
            gender: genderOptions,
            region: regions,
            city: fetchCities,
            familyStatus: familyStatusOptions,
            isWork: isWorkOptions,
            languageProfiency: languages,
            university: fetchUniversities,
            course: fetchCourses
        };
    
        if (name in selectMapping) {
            const options = selectMapping[name as keyof typeof selectMapping];
          
            if (Array.isArray(value)) {
              // Если множественный выбор
              const selectedOptions = options
                .filter(option => value.includes(option.id.toString()))
                .map(option => ({ value: option.id.toString(), label: option.name }));
              
              newValue = selectedOptions;
          
            } else {
              // Обычный выбор
              const selected = options.find(option => option.id.toString() === value);
              newValue = selected
                ? { value: selected.id.toString(), label: selected.name }
                : undefined;
            }
          }
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    
        setErrors((prevErrors) => {
            let validationValue: string | boolean | string[];
        
            if (newValue === undefined) {
                validationValue = '';
            } else if (newValue instanceof Date) {
                validationValue = newValue.toISOString();
            } else if (Array.isArray(newValue)) {
                // Обработка массива Options
                validationValue = newValue.map(option => option.value);
            } else if (typeof newValue === 'object' && 'value' in newValue) {
                // Обработка одного Option
                validationValue = (newValue as Option).value;
            } else if (newValue instanceof File) {
                validationValue = newValue.name;
            } else {
                validationValue = newValue;
            }
        
            return {
                ...prevErrors,
                [name]: validateField(name, validationValue),
            };
        });
    };

    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
    
        let hasErrors = false;
        const newErrors: Record<string, string | string[] | undefined> = {};
        
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) {
                newErrors[key] = error;
                hasErrors = true;
            }
        });
        
        setErrors(prevErrors => ({
            ...prevErrors,
            ...newErrors
        }));
    
        if (hasErrors) return;
        const paymentInformation = fetchStudent?.paymentInformation?.inn 
        && fetchStudent?.paymentInformation?.bik 
        && fetchStudent?.paymentInformation?.accountNumber
        ? {
            inn: fetchStudent?.paymentInformation?.inn,
            bik: fetchStudent?.paymentInformation?.bik,
            accountNumber: fetchStudent?.paymentInformation?.accountNumber,
          }
        : null;
        const dataToSend: StudentPutData = {
            id: id ?? "",
            firstName: formData?.firstName ?? "",
            lastName: formData?.lastName ?? "",
            birthDate: formData?.date?.toISOString().split("T")[0] ?? "",
            sex: formData.gender?.label === "Мужской" ? true : false,
            email: formData?.email ?? "",
            specialisation: formData?.profession ?? "",
            status: Number(formData.familyStatus?.value) ?? null,
            universityId: Number(formData.university?.value),
            regionId: Number(formData.region?.value) ?? null,
            balance: fetchStudent?.balance ?? 0,
            hasWork: formData.isWork?.label === "Работает" ? true : false,
            cityId: Number(formData?.city?.value) ?? null,
            languageIds: (formData?.languageProfiency?.map((item) => Number(item.value))) ?? [],
            courseId: Number(formData.course?.value),
            paymentInformation: paymentInformation
        }
        const response = await updateStudent(id ?? "", dataToSend);
        if (response.error || response.status < 200 || response.status >= 300) {
            // Неудачный ответ — ничего не сохраняем
            console.warn("Произошла ошибка:", response.error);
            return;
        }
        
        // Если всё прошло успешно
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };
    const [formDataChangePassword, setFormDataChangePassword] = useState<LoginFormData>({
        email: "",
        password: "",
        rememberMe: false, 
        passwordResetEmail: "",
        passwordReset: "", 
        passwordResetConfirm: ""
    });
    
    const handleChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormDataChangePassword((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleForgotPasswordClick = () => {
        setIsPasswordResetVisible(true);
      };
    if (isLoading){
        return<>Loading</>
    }
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
                        handleForgotPasswordClick={handleForgotPasswordClick}
                    />
                    <MainInfo
                        formData={formData}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        genderOptions={genderOptions}
                        familyStatusOptions={familyStatusOptions}
                        isWorkOptions={isWorkOptions}
                        languageProfiencyOptions={languages}
                        newCityOptions={fetchCities}
                        newRegionOptions={regions}
                    />
                    <UniversityInfo
                        formData={formData}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        errors={errors}
                        courseOptions={fetchCourses}
                        newUniversityOptions={fetchUniversities}
                    />
                </div>
            </div>   
            <Button type="submit" className={saveButtonClasses}>
                {isSaved ? "Сохранено ✓" : "Сохранить"}
            </Button>
            {isPasswordResetVisible && 
            <ForgotPasswordEmail 
                formData={formDataChangePassword}
                handleChange={handleChangePassword}
                onClose={() => setIsPasswordResetVisible(false)} 
                onClick={() => { 
                setIsPasswordResetVisible(false); 
                }} 
            />
            }            
        </form>   
        </>
    );
};

export default ProfilePage;


