"use client";
import NewFooter from "@/components/new-footer/NewFooter";
import NewHeader from "@/components/new-header/NewHeader";
import Faq from "@/components/partners-page-items/faq/Faq";
import WhatGivesStudmart from "@/components/partners-page-items/what-gives-studmart/WhatGivesStudmart";
import InCooperation from "@/components/partners-page-items/in-cooperation/InCooperation";
import { Button } from "@mui/base";
import { useAuth } from "@/context/AuthContext";

const PartnersPage = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div>Загрузка...</div>;
    }    
    return (
        <>
        <div 
            className="border bg-[#f8f8f8]
            box-border flex justify-start             
            items-center flex-col min-w-[1600px] 
            border-solid border-[rgba(0,0,0,0.20)]"
        >
            <NewHeader isAuthenticated={isAuthenticated}/>
            <div 
                className="flex flex-col 
                items-center 
                min-w-[1280px]"
            >
                <div 
                    className="w-[100.00%] box-border 
                    mt-[25px] px-[39px]"
                > 
                    <div className="grow-0 shrink-0 basis-auto">
                        <InCooperation/>
                        <WhatGivesStudmart/>
                        <div 
                            className="relative grow-0 shrink-0 basis-auto pb-[41px] pl-[199px] pt-[120px]"
                        >
                            <img 
                                src="/icons/partners/access-procent.svg"
                                className="absolute z-20 pt-[190px] transform -translate-x-[114px]"
                            />
                            <div 
                                className="relative z-10 bg-[#f0e9e2] box-border flex justify-center 
                                items-stretch flex-col max-w-[802px] pl-[62px] pr-[60px] py-10 rounded-[30px]"
                            >
                                <p 
                                    className="[font-family:'Nunito_Sans',sans-serif] text-5xl font-extrabold 
                                    tracking-[1.44px] text-center leading-[48px] text-[#032c28] 
                                    self-center grow-0 shrink-0 basis-auto m-0 p-0"
                                >
                                    Бесплатный тестовый доступ до 31 декабря 2025 года.
                                </p>
                                <Button 
                                    className="border bg-[#f8f8f8] [font-family:Mulish,sans-serif] text-sm 
                                    font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[588px] h-12 
                                    cursor-pointer block box-border grow-0 shrink-0 basis-auto 
                                    ml-[45px] mr-[47px] mt-10 rounded-[15px] border-solid border-[rgba(0,0,0,0.20)]"
                                >
                                    Оставить заявку
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Faq/>  
                </div>  
            </div>
            <div className="max-w-7xl w-full">
                <NewFooter isAuthenticated={isAuthenticated}/>
            </div>
        </div>
        </>
    )
}

export default PartnersPage;
