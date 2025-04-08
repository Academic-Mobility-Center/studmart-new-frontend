import InputField from "@/components/fields/input/InputField"
import { MultipleSelectField } from "@/components/fields/multiple-select/MultipleSelectField"
import PasswordField from "@/components/fields/password/PasswordField"
import { SelectField } from "@/components/fields/select/SelectField"
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount"
import { Button } from "@mui/base"
import { ChangeEvent, useState } from "react"


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
        bic: ""
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
        inn?: number,
        taxForm?: string,
        currentAccount?: number,
        corAccount?: number,
        bic?: number,       
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
        inn: 0,
        taxForm: "",
        currentAccount: 0,
        corAccount: 0,
        bic: 0
    });
    const validate = () => {
        const newErrors: { 
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
            inn?: number,
            taxForm?: string,
            currentAccount?: number,
            corAccount?: number,
            bic?: number,       
        } = {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };   
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmitForm = (event: React.FormEvent) => {
        event.preventDefault();
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
                        </div>
                    </div>
                    <p className={changePasswordLinkClasses}>
                        Сменить пароль
                    </p>
                </div>
                <div className="pt-[20px] ">
                    <h2 className={sectionTitleClasses}>Информация о компании</h2>
                    <div className={fieldsRowClasses}>
                        <div className={inputContainerClasses}>
                            <InputField
                                name="companyName" 
                                label="Название компании" 
                                placeholder="Company" 
                                width={262}
                                labelFontSize={16}
                                value={formData.companyName}
                                onChange={handleChange}                                
                            />
                        </div>
                        <div className={inputContainerClasses}>
                            <InputField
                                name="site" 
                                label="Сайт" 
                                placeholder="Сайт" 
                                width={262}
                                labelFontSize={16}
                                value={formData.site}
                                onChange={handleChange}                                  
                            />
                        </div>
                    </div>
                    <div className={fieldsRowClasses}>
                        <div className={inputContainerClasses}>
                            <InputField
                                name="phoneNumber" 
                                label="Номер телефона" 
                                placeholder="Номер телефона" 
                                width={262}
                                labelFontSize={16}
                                value={formData.phoneNumber}
                                onChange={handleChange}                                
                            />
                        </div>
                        <div className={inputContainerClasses}>
                            <InputField 
                                label="Email"
                                name="companyEmail" 
                                placeholder="company@gmail.com" 
                                width={262}
                                labelFontSize={16}
                                value={formData.companyEmail}
                                onChange={handleChange}                                  
                            />
                        </div>
                    </div>
                    <div className={fieldsRowClasses}>
                        <div className={inputContainerClasses}>
                            <SelectField 
                                label="Отрасль" 
                                options={['123','124']}
                                name="industry"
                                placeholder="Отрасль" 
                                width={262}
                                labelFontSize={16}
                                value={formData.industry}
                                onChange={handleChange}                                  
                            />
                        </div>
                        <div className={inputContainerClasses}>
                            <SelectField 
                                label="Страна" 
                                options={['РФ', 'США', 'ОАЭ']}
                                name="country"
                                placeholder="Страна" 
                                width={262}
                                labelFontSize={16}
                                value={formData.country}
                                onChange={handleChange}                                  
                            />
                        </div>
                    </div> 
                    <div className="pt-[20px] w-[200px]">
                        <MultipleSelectField 
                            label="Регионы предоставления услуг" 
                            options={['НСК','СПБ', "МСК", "ЕКБ"]}
                            name="regions"
                            placeholder="" 
                            width={548}
                            labelFontSize={16}
                            isNeedRadio
                            value={formData.regions}
                            onChange={handleChange}                              
                        />   
                    </div>
                </div>
                <div className="pt-[20px]">
                    <h2 className={sectionTitleClasses}>Платежная информация</h2>
                    <div className={fieldsRowClasses}>
                        <div className={inputContainerClasses}>
                            <InputField 
                                name="inn"
                                label="ИНН" 
                                placeholder="ИНН" 
                                width={262}
                                labelFontSize={16}
                                value={formData.inn}
                                onChange={handleChange}                                 
                            />
                        </div>
                        <div className={inputContainerClasses}>
                            <SelectField 
                                name="taxForm"
                                options={["ОСН","УСН","ЕСХН","ПСН","НПД","АУСН"]}
                                label="Форма налогооблажения" 
                                placeholder="Форма налогооблажения" 
                                width={262}
                                labelFontSize={16}
                                value={formData.taxForm}
                                onChange={handleChange}                                   
                            />
                        </div>
                    </div>
                    <div className={fieldsRowClasses}>
                        <div className={inputContainerClasses}>
                            <InputField
                                name="currentAccount" 
                                label="Расчетный счет" 
                                placeholder="Расчетный счет" 
                                width={262}
                                labelFontSize={16}
                                value={formData.currentAccount}
                                onChange={handleChange}                                   
                            />
                        </div>
                        <div className={inputContainerClasses}>
                            <InputField 
                                label="Корреспондентский счет"
                                name="corAccount" 
                                placeholder="Корреспондентский счет" 
                                width={262}
                                labelFontSize={16}
                                value={formData.corAccount}
                                onChange={handleChange}                                   
                            />
                        </div>
                    </div>
                    <div className="pt-[20px]">
                        <InputField 
                            label="БИК" 
                            name="bic"
                            placeholder="БИК" 
                            width={262}
                            labelFontSize={16}
                            value={formData.bic}
                            onChange={handleChange}                              
                        /> 
                    </div>
                
                </div>                            
            </div>
        </div>
        <Button type="submit" className={saveButtonClasses}>
            Сохранить
        </Button>
    </form>    
    </>)
}

export default PartnerProfileForm;