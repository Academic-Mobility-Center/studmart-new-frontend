import { DateField } from "@/components/fields/date/DateField";
import InputField from "@/components/fields/input/InputField"
import PasswordField from "@/components/fields/password/PasswordField"
import { SelectField } from "@/components/fields/select/SelectField";
import { Option } from "@/types/Option";
import { SelectOption } from "@/types/SelectOption";
import { StudentFormData } from "@/types/StudentProfileData";
import { transformToOptions } from "@/utils/dataTransform";
import { ChangeEvent } from "react";

interface Props{
    formData: StudentFormData
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: {
        firstName: string,
        lastName: string,
        date: undefined,
        gender: string[],
        region: string[],
        city: string[],
        familyStatus: string[],
        isWork: string[],
        languageProfiency: string[],
    }
    handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    genderOptions: SelectOption[];
    regionOptions: SelectOption[];
    cityOptions: SelectOption[];
    familyStatusOptions: SelectOption[];
    isWorkOptions: SelectOption[];
    languageProfiencyOptions: SelectOption[];


}
const sectionTitleClasses = "[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0";
const fieldsRowClasses = "flex justify-center items-start flex-row mt-5 gap-[24px]";
const inputContainerClasses = "box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto ";

const MainInfo: React.FC<Props> = ({
    handleChange, 
    formData, 
    errors, 
    handleBlur,
    genderOptions,
    regionOptions,
    cityOptions,
    familyStatusOptions,
    isWorkOptions,
    languageProfiencyOptions
}) => {
    return(
        <div className="">
            <h2 className={sectionTitleClasses}>Личная информация</h2>
            <div className={fieldsRowClasses}>
                <div className={inputContainerClasses}>
                    <InputField 
                        name="firstName"
                        label="Имя" 
                        placeholder="Имя" 
                        width={262}
                        labelFontSize={16}
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.firstName && <p className="text-red-600 text-sm font-medium">{errors.firstName}</p>}                            
                </div>
                <div className={inputContainerClasses}>
                    <InputField 
                        name="lastName"
                        label="Фамилия" 
                        placeholder="Фамилия" 
                        width={262}
                        labelFontSize={16}
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.lastName && <p className="text-red-600 text-sm font-medium">{errors.lastName}</p>}                          
                </div>
            </div>
            <div className={fieldsRowClasses}>
                <div className={inputContainerClasses}>
                    <DateField
                        name="date"
                        label="Дата рождения" 
                        // width={262}
                        // labelFontSize={16}
                        value={formData.date}
                        onChange={handleChange}
                        // onBlur={handleBlur}
                    />
                    {errors.date && <p className="text-red-600 text-sm font-medium">{errors.date}</p>}                            
                </div>
                <div className={inputContainerClasses}>
                    <InputField 
                        name="lastName"
                        label="Фамилия" 
                        placeholder="Фамилия" 
                        width={262}
                        labelFontSize={16}
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.lastName && <p className="text-red-600 text-sm font-medium">{errors.lastName}</p>}                          
                </div>
            </div>
            <div className={fieldsRowClasses}>
                <div className={inputContainerClasses}>
                    <SelectField 
                        name="region"
                        options={transformToOptions(regionOptions)}
                        label="Регион проживания" 
                        placeholder="Регион проживания" 
                        width={262}
                        labelFontSize={16}
                        value={formData.region}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.region && <p className="text-red-600 text-sm font-medium">{errors.region}</p>}                            
                </div>
                <div className={inputContainerClasses}>
                    <SelectField 
                        name="city"
                        options={transformToOptions(cityOptions)}
                        label="Город проживания" 
                        placeholder="Город проживания" 
                        width={262}
                        labelFontSize={16}
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.city && <p className="text-red-600 text-sm font-medium">{errors.city}</p>}                           
                </div>
            </div>
            <div className={fieldsRowClasses}>
                <div className={inputContainerClasses}>
                    <SelectField 
                        name="familyStatus"
                        options={transformToOptions(familyStatusOptions)}
                        label="Семейное положение" 
                        placeholder="Семейное положение" 
                        width={262}
                        labelFontSize={16}
                        value={formData.familyStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.familyStatus && <p className="text-red-600 text-sm font-medium">{errors.familyStatus}</p>}                            
                </div>
                <div className={inputContainerClasses}>
                    <SelectField 
                        name="isWork"
                        options={transformToOptions(isWorkOptions)}
                        label="Наличие работы" 
                        placeholder="Наличие работы" 
                        width={262}
                        labelFontSize={16}
                        value={formData.isWork}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.isWork && <p className="text-red-600 text-sm font-medium">{errors.isWork}</p>}                           
                </div>
            </div>                                    
        </div>
    )
}

export default MainInfo;