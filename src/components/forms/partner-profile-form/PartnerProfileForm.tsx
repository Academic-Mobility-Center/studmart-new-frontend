"use client";
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount"
import { Button } from "@mui/base"
import { useState, useEffect } from "react"
// import { getPartnerCategories } from "@/lib/api/partners"; 
import PaymentInfo from "../partner-profile-elements/payment-info/PaymentInfo"
import CompanyInfo from "../partner-profile-elements/company-info/CompanyInfo"
import LoginInfo from "../partner-profile-elements/login-info/LoginInfo"
import { transformToOption, transformToOptions } from "@/utils/dataTransform"
import { countryOptions, industryOptions, regionOptions, validateField } from "@/app/partner-personal-account/context";
import { Option } from "@/types/Option";

const profileCardClasses = "border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[20px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]";
const profileTitleClasses = "font-['Nunito_Sans'] text-[24px] font-extrabold text-[#032c28] m-0 p-0 ";
const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]";

const testData = {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "partner": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "subtitle": "string",
      "description": "string",
      "priority": 0,
      "email": "string",
      "site": "string",
      "inn": 0,
      "phone": "string",
      "category": {
        "id": 0,
        "name": "string"
      },
      "country": { "id": 1, "name": "Россия" },
      "paymentInformation": {
        "bik": "string",
        "accountNumber": "string",
        "correspondentAccountNumber": "string"
      },
      "hasAllRegions": false,
      "regions": [
        {
          "id": 0,
          "name": "string"
        },
        {
            "id": 1,
            "name": "string"
          },
      ]
    }
}

const PartnerProfileForm: React.FC =  () => {
    const [fetchedIndustyOptions, setFetchingIndustryOptions] = useState(industryOptions);
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            // const categories = await getPartnerCategories();
            setFetchingIndustryOptions(industryOptions);
          } catch (err) {
            console.error("Ошибка загрузки категорий, используем из контекста:", err);
            setFetchingIndustryOptions(industryOptions)
          }
        };
      
        fetchCategories();
      }, []);
      
    const [formData, setFormData] = useState<PartnerPersonalAccountFormData>({
        personalEmail: testData?.email,
        password: "securePass123",
        companyName: testData?.partner?.name,
        site: testData?.partner?.site,
        phoneNumber: testData?.partner?.phone,
        companyEmail: testData?.partner?.email,
        industry: transformToOption(testData?.partner?.category),
        country: transformToOption(testData?.partner?.country),
        regions: transformToOptions(testData?.partner?.regions),
        inn: testData?.partner?.inn.toString(),
        currentAccount: testData?.partner?.paymentInformation?.accountNumber,
        corAccount: testData?.partner?.paymentInformation?.correspondentAccountNumber,
        bic: testData?.partner?.paymentInformation?.bik,
        allRegions: testData?.partner?.hasAllRegions,
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

    // const [industryOptionsState, setIndustryOptionsState] = useState(industryOptions);
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //       try {
    //         const categories = await getPartnerCategories();
    //         setIndustryOptionsState(categories);
    //         // const currentCategory = categories.find((cat: any) => cat.id === testData.partner.category.id);
    //         // if (currentCategory) {
    //         //   setFormData(prev => ({
    //         //     ...prev,
    //         //     industry: transformToOption(currentCategory)
    //         //   }));
    //         // }
    //       } catch (err) {
    //         console.error("Ошибка загрузки категорий, используем из контекста:", err);
    //         // const fallbackCategory = industryOptions.find(
    //         //     (cat: any) => cat.id === testData.partner.category.id
    //         //   );
              
    //         //   if (fallbackCategory) {
    //         //     setFormData(prev => ({
    //         //       ...prev,
    //         //       industry: transformToOption(fallbackCategory)
    //         //     }));
    //         //   }
    //         setFormData(prev => ({
    //                 ...prev,
    //                 industry: transformToOption(testData?.partner?.category)
    //         }));
    //       }
    //     };
      
    //     fetchCategories();
    //   }, []);