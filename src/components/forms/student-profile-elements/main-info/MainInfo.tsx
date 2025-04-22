import { DateField } from "@/components/fields/date/DateField";
import InputField from "@/components/fields/input/InputField"
import { SelectField } from "@/components/fields/select/SelectField";
import City from "@/types/Cities";
import Region from "@/types/Region";
import { SelectOption } from "@/types/SelectOption";
import { StudentFormData } from "@/types/StudentProfileData";
import { transformToOptions } from "@/utils/dataTransform";
import { ChangeEvent } from "react";

interface Props{
    formData: StudentFormData
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
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
    handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    genderOptions: SelectOption[];
    familyStatusOptions: SelectOption[];
    isWorkOptions: SelectOption[];
    languageProfiencyOptions: SelectOption[];
    newCityOptions: City[];
    newRegionOptions: Region[];
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
    familyStatusOptions,
    isWorkOptions,
    languageProfiencyOptions,
    newCityOptions,
    newRegionOptions
}) => {
    const filteredCityOptions = formData.region
    ? newCityOptions.filter(city => city.region.id === Number(formData.region?.value))
    : [];
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
                        maxRows={1}
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
                        maxRows={1}
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
                        width={262}
                        labelFontSize={16}
                        value={formData?.date instanceof Date ? formData?.date?.toISOString().split("T")[0] : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.date && <p className="text-red-600 text-sm font-medium">{errors.date}</p>}                            
                </div>  
                <div className={inputContainerClasses}>
                    <SelectField
                        options={transformToOptions(genderOptions)}
                        name="gender"
                        label="Пол" 
                        placeholder="Пол" 
                        width={262}
                        labelFontSize={16}
                        value={formData.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.gender && <p className="text-red-600 text-sm font-medium">{errors.gender}</p>}                          
                </div>
            </div>
            <div className={fieldsRowClasses}>
                <div className={inputContainerClasses}>
                    <SelectField 
                        name="region"
                        options={transformToOptions(newRegionOptions)}
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
                        options={transformToOptions(filteredCityOptions)}
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
            <div>
                <SelectField
                    name="languageProfiency"
                    value={formData.languageProfiency}
                    options={transformToOptions(languageProfiencyOptions)}
                    width={262}
                    labelFontSize={16}
                    label="Владение иностранными языками"
                    placeholder="Владение иностранными языками"
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </div>                                   
        </div>
    )
}

export default MainInfo;