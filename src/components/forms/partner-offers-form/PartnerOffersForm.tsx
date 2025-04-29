"use client"
import { profileCardClasses, profileTitleClasses } from "@/app/partner-personal-account/context";
import InputField from "@/components/fields/input/InputField";
import { Button } from "@mui/base";
const pClass = "font-[Mulish] text-[#032C28] mb-[10px]"
export const saveButton = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-5 rounded-[15px] border-[none]";
import ImageUploader from "@/utils/imageUpload";
const PartnerOffersForm: React.FC = () => {
    return(
    <>
           <div  className={profileCardClasses} style={{gap: '20px'}}>
            <h3 className={profileTitleClasses}>Профиль партнера</h3>
            <div>                
                <p className={pClass}>Фотография компании</p>
                <ImageUploader 
                    width={547}
                    height={244}
                    blurDefault={false}
                    containerClassName="mx-auto border-2 border-gray-200"
                />
            </div>   
            <InputField
                label="Описание компании"
                placeholder="Описание компании"
                width={547}
                minRows={6}
                maxRows={12}
            />
            <Button type="submit" className={saveButton}>
                Отправить на модерацию
            </Button>
        </div> 
    </>
 
        
    )
}

export default PartnerOffersForm;