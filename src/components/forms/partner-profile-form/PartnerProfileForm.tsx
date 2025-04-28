"use client";
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount"
import { Button } from "@mui/base"
import { useState, useEffect } from "react"
import PaymentInfo from "../partner-profile-elements/payment-info/PaymentInfo"
import CompanyInfo from "../partner-profile-elements/company-info/CompanyInfo"
import LoginInfo from "../partner-profile-elements/login-info/LoginInfo"
import { transformToOption, transformToOptions } from "@/utils/dataTransform"
import { 
    countryOptions, 
    // defaultPartner, 
    defaultUser, 
    industryOptions, 
    profileCardClasses, 
    profileTitleClasses, 
    regionOptions, 
    saveButtonClasses, 
    validateField 
} from "@/app/partner-personal-account/context";
import { Option } from "@/types/Option";
import {  
    // getPartner, 
    getPartnerCategories, 
    getPartnerCountries, 
    getPartnerInfo, 
    getPartnerRegions 
} from "@/lib/api/partners";

const PartnerProfileForm: React.FC =  () => {
    const [fetchRegionOptions, setFetchRegionOptions] = useState(regionOptions)
    const [fetchedIndustyOptions, setFetchingIndustryOptions] = useState(industryOptions);
    const [fetchedCountryOptions, setFetchingCountryOptions] = useState(countryOptions)
    const [fetchPartner, setFetchPartner] = useState(defaultUser)
    useEffect(() => {
        const fetchData = async () => {
            try{
                // const partnerData = await getPartner("1a9b52cc-719c-4e46-b6a5-ba0918c0e1a2")
                // console.log(partnerData)
                const partner = await getPartnerInfo("3fa85f64-5717-4562-b3fc-2c963f66afa6");
                setFetchPartner(partner)
                // setFetchPartnerData(partnerData)

            } catch(error){
                console.log(error)
                setFetchPartner(defaultUser)
                // setFetchPartnerData(defaultPartner)
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
        personalEmail: fetchPartner?.email,
        password: "securePass123",
        companyName: fetchPartner?.partner?.name,
        site: fetchPartner?.partner.site,
        phoneNumber: fetchPartner?.partner.phone,
        companyEmail: fetchPartner?.partner.email,
        industry: transformToOption(defaultUser?.partner.category),
        country: transformToOption(defaultUser?.partner.country),
        regions: transformToOptions(defaultUser?.partner.regions),
        inn: fetchPartner?.partner.inn.toString(),
        currentAccount: fetchPartner?.partner.paymentInformation?.accountNumber,
        corAccount: fetchPartner?.partner.paymentInformation?.correspondentAccountNumber,
        bic: fetchPartner?.partner.paymentInformation?.bik,
        allRegions: fetchPartner?.partner.hasAllRegions,
        specificRegions: false
        // personalEmail: fetchPartnerData?.employees[0].email,
        // password: "securePass123",
        // companyName: fetchPartnerData.name,
        // site: fetchPartnerData.site,
        // phoneNumber: fetchPartnerData.phone,
        // companyEmail: fetchPartnerData.email,
        // industry: transformToOption(fetchPartnerData.category),
        // country: transformToOption(fetchPartnerData.country),
        // regions: transformToOptions(fetchPartnerData.regions),
        // inn: fetchPartnerData.inn.toString(),
        // currentAccount: fetchPartnerData.paymentInformation?.accountNumber,
        // corAccount: fetchPartnerData.paymentInformation?.correspondentAccountNumber,
        // bic: fetchPartnerData.paymentInformation?.bik,
        // allRegions: fetchPartnerData.hasAllRegions,
        // specificRegions: !fetchPartnerData.hasAllRegions
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