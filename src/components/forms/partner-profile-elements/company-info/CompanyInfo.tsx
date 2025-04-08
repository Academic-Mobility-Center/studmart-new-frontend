import InputField from "@/components/fields/input/InputField";
import { MultipleSelectField } from "@/components/fields/multiple-select/MultipleSelectField";
import { SelectField } from "@/components/fields/select/SelectField";
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount";
import { ChangeEvent } from "react";

interface Props{
    formData: PartnerPersonalAccountFormData
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: {
        companyName?: string;
        site?: string;
        phoneNumber?: string;
        companyEmail?: string;
        industry?: string;
        country?: string;
        regions?: string[];
    }
}
const sectionTitleClasses = "[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0";
const fieldsRowClasses = "flex justify-center items-start flex-row mt-5 gap-[24px]";
const inputContainerClasses = "box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto ";

const CompanyInfo: React.FC<Props> = ({
    formData,
    handleChange,
    errors
}) => {
    return(<>
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
                            {errors.companyName && <p className="text-red-600 text-sm font-medium">{errors.companyName}</p>}                              
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
                            {errors.site && <p className="text-red-600 text-sm font-medium">{errors.site}</p>}                            
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
                            {errors.phoneNumber && <p className="text-red-600 text-sm font-medium">{errors.phoneNumber}</p>}                            
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
                            {errors.companyEmail && <p className="text-red-600 text-sm font-medium">{errors.companyEmail}</p>}                                                        
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
                            {errors.industry && <p className="text-red-600 text-sm font-medium">{errors.industry}</p>}                            
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
                            {errors.country && <p className="text-red-600 text-sm font-medium">{errors.country}</p>}                            
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
                        {errors.regions && <p className="text-red-600 text-sm font-medium">{errors.regions}</p>}                        
                    </div>
                </div>    
    </>)
}

export default CompanyInfo;