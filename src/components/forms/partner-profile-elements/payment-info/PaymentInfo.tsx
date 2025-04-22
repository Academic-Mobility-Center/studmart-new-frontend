import InputField from "@/components/fields/input/InputField"
import { PartnerPersonalAccountFormData } from "@/types/PartnerPesonalAccount";
import { ChangeEvent } from "react";
const sectionTitleClasses = "[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0";
const fieldsRowClasses = "flex justify-center items-start flex-row mt-5 gap-[24px]";
const inputContainerClasses = "box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto ";

interface Props{
    formData: PartnerPersonalAccountFormData
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    errors: {
        inn?: string;
        currentAccount?: string;
        corAccount?: string;
        bic?: string;
    }
    handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void

}
const PaymentInfo: React.FC<Props> = ({
    formData,
    handleChange,
    errors,
    handleBlur
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
                            onBlur={handleBlur}  
                            maxRows={1}                               
                        />
                        {errors.inn && <p className="text-red-600 text-sm font-medium">{errors.inn}</p>}
                    </div>
                    <div className={inputContainerClasses}>
                        <InputField 
                            label="БИК" 
                            name="bic"
                            placeholder="БИК" 
                            width={262}
                            labelFontSize={16}
                            value={formData.bic}
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            maxRows={1}                              
                        /> 
                        {errors.bic && <p className="text-red-600 text-sm font-medium">{errors.bic}</p>}                         
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
                            onBlur={handleBlur}
                            maxRows={1}                                
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
                            onBlur={handleBlur}
                            maxRows={1}                                    
                        />
                        {errors.corAccount && <p className="text-red-600 text-sm font-medium">{errors.corAccount}</p>}                            
                    </div>
                </div>
            </div>        
        </>
    )
}
export default PaymentInfo;