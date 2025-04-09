import { DateField } from "@/components/fields/date/DateField";
import InputField from "@/components/fields/input/InputField";
import { SelectField } from "@/components/fields/select/SelectField";
import RegFormProps from "@/types/RegFormProps";
import { useState } from "react";
import Link from 'next/link'
import { transformToOptions } from "@/utils/dataTransform";

const genderOptions = [
    { id: 1, name: "Мужской" },
    { id: 2, name: "Женский" },
];

const RegForm2: React.FC<RegFormProps> =({handleChange,onBack, formData, onClick}) => {

    const [errors, setErrors] = useState<{ 
        name?: string; 
        fullname?: string;
        date?: string;
        gender?: string[];
    }>({
        name: "",
        fullname: "",
        date: "",
        gender: undefined
    });

    const validate = () => {
        const newErrors: {
            name?: string, 
            fullname?: string,
            date?: string,
            gender?: undefined;
        } ={};

        const selectedDate = formData?.date ? new Date(formData?.date) : null;
        const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

        if(!formData.name){
            newErrors.name = "Введите имя"
        }
        
        if(!formData.fullname){
            newErrors.fullname = "Введите фамилию"
        }
    
        if(!!selectedDate === false){
            newErrors.date = "Введите дату рождения"
        }

        // if(!formData.gender){
        //     newErrors.gender = "Выберете пол"
        // }

        if (!nameRegex.test(formData.name)){
            newErrors.name = "Имя должно содержать только буквы без пробелов";
        }
        if (!nameRegex.test(formData.fullname)){
            newErrors.fullname = "Имя должно содержать только буквы без пробелов";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = (event: React.FormEvent) =>{
        if(validate()){
            onClick(event);
        }
    }
    return (
        <div 
            className="border bg-[#f8f8f8] 
            flex flex-col gap-5 w-[410px] 
            self-center p-[30px] rounded-[30px] 
            border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
        >
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
                <h2 className="text-2xl font-extrabold text-[#032c28]">2/3</h2>
            </div>
            <div className="flex flex-col gap-1">
                <InputField 
                    label="Имя" 
                    placeholder="Дмитрий" 
                    onChange={handleChange} 
                    name="name" 
                    value={formData.name}
                    width={350}
                    labelFontSize={14}                    
                />
                {errors.name && <p className="text-red-600 text-sm font-medium mt-1">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <InputField 
                    label="Фамилия" 
                    placeholder="Орлов" 
                    onChange={handleChange} 
                    name="fullname" 
                    value={formData.fullname}
                    width={350}
                    labelFontSize={14}                    
                />
                {errors.fullname && <p className="text-red-600 text-sm font-medium mt-1">{errors.fullname}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <DateField 
                    label="Дата рождения" 
                    onChange={handleChange} 
                    name="date" 
                    value={formData?.date instanceof Date ? formData?.date?.toISOString().split("T")[0] : ""}
                />
                {errors.date && <p className="text-red-600 text-sm font-medium mt-1">{errors.date}</p>}
            </div>

            <SelectField 
                label="Пол" 
                options={transformToOptions(genderOptions)} 
                name="gender"
                value={formData.gender ?? undefined} 
                onChange={handleChange}
                width={350}
                labelFontSize={14}                
                placeholder="Мужской"
            />
            <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-[15px]">
                    <button 
                        onClick={onBack}
                        className="bg-[#EFEFEF] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl min-w-[116px] w-[116px] h-[48]"
                    >
                        Назад
                    </button>
                    <button 
                        className="bg-[#8fe248] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl min-w-[219px] w-[219px]" 
                        onClick={handleSubmit}
                    >
                        Далее
                    </button>
                </div>
                <p className="text-sm font-bold text-[#032c28] text-center">
                    Уже есть аккаунт? 
                    <Link href="/login" className="text-[#6dbc29] underline pl-2">Войти</Link>
                </p>
            </div>  
        </div>  
    )
}
export default RegForm2;