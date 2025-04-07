"use client";

import InputField from "@/components/fields/input/InputField";
import StudentPersonalAccountMenu from "@/components/menu/partner-personal-account-menu/PartnerPersonalAccountMenu";
import NewHeader from "@/components/new-header/NewHeader";
import { useAuth } from "@/context/AuthContext";
// import PartnerPersonalAccount from "@/types/PartnerPesonalAccount";
import { Button, Input } from "@mui/base";
import { useState } from "react";

const PartnerPersonalAccount = () => {
    const [formData, setFormData] = useState({
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
        inn: 0,
        taxForm: "",
        currentAccount: 0,
        corAccount: 0,
        bic: 0
    })

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div>Загрузка...</div>;
    }    


    return(
        <>
            <div 
                className="border bg-[#f8f8f8]
                box-border flex justify-start             
                items-center flex-col min-w-[1600px] 
                border-solid border-[rgba(0,0,0,0.20)]"
            >
                <NewHeader isAuthenticated={isAuthenticated}/>
                <div className="flex flex-row items-center min-w-[1280px] pt-[40px] gap-[40px]">
                    <StudentPersonalAccountMenu/>
                    <div className="border bg-[#f8f8f8] box-border flex justify-start items-stretch flex-col grow-0 shrink-0 basis-auto pl-[19px] pr-5 py-5 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]">
                        <div className="grow-0 shrink-0 basis-auto">
                            <p className="[font-family:'Nunito_Sans',sans-serif] text-2xl font-extrabold text-[#032c28] m-0 p-0">Профиль партнера</p>
                            <div className="mt-5">
                                <div>
                                    <p className="[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0">Логин и пароль</p>
                                    <div className="flex justify-center items-start flex-row mt-5 gap-[24px]">
                                        <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
                                            <InputField label="Почта" placeholder="ivanov@gmail.com" width={262}/>

                                        </div>
                                        <div className="box-border flex justify-start items-start flex-col gap-[7px] w-[262px] grow-0 shrink-0 basis-auto">
                                            <InputField label="Пароль" placeholder="********" width={262}/>
                                        </div>
                                    </div>
                                    <p className="[font-family:Mulish,sans-serif] text-sm font-normal underline text-[#888888] mt-[5px] m-0 pl-[286px] pr-[46px] p-0">Сменить пароль</p>
                                </div>
                                {/* <PaymentInformationSection /> */}
                            </div>
                        </div>                        
                        <Button className="bg-[#8fe248] [font-family:Mulish,sans-serif] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto mt-10 rounded-[15px] border-[none]">
                            Сохранить
                        </Button>
                    </div>                    
                </div>                
            </div>                   
        </>
    )
}

export default PartnerPersonalAccount;