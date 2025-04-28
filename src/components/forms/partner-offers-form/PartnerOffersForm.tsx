"use client"
import { profileCardClasses, profileTitleClasses } from "@/app/partner-personal-account/context";
import Image from "next/image";
import { UploadFile } from "./icons/UploadFile";
import InputField from "@/components/fields/input/InputField";
import { Button } from "@mui/base";
const pClass = "font-[Mulish] text-[#032C28] mb-[10px]"
export const saveButton = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-5 rounded-[15px] border-[none]";

const PartnerOffersForm: React.FC = () => {
    return(
    <>
           <div  className={profileCardClasses} style={{gap: '20px'}}>
            <h3 className={profileTitleClasses}>Профиль партнера</h3>
            <div>                
                <p className={pClass}>Фотография компании</p>
                <div className="m-[0 auto] text-center w-[547px] h-[244px] relative">
                    <Image 
                        src="/icons/home/chocolate.png" 
                        width={547} 
                        height={244} 
                        alt="" 
                        className="blur-[2px] rounded-[15px] relative z-10"
                    />
                    <button onClick={() => console.log('123')}>                    
                        <UploadFile 
                            className="w-[40px] h-[40px] mx-auto 
                            absolute top-1/2 left-1/2 transform 
                            -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer" 
                        />
                    </button>

                </div>

            </div>   
            <InputField
                label="Описание компании"
                placeholder="Описание компании"
                width={547}
                minRows={6}
                maxRows={12}
            />
            <Button type="submit" className={saveButton}>
                Сохранить
            </Button>
        </div> 
    </>
 
        
    )
}

export default PartnerOffersForm;