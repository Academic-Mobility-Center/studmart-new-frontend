"use client"
import InputField from "@/components/fields/input/InputField";

import StudentBankCredentialsFormData from "@/types/StudentBankCredentialsFormData";
import { useState } from "react";
const validateField = (
    name: string,
    value: string | boolean | string[],
): string | undefined => {
    switch (name) {
        case "fullname":
        case "name":
        case "middleName":
            return /^[А-Яа-яA-Za-z\s-]{2,}$/.test(value as string)
                ? undefined
                : "Введите корректное значение (минимум 2 буквы)";

        case "innOrKio":
            return /^\d{10}$/.test(value as string)
                ? undefined
                : "ИНН должен содержать 10 цифр";

        case "kpp":
            if (!value) return undefined; // необязательное поле
            return /^\d{9}$/.test(value as string)
                ? undefined
                : "КПП должен содержать 9 цифр";

        case "numberAccount":
            return /^\d{20}$/.test(value as string)
                ? undefined
                : "Номер счета должен содержать 20 цифр";

        case "bic":
            return /^\d{9}$/.test(value as string)
                ? undefined
                : "БИК должен содержать 9 цифр";

        default:
            return undefined;
    }
};

const CredentialsPage = () => {
    const [formData, setFormData] = useState<StudentBankCredentialsFormData>({
        fullname: "",
        name: "",
        middleName: "",
        innOrKio: "",
        kpp: "",
        numberAccount: "",
        bic: "",
    })
    const [errors, setErrors] = useState<{ 
        fullname?: string; 
        name?: string; 
        middleName?: string 
        innOrKio?: string;
        kpp?: string,
        numberAccount?: string,
        bic?: string,
      
    }>({
        fullname: '',
        name: '',
        middleName: "",
        innOrKio: "",
        kpp: "",
        numberAccount: "",
        bic: "",
    });    

    const hanldeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        
        const newValue: string  = value;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    }    
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
    const handleSubmitForm = (event: React.FormEvent) => {
        event.preventDefault();
        let hasErrors = false;
        const newErrors: typeof errors = {};
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) {
                (newErrors as typeof errors)[key as keyof typeof errors] = error;
                hasErrors = true;
            }
        });
    
        setErrors(newErrors);
    
        if (hasErrors) return;
    
        console.log("Отправка формы:", formData);     
    };  
    return (
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-[40px] ">
            <div
                className="border bg-[#F8F8F8] box-border 
                flex justify-start items-stretch flex-col grow-0 
                shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
                border-solid border-[rgba(0,0,0,0.20)] w-[588px] pb-5 gap-5"
            >
                <h3
                    className="font-['Nunito_Sans'] text-[24px] 
                    font-extrabold text-[#032c28] m-0 p-0 mt-5"
                >
                    Банковские реквизиты
                </h3>
                <div className="flex flex-row gap-6">
                    <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[167px] grow-0 shrink-0 basis-auto">
                        <InputField
                            label="Фамилия"
                            placeholder="Фамилия"
                            width={167}
                            maxRows={1}
                            onChange={hanldeChange}
                            name="fullname"
                            value={formData?.fullname}
                            onBlur={handleBlur}
                        />
                        {errors.fullname && <p className="text-red-600 text-sm font-medium">{errors.fullname}</p>}
                    </div>
                    <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[167px] grow-0 shrink-0 basis-auto">
                        <InputField
                            label="Имя"
                            placeholder="Имя"
                            width={166}
                            maxRows={1}
                            onChange={hanldeChange}
                            name="name"
                            value={formData?.name}
                            onBlur={handleBlur}
                        />
                        {errors.name && <p className="text-red-600 text-sm font-medium">{errors.name}</p>}
                    </div>
                    <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[167px] grow-0 shrink-0 basis-auto">
                        <InputField
                            label="Отчество"
                            placeholder="Отчество"
                            width={167}
                            maxRows={1}
                            onChange={hanldeChange}
                            value={formData?.middleName}
                            name="middleName"
                            onBlur={handleBlur}
                        />
                        {errors.middleName && <p className="text-red-600 text-sm font-medium">{errors.middleName}</p>}
                    </div>

                </div>
                <div className="flex flex-row gap-6">
                    <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
                        <InputField
                            label="ИНН/КИО"
                            placeholder="ИНН/КИО"
                            width={262}
                            maxRows={1}
                            onChange={hanldeChange}
                            name="innOrKio"
                            value={formData?.innOrKio}
                            onBlur={handleBlur}
                        />
                        {errors.innOrKio && <p className="text-red-600 text-sm font-medium">{errors.innOrKio}</p>}
                    </div>
                    <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
                        <InputField
                            label="КПП"
                            placeholder="Необязательно для физ лица"
                            width={262}
                            maxRows={1}
                            onChange={hanldeChange}
                            name="kpp"
                            value={formData?.kpp}
                            onBlur={handleBlur}
                        />
                        {errors.kpp && <p className="text-red-600 text-sm font-medium">{errors.kpp}</p>}
                    </div>



                </div>
                <div className="flex flex-row gap-6">
                    <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
                        <InputField
                            label="Номер счета"
                            placeholder="Номер счета"
                            width={262}
                            maxRows={1}
                            autoComplete="off"
                            onChange={hanldeChange}
                            name="numberAccount"
                            value={formData?.numberAccount}
                            onBlur={handleBlur}
                        />
                        {errors.numberAccount && <p className="text-red-600 text-sm font-medium">{errors.numberAccount}</p>}
                    </div>
                    <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
                        <InputField
                            label="БИК Банка"
                            placeholder="БИК Банка"
                            width={262}
                            maxRows={1}
                            autoComplete="off"
                            onChange={hanldeChange}
                            value={formData?.bic}
                            name="bic"
                            onBlur={handleBlur}
                        />              
                        {errors.bic && <p className="text-red-600 text-sm font-medium">{errors.bic}</p>}          
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                    uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border 
                    grow-0 shrink-0 basis-auto  rounded-[15px] border-[none]"
                >
                    Сохранить
                </button>                
            </div>
        </form>

    )
}

export default CredentialsPage;