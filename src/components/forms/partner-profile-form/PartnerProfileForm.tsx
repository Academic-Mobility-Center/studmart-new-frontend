"use client";
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount"
import { Button } from "@mui/base"
import { useState, useEffect } from "react"
// import { getPartnerCategories } from "@/lib/api/partners"; 
import PaymentInfo from "../partner-profile-elements/payment-info/PaymentInfo"
import CompanyInfo from "../partner-profile-elements/company-info/CompanyInfo"
import LoginInfo from "../partner-profile-elements/login-info/LoginInfo"
import { transformToOption, transformToOptions } from "@/utils/dataTransform"
import { countryOptions, industryOptions, profileCardClasses, profileTitleClasses, regionOptions, saveButtonClasses, testData, validateField } from "@/app/partner-personal-account/context";
import { Option } from "@/types/Option";
import { getPartner, getPartnerCategories, getPartnerCountries, getPartnerRegions } from "@/lib/api/partners";

const PartnerProfileForm: React.FC =  () => {
    const [fetchRegionOptions, setFetchRegionOptions] = useState(regionOptions)
    const [fetchedIndustyOptions, setFetchingIndustryOptions] = useState(industryOptions);
    const [fetchedCountryOptions, setFetchingCountryOptions] = useState(countryOptions)
    const [fetchedPartnerInfo, setFetchedPartnerInfo] = useState(testData)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const partnerInfo = await getPartner();
                setFetchedPartnerInfo(partnerInfo[0]);
            } catch (e) {
                console.error("Ошибка загрузки партнера", e);
                setFetchedPartnerInfo(testData);
            }
    
            try {
                const countries = await getPartnerCountries();
                setFetchingCountryOptions(countries);
            } catch (e) {
                console.error("Ошибка загрузки стран", e);
                setFetchingCountryOptions(countryOptions);
            }
    
            try {
                const regions = await getPartnerRegions();
                setFetchRegionOptions(regions);
            } catch (e) {
                console.error("Ошибка загрузки регионов", e);
                setFetchRegionOptions(regionOptions);
            }
    
            try {
                const categories = await getPartnerCategories();
                setFetchingIndustryOptions(categories);
            } catch (e) {
                console.error("Ошибка загрузки категорий", e);
                setFetchingIndustryOptions(industryOptions);
            }
        };
    
        fetchData();
    }, []);
    
      
    const [formData, setFormData] = useState<PartnerPersonalAccountFormData>({
        personalEmail: fetchedPartnerInfo?.email,
        password: "securePass123",
        companyName: fetchedPartnerInfo?.name,
        site: fetchedPartnerInfo?.site,
        phoneNumber: fetchedPartnerInfo?.phone,
        companyEmail: fetchedPartnerInfo?.email,
        industry: transformToOption(fetchedPartnerInfo?.category),
        country: transformToOption(fetchedPartnerInfo?.country),
        regions: transformToOptions(fetchedPartnerInfo?.regions),
        inn: fetchedPartnerInfo?.inn.toString(),
        currentAccount: fetchedPartnerInfo?.paymentInformation?.accountNumber,
        corAccount: fetchedPartnerInfo?.paymentInformation?.correspondentAccountNumber,
        bic: fetchedPartnerInfo?.paymentInformation?.bik,
        allRegions: fetchedPartnerInfo?.hasAllRegions,
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

    const handleBlur = (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, type, value, checked } = event.target as HTMLInputElement;
    
        const newValue = type === "checkbox" ? checked : value;
    
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: validateField(name, newValue, {
                ...formData,
                [name]: newValue,
            }),
        }));
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, type, value, checked } = event.target as HTMLInputElement;
    
        let newValue: string | boolean | File | Date | Option | undefined = value;
    
        if (type === "checkbox") {
            newValue = checked;
        }
    
        const selectMap = {
            industry: industryOptions,
            country: countryOptions,
        };
    
        if (selectMap[name as keyof typeof selectMap]) {
            const selected = selectMap[name as keyof typeof selectMap].find(opt => opt.id.toString() === value);
            newValue = selected ? { value: selected.id.toString(), label: selected.name } : "";
        }
    
        // Логика "все регионы" / "выбранные регионы"
        if (name === 'allRegions' && checked) {
            setFormData(prev => ({
                ...prev,
                allRegions: true,
                specificRegions: false,
                regions: regionOptions.map(r => ({ value: r.id.toString(), label: r.name })),
            }));
            return;
        }
    
        if (name === 'specificRegions' && checked) {
            setFormData(prev => ({
                ...prev,
                allRegions: false,
                specificRegions: true,
                regions: [],
            }));
            return;
        }
    
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    
        setErrors((prevErrors) => {
            let validationValue: string | boolean | string[];
            
            if (newValue === undefined) {
                validationValue = '';
            } else if (newValue instanceof Date) {
                validationValue = newValue.toISOString();
            } else if (typeof newValue === 'object' && 'value' in newValue) {
                validationValue = (newValue as Option).value;
            } else {
                validationValue = newValue;
            }
        
            return {
                ...prevErrors,
                [name]: validateField(name, validationValue,{
                    ...formData,
                    [name]: newValue,
                }),
            };
        });
    };
      
    const handleSubmitForm = (event: React.FormEvent) => {
        event.preventDefault();
        let hasErrors = false;
        const newErrors: Record<string, string | string[]> = {}; // Изменили тип на Record
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value, formData);
            if (error) {
                newErrors[key] = error; // Теперь без any
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
                        industryOptions={fetchedIndustyOptions}
                        countryOptions={fetchedCountryOptions}
                        regionOptions={fetchRegionOptions}
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