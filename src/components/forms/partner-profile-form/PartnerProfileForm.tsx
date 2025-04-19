import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount"
import { Button } from "@mui/base"
import { ChangeEvent, useState } from "react"
import PaymentInfo from "../partner-profile-elements/payment-info/PaymentInfo"
import CompanyInfo from "../partner-profile-elements/company-info/CompanyInfo"
import LoginInfo from "../partner-profile-elements/login-info/LoginInfo"
import { transformToOption, transformToOptions } from "@/utils/dataTransform"

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
    fullFormData: PartnerPersonalAccountFormData
): string | string[] | undefined => {
    switch (name) {
        case "personalEmail":
            return /^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/.test(value as string)
                ? undefined : "Некорректный email";

        case "password":
            return (value as string).length >= 6 ? undefined : "Пароль должен содержать минимум 6 символов";

        case "companyName":
            return /^[a-zA-Zа-яА-Я0-9\s\'-]+$/.test(value as string) ? undefined : "Некорректное название компании";

        case "site":
            return /^(https?:\/\/)?(www\.)?(([\w-]+\.)+[\w-]+|localhost)(\.\w{2,})?(:[0-9]{1,5})?(\/[^\s<>]*)?(\?[^\s<>]*)?$/.test(value as string)
                ? undefined : "Некорректный URL";

        case "phoneNumber":
            return /^(\+7|8)?[\s-]?\(?9\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value as string)
                ? undefined : "Некорректный номер телефона";

        case "companyEmail":
            return /^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/.test(value as string)
                ? undefined : "Некорректный email компании";

        case "country":
            if (!value) return "Выберите страну";
            return undefined;

        case "industry":
            if (!value) return ["Выберите отрасль"];
            return undefined;

        case "inn":
            return /^\d{10}$/.test(value as string) ? undefined : "Некорректный ИНН";

        case "currentAccount":
        case "corAccount":
            return /^\d{20}$/.test(value as string) ? undefined : `Некорректный ${name === "currentAccount" ? "расчетный" : "корреспондентский"} счет`;

        case "bic":
            return /^\d{9}$/.test(value as string) ? undefined : "Некорректный БИК";

        case "regions":
            if (fullFormData.specificRegions && (!Array.isArray(value) || value?.length < 1))
                {
                return ["Выберите хотя бы один регион"];
            }
            return undefined;             

        default:
            return undefined;
    }
};

const PartnerProfileForm: React.FC = () => {


    const regions = transformToOptions(regionsValues)
    const industryValue = transformToOption(industry)
    const countryValue = transformToOption(country)
    const [formData, setFormData] = useState<PartnerPersonalAccountFormData>({
        personalEmail: "test.partner@example.com",
        password: "securePass123",
        companyName: "ООО Тестовая Компания",
        site: "https://test-company.ru",
        phoneNumber: "+7 (912) 345-67-89",
        companyEmail: "info@test-company.ru",
        industry: undefined,
        country: undefined,
        regions: undefined,
        inn: "7701234567",
        currentAccount: "40702810900000012345",
        corAccount: "30101810400000000225",
        bic: "044525225",
        allRegions: true,
        specificRegions: false
    });

    const [errors, setErrors] = useState<{ 
        personalEmail?: string; 
        password?: string; 
        companyName?: string 
        site?: string;
        phoneNumber?: string,
        companyEmail?: string,
        industry?: string[],
        country?: string[],
        regions?: string[],
        inn?: string,
        currentAccount?: string,
        corAccount?: string,
        bic?: string,       
    }>({
        personalEmail: '',
        password: '',
        companyName: "",
        site: "",
        phoneNumber: "",
        companyEmail: "",
        industry: [],
        country: [],
        regions: [],
        inn: "",
        currentAccount: "",
        corAccount: "",
        bic: ""
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
        const { name, value, type, checked } = event.target as HTMLInputElement;
      
        let newValue: any = type === 'checkbox' ? checked : value;
      
        if (name === 'allRegions' && checked) {
          setFormData(prev => ({
            ...prev,
            allRegions: true,
            specificRegions: false,
            regions: regionOptions.map(r => ({ value: r.id.toString(), label: r.name }))
          }));
          return;
        }
      
        if (name === 'specificRegions' && checked) {
          setFormData(prev => ({
            ...prev,
            allRegions: false,
            specificRegions: true,
            regions: []
          }));
          return;
        }

        if (name === "industry") {
            const selectedIndustry = industryOptions.find(option => option.id.toString() === value);
            newValue = selectedIndustry
                ? { value: selectedIndustry.id.toString(), label: selectedIndustry.name }
                : undefined;
        }
    
        if (name === "country") {
            const selectedCountry = countryOptions.find(option => option.id.toString() === value);
            newValue = selectedCountry
                ? { value: selectedCountry.id.toString(), label: selectedCountry.name }
                : undefined;
        }

        setFormData(prev => ({
          ...prev,
          [name]: newValue
        }));
      
        setErrors(prev => ({
          ...prev,
          [name]: validateField(name, newValue, {
            ...formData,
            [name]: newValue,
          }),
        }));
      };

    const handleSubmitForm = (event: React.FormEvent) => {
        event.preventDefault();
        let hasErrors = false;
        const newErrors: typeof errors = {};
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value, formData);
            if (error) {
                (newErrors as any)[key] = error;
                hasErrors = true;
            }
        });
    
        setErrors(newErrors);
    
        if (hasErrors) return;
    
        console.log("Отправка формы:", formData);     
    };    

    return(<>
        <form onSubmit={handleSubmitForm} className={profileCardClasses}>
            <div className="grow-0 shrink-0 basis-auto">
                <h3 className={profileTitleClasses}>Профиль партнера</h3>
                <div className="mt-5">
                    <LoginInfo 
                        formData={formData} 
                        handleChange={handleChange} 
                        errors={errors} 
                        handleBlur={handleBlur}
                    />
                    <CompanyInfo 
                        formData={formData} 
                        handleChange={handleChange} 
                        errors={errors} 
                        handleBlur={handleBlur}
                        industryOptions={industryOptions}
                        countryOptions={countryOptions}
                        regionOptions={regionOptions}
                    />
                    <PaymentInfo 
                        formData={formData} 
                        handleChange={handleChange} 
                        errors={errors} 
                        handleBlur={handleBlur}
                    />
                </div>
            </div>   
            <Button type="submit" className={saveButtonClasses}>
                Сохранить
            </Button>
        </form>    
    </>)
}

export default PartnerProfileForm;
