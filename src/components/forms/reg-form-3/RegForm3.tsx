import { FileField } from "@/components/fields/file/FileField";
import InputField from "@/components/fields/input/InputField";
import { SelectField } from "@/components/fields/select/SelectField";
import RegFormProps from "@/types/RegFormProps";
import { useState } from "react";
import Link from 'next/link'

const RegForm3: React.FC<RegFormProps> =({handleChange,onBack, formData, onClick}) => {
    const [errors, setErrors] = useState<{
        profession?: string, 
        file?: string, 
        course?: string,
        university?: string, 
    }>({
        profession: "",
        file: "",
        course: "",
        university: ""
    });
    const validate = () => {
        const newErrors: {
            profession?: string, 
            file?: string, 
            course?: string,
            university?: string
        } ={};
        const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
        if (!formData.profession){
            newErrors.profession = "Введите свою профессию";
        }
        if (!formData.course){
            newErrors.course = "Выберете ваш курс обучения";
        }
        if (!formData.university){
            newErrors.university = "Выберете свой университет";
        }
        if (!nameRegex.test(formData.profession)){
            newErrors.profession = "Имя должно содержать только буквы без пробелов";
        }

        const email = formData?.email;
        const emailDomainMatch = email.match(/@([^@.]+)\./);
        const isStudentDomain = emailDomainMatch?.[1]?.toLowerCase().includes("stud") 
        || emailDomainMatch?.[1]?.toLowerCase().includes("edu");

        if (!formData.file && !isStudentDomain) {
            newErrors.file = "Прикрепите файл";
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
        <div className="border bg-[#f8f8f8] 
        flex flex-col gap-5 w-[410px] 
        self-center p-[30px] rounded-[30px] 
        border-solid border-[rgba(0,0,0,0.20)] mt-[25px]">
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
                <h2 className="text-2xl font-extrabold text-[#032c28]">3/3</h2>
            </div>
            <div className="flex flex-col gap-1">
                <SelectField 
                    label="Университет" 
                    options={["НГУ", "НГТУ", "МГУ"]} 
                    name="university" 
                    value={formData.university || ""} 
                    onChange={handleChange}
                    width={350}
                    labelFontSize={14}     
                    placeholder="Университет"               
                />
                {errors.university && <p className="text-red-600 text-sm font-medium mt-1">{errors.university}</p>}                
            </div>
            <div className="flex flex-col gap-1">
                <InputField 
                    label="Специальность" 
                    placeholder="Специальность" 
                    name="profession" 
                    value={formData.profession} 
                    onChange={handleChange}
                    width={350}
                    labelFontSize={14}                    
                />
                {errors.profession && <p className="text-red-600 text-sm font-medium mt-1">{errors.profession}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <SelectField 
                    label="Курс" 
                    options={["Первый", "Второй", "Третий"]}
                    name="course"
                    value={formData.course || ""}
                    onChange={handleChange}
                    width={350}
                    labelFontSize={14}     
                    placeholder="Курс"               
                />
                {errors.course && <p className="text-red-600 text-sm font-medium mt-1">{errors.course}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <FileField 
                    label="Документ, подтверждающий статус студента" 
                    name="file" 
                    onChange={handleChange}
                />
                {errors.file && <p className="text-red-600 text-sm font-medium mt-1">{errors.file}</p>}
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-[15px]">
                    <button 
                        className="bg-[#EFEFEF] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl min-w-[116px] w-[116px] h-[48]"
                        onClick={onBack}
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
export default RegForm3;