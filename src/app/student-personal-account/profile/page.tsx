"use client";
import LoginInfo from '@/components/forms/student-profile-elements/login-info/LoginInfo';
import MainInfo from '@/components/forms/student-profile-elements/main-info/MainInfo';
import UniversityInfo from '@/components/forms/student-profile-elements/university-info/UniversityInfo';
import { StudentFormData } from '@/types/StudentProfileData';
import { Button } from '@mui/base';
import React, { useEffect, useState } from 'react';
// import City from "@/types/Cities";

const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";
import { 
    regionOptions as newRegionOptions, 
    cityOptions as newCityOptions,
    universityOptions,
    cityOptions
} from '@/app/partner-personal-account/statistics/context';
import IStudentFormData, { 
    courseOptions, 
    familyStatusOptions, 
    genderOptions, 
    isWorkOptions, 
    languageProfiencyOptions, 
    validateField, 
} from '../context';
import { Option } from '@/types/Option';
import { 
    getStudentById, 
    getStudentCourses, 
    getStudentCities, 
    getStudentUniversities,
    // getCitiesByRegionId
} from '@/lib/api/students';
import {getPartnerRegions} from '@/lib/api/partners';
import { transformToOption } from '@/utils/dataTransform';
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"

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
    const [fetchUniversities, setFetchUniversities] = useState(universityOptions)
    const [fetchCities, setFetchCities] = useState(cityOptions)
    const [regions, setRegions] = useState<{id: number, name: string}[]>(newRegionOptions)
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
        const genderOption = fetchStudent?.sex ? { id: 2, name: "Женский" } : { id: 1, name: "Мужской" };
        setFormData({
            email: fetchStudent?.email,
            password: "",
            firstName: fetchStudent?.firstName,
            lastName: fetchStudent?.lastName,
            date: new Date(fetchStudent.birthDate),
            gender: transformToOption(genderOption),
            // region: transformToOption(fetchStudent?.university?.city?.region)  ?? [],
            // city: transformToOption(fetchStudent?.university?.city)  ?? undefined,
            familyStatus: undefined,
            // isWork: undefined,
            // languageProfiency: undefined,
            university: transformToOption(fetchStudent?.university)  ?? undefined,
            profession: fetchStudent?.specialisation,
            course: transformToOption(fetchStudent.course) ?? undefined

        });
    }, [fetchStudent]);    
    // const [cities,setCities] = useState<City[]>(newCityOptions)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const regionId = formData?.region?.value;
    //             if (regionId) {
    //                 console.log("Запрос городов по региону", regionId); // 👈 добавьте для отладки
    //                 const cities = await getCitiesByRegionId(regionId);
    //                 setCities(cities);
    //             }
    //         } catch (error) {
    //             console.warn(error);
    //             setCities(newCityOptions);
    //         }
    //     };
    
    //     if (formData?.region?.value) {
    //         fetchData();
    //     }
    // }, [formData?.region?.value]); 
    
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
            region: newRegionOptions,
            city: newCityOptions,
            familyStatus: familyStatusOptions,
            isWork: isWorkOptions,
            languageProfiency: languageProfiencyOptions,
            university: fetchUniversities,
            course: fetchCourses,
        };
    
        if (name in selectMapping) {
            const options = selectMapping[name as keyof typeof selectMapping];
          
            if (Array.isArray(value)) {
              // Если множественный выбор
              const selectedOptions = options
                .filter(option => value.includes(option.id.toString()))
                .map(option => ({ value: option.id.toString(), label: option.name }));
              
              newValue = selectedOptions; // тут массив Options
          
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

    const handleSubmitForm = (event: React.FormEvent) => {
        console.log("Отправка формы:", formData); 
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
    
        console.log("Отправка формы:", formData);     
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
                Сохранить
            </Button>
        </form>   
        </>
    );
};

export default ProfilePage;


