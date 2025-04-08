import InputField from "@/components/fields/input/InputField"
import { SelectField } from "@/components/fields/select/SelectField"
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount";
import { ChangeEvent } from "react";
const sectionTitleClasses = "[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0";
const fieldsRowClasses = "flex justify-center items-start flex-row mt-5 gap-[24px]";
const inputContainerClasses = "box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto ";

interface Props{
    formData: PartnerPersonalAccountFormData
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: {
        inn?: string;
        taxForm?: string;
        currentAccount?: string;
        corAccount?: string;
        bic?: string;
    }
}
const PaymentInfo: React.FC<Props> = ({
    formData,
    handleChange,
    errors
}) => {

    return(
        <>
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
                        {errors.inn && <p className="text-red-600 text-sm font-medium">{errors.inn}</p>}
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
                        {errors.taxForm && <p className="text-red-600 text-sm font-medium">{errors.taxForm}</p>}                            
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
                        {errors.currentAccount && <p className="text-red-600 text-sm font-medium">{errors.currentAccount}</p>}                            
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
                        {errors.corAccount && <p className="text-red-600 text-sm font-medium">{errors.corAccount}</p>}                            
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
                    {errors.bic && <p className="text-red-600 text-sm font-medium">{errors.bic}</p>}                        
                </div>
            </div>        
        </>
    )
}
export default PaymentInfo;