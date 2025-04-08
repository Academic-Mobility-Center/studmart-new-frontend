import InputField from "@/components/fields/input/InputField"
import PasswordField from "@/components/fields/password/PasswordField"
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount"
import { Button } from "@mui/base"
import { ChangeEvent, useState } from "react"
import PaymentInfo from "../partner-profile-elements/payment-info/PaymentInfo"
import CompanyInfo from "../partner-profile-elements/company-info/CompanyInfo"


const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
const sectionTitleClasses = "[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0";
const fieldsRowClasses = "flex justify-center items-start flex-row mt-5 gap-[24px]";
const inputContainerClasses = "box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto ";
const changePasswordLinkClasses = "font-[Mulish] text-sm font-normal underline text-[#888888] mt-[5px] m-0 pl-[286px] pr-[46px] p-0";
const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";

const PartnerProfileForm: React.FC = () => {
    const [formData, setFormData] = useState<PartnerPersonalAccountFormData>({
        personalEmail: "",
        password: "",
        companyName: "",
        site: "",
        phoneNumber: "",
        companyEmail: "",
        industry: "",
        country: "",
        serviceRegions: "",
        regions: [],
        inn: "",
        taxForm: "",
        currentAccount: "",
        corAccount: "",
        bic: "",
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
        industry?: string,
        country?: string,
        serviceRegions?: string,
        regions?: string[],
        inn?: string,
        taxForm?: string,
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
        industry: "",
        country: "",
        serviceRegions: "",
        regions: [],
        inn: "",
        taxForm: "",
        currentAccount: "",
        corAccount: "",
        bic: ""
    });

    const validate = () => {
        const newErrors: { 
            personalEmail?: string; 
            password?: string; 
            companyName?: string;
            site?: string;
            phoneNumber?: string;
            companyEmail?: string;
            industry?: string;
            country?: string;
            serviceRegions?: string;
            regions?: string[];
            inn?: string;
            taxForm?: string;
            currentAccount?: string;
            corAccount?: string;
            bic?: string;       
        } = {};
    
        if (!/^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/.test(formData.personalEmail)) {
            newErrors.personalEmail = "Некорректный email";
        }
    
        if (formData.password.length < 6) {
            newErrors.password = "Пароль должен содержать минимум 6 символов";
        }
    
        if (!/^[a-zA-Zа-яА-Я0-9\s\'-]+$/.test(formData.companyName)) {
            newErrors.companyName = "Некорректное название компании";
        }
    
        if (!/^(https?:\/\/)?(www\.)?(([\w-]+\.)+[\w-]+|localhost)(\.\w{2,})?(:[0-9]{1,5})?(\/[^\s<>]*)?(\?[^\s<>]*)?$/.test(formData.site)) {
            newErrors.site = "Некорректный URL";
        }
    
        if (!/^(\+7|8)?[\s-]?\(?9\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Некорректный номер телефона";
        }
    
        if (!/^\s*[\w\-\+_']+(\.[\w\-\+_']+)*\@[A-Za-z0-9]([\w\.-]*[A-Za-z0-9])?\.[A-Za-z][A-Za-z\.]*[A-Za-z]$/.test(formData.companyEmail)) {
            newErrors.companyEmail = "Некорректный email компании";
        }
    
        if (!/^[а-яА-Я\s\'’\-]+$/.test(formData.country)) {
            newErrors.country = "Некорректное название страны";
        }
    
        if (formData.regions && !formData.regions.every(region => /^[а-яА-Я\s\'’-]+$/.test(region))) {
            newErrors.regions = ["Некорректные регионы"];
        }
    
        if (!/^\d{10}$/.test(formData.inn.toString())) {
            newErrors.inn = "Некорректный ИНН";
        }
    
        if (!formData.taxForm) {
            newErrors.taxForm = "Укажите форму налогообложения";
        }
    
        if (!/^\d{20}$/.test(formData.currentAccount.toString())) {
            newErrors.currentAccount = "Некорректный расчетный счет";
        }
    
        if (!/^\d{20}$/.test(formData.corAccount.toString())) {
            newErrors.corAccount = "Некорректный корреспондентский счет";
        }
    
        if (!/^\d{9}$/.test(formData.bic.toString())) {
            newErrors.bic = "Некорректный БИК";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };  
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = event.target as HTMLInputElement;
        
        if (type === 'checkbox' || type === 'radio') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked, // для чекбокса или радиокнопки
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value, // для обычного поля
            }));
        }
    };

    const handleSubmitForm = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData)        
        if (validate()) {
            console.log(formData)
        }
    };    

    return(<>
    <form onSubmit={handleSubmitForm} className={profileCardClasses}>
        <div className="grow-0 shrink-0 basis-auto">
            <h3 className={profileTitleClasses}>Профиль партнера</h3>
            <div className="mt-5">
                <div className="">
                    <h2 className={sectionTitleClasses}>Логин и пароль</h2>
                    <div className={fieldsRowClasses}>
                        <div className={inputContainerClasses}>
                            <InputField 
                                name="personalEmail"
                                label="Почта" 
                                placeholder="ivanov@gmail.com" 
                                width={262}
                                labelFontSize={16}
                                value={formData.personalEmail}
                                onChange={handleChange}
                            />
                            {errors.personalEmail && <p className="text-red-600 text-sm font-medium">{errors.personalEmail}</p>}                            
                        </div>
                        <div className={inputContainerClasses}>
                            <PasswordField 
                                name="password"
                                label="Пароль" 
                                placeholder="********" 
                                width={262}
                                labelFontSize={16}
                                value={formData.password}
                                onChange={handleChange}                                
                            />
                            {errors.password && <p className="text-red-600 text-sm font-medium">{errors.password}</p>}                            
                        </div>
                    </div>
                    <p className={changePasswordLinkClasses}>
                        Сменить пароль
                    </p>
                </div>
                <CompanyInfo formData={formData} handleChange={handleChange} errors={errors}/>
                <PaymentInfo formData={formData} handleChange={handleChange} errors={errors}/>
            </div>
        </div>
        <Button type="submit" className={saveButtonClasses}>
            Сохранить
        </Button>
    </form>    
    </>)
}

export default PartnerProfileForm;
