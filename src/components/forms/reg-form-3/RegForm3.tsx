import { FileField } from "@/components/fields/file/FileField";
import InputField from "@/components/fields/input/InputField";
import { SelectField } from "@/components/fields/select/SelectField";
import Link from 'next/link'
import { useState, useEffect } from "react";
import { StudentEmailDomain } from '@/lib/api/students';
import { ChangeEvent } from "react";
import RegistrationFormData from "@/types/RegistrationFormData";
export type FormDataType = {
    [key: string]: string | File;
};
export type FormEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;
interface Props{
    onClick: (event: React.FormEvent) => void;
    formData: RegistrationFormData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    onBack?: () => void;
    onChange?: (setFormData: React.Dispatch<React.SetStateAction<FormDataType>>) => (event: FormEvent) => void;
    univercitiesOptions?: {
        label: string;
        value: string;
    }[]
    coursesOptions?: {
        label: string;
        value: string;
    }[]
    setBooleanField: (name: string, value: boolean) => void
};

const RegForm3: React.FC<Props> =({
    handleChange,
    onBack, 
    formData, 
    onClick, 
    univercitiesOptions, 
    coursesOptions,
    setBooleanField
}) => {
    const [errors, setErrors] = useState<{
        profession?: string, 
        file?: string, 
        course?: string,
        university?: string, 
        consent?: string;
    }>({
        profession: "",
        file: "",
        course: undefined,
        university: undefined
    });
    const validate = () => {
        const newErrors: {
            profession?: string,
            file?: string,
            course?: string,
            university?: string
            consent?: string;
        } = {};
    
        const minProfessionLength = 3;
        const maxProfessionLength = 100;
        const profession = formData.profession?.trim() ?? "";
        const professionRegex = /^[А-ЯЁ][а-яё]+(?:[\s\-][А-ЯЁа-яё]+)*(?:\s\([А-ЯЁа-яё\s\-]+\))?$/;
        
        if (!profession) {
            newErrors.profession = "Введите свою профессию";
        } else if (profession.length < minProfessionLength || profession.length > maxProfessionLength) {
            newErrors.profession = `Профессия должна содержать от ${minProfessionLength} до ${maxProfessionLength} символов`;
        } else if (!professionRegex.test(profession)) {
            newErrors.profession = "Неверный формат профессии. Пример корректного значения: \"Инженер\", \"Ведущий инженер\", \"Менеджер (по продажам)\". Начинается с заглавной буквы, допускаются пробелы, дефисы и уточнения в скобках.";
        }
        if (!formData.course?.value) {
            newErrors.course = "Выберите ваш курс обучения";
        }
    
        if (!formData.university?.value.trim()) {
            newErrors.university = "Выберите свой университет";
        } 
        if (!formData.consent) {
            newErrors.consent = "Вы должны дать согласие на обработку персональных данных";
        }        
    
        if (!formData.file && formData.needFile) {
            newErrors.file = "Прикрепите файл";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (event: React.FormEvent) =>{
        if(validate()){
            console.log("Вызываем onClick")
            onClick(event);
        }
    }
    const [prevCheck, setPrevCheck] = useState<{ email: string; university: string } | null>(null);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const email = formData.email?.trim();
            const university = formData.university?.value;
    
            // Прерываем, если нет нужных данных
            if (!email || !university) return;
    
            // Прерываем, если ничего не поменялось
            if (prevCheck?.email === email && prevCheck?.university === university) return;
    
            // Обновляем запомненные значения
            setPrevCheck({ email, university });
    
            try {
                const status = await StudentEmailDomain(email, Number(university));
                if (status && status === 204){
                    setBooleanField("needFile",false)
                }
                setBooleanField("needFile",true)
              } catch (error) {
                console.log("Ошибка при проверке домена:", error);
                setBooleanField("needFile", true);
              }
        }, 300);
    
        return () => clearTimeout(timeout);
    }, [formData.email, formData.university, setBooleanField, prevCheck?.email, prevCheck?.university]);
    
    
    return (
        <div
            className="border bg-[#f8f8f8] 
            flex flex-col gap-5 w-[410px] 
            self-center p-[30px] rounded-[30px] 
            border-solid border-[rgba(0,0,0,0.20)] mt-[25px]"
        >
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold text-[#032c28]">Регистрация</h2>
                <h2 className="text-2xl font-extrabold text-[#032c28]">3/3</h2>
            </div>
            <div className="flex flex-col gap-1">
                <SelectField 
                    label="Университет" 
                    options={
                        univercitiesOptions ?? []
                    }
                    name="university" 
                    value={formData.university ?? undefined} 
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
                    maxRows={1}                 
                />
                {errors.profession && <p className="text-red-600 text-sm font-medium mt-1">{errors.profession}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <SelectField 
                    label="Курс" 
                    options={coursesOptions || []}
                    name="course"
                    value={formData.course ?? undefined}
                    onChange={handleChange}
                    width={350}
                    labelFontSize={14}     
                    placeholder="Курс"               
                />
                {errors.course && <p className="text-red-600 text-sm font-medium mt-1">{errors.course}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-start gap-2 pt-2">
        <input
            type="checkbox"
            id="consent"
            checked={formData.consent ?? false}
            onChange={(e) => setBooleanField("consent", e.target.checked)}
            className="mt-1 cursor-pointer"
        />
        <label htmlFor="consent" className="text-sm text-[#032c28]">
            Даю согласие на обработку персональных данных.{" "}
            <Link
                href="/files/Политика конфиденциальности.pdf" // путь к файлу-согласию
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6dbc29] underline"
            >
                Ознакомиться с документом
            </Link>
        </label>
                </div>
                {errors.consent && (
                    <p className="text-red-600 text-sm font-medium mt-1">{errors.consent}</p>
                )}
                
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
                        type="button"
                        onClick={handleSubmit}
                        className="bg-[#8fe248] text-[#032c28] p-2 text-sm font-bold uppercase rounded-2xl min-w-[219px] w-[219px] cursor-pointer"
                        // onClick={handleSubmit}
                    >
                        Зарегистрироваться
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