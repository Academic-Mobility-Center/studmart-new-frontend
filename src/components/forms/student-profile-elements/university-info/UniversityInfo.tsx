import InputField from "@/components/fields/input/InputField";
import { SelectField } from "@/components/fields/select/SelectField";
import { SelectOption } from "@/types/SelectOption";
import { StudentFormData } from "@/types/StudentProfileData";
import { transformToOptions } from "@/utils/dataTransform";
import { ChangeEvent } from "react";

interface Props{
    formData: StudentFormData
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: {
        university: string[];
        profession: string,
        course: string[]
    }
    handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    universityOptions: SelectOption[];
    courseOptions: SelectOption[];
}

const sectionTitleClasses = "[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0";
const fieldsRowClasses = "flex justify-center items-start flex-row mt-5 gap-[24px]";
const inputContainerClasses = "box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto ";

const UniversityInfo: React.FC<Props> = ({
    formData, handleBlur, handleChange, universityOptions, courseOptions, errors
}) => {
    return(<>
        <div className="">
            <h2 className={sectionTitleClasses}>Личная информация</h2>
            <div className={fieldsRowClasses}>
                <div className={inputContainerClasses}>
                    <SelectField 
                        name="firstName"
                        label="Имя" 
                        placeholder="Имя" 
                        width={262}
                        labelFontSize={16}
                        value={formData.university}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={transformToOptions(universityOptions)}
                    />
                    {errors.university && <p className="text-red-600 text-sm font-medium">{errors.university}</p>}                            
                </div>
                <div className={inputContainerClasses}>
                    <InputField 
                        name="industry"
                        label="Специальность" 
                        placeholder="Специальность" 
                        width={262}
                        labelFontSize={16}
                        value={formData.profession}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.profession && <p className="text-red-600 text-sm font-medium">{errors.profession}</p>}                          
                </div>
            </div>
            <div>
                <SelectField 
                    name="course"
                label="Курс" 
                placeholder="Курс" 
                width={262}
                labelFontSize={16}
                value={formData.course}
                onChange={handleChange}
                onBlur={handleBlur}
                    options={transformToOptions(courseOptions)}
                />
                {errors.course && <p className="text-red-600 text-sm font-medium">{errors.course}</p>}   
            </div>                                 
        </div>    
    </>)
}

export default UniversityInfo;