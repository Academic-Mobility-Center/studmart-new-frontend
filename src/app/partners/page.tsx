"use client";
import NewFooter from "@/components/new-footer/NewFooter";
import NewHeader from "@/components/new-header/NewHeader";
import Faq from "@/components/partners-page-items/faq/Faq";
import WhatGivesStudmart from "@/components/partners-page-items/what-gives-studmart/WhatGivesStudmart";
import InCooperation from "@/components/partners-page-items/in-cooperation/InCooperation";
import { Button } from "@mui/base";

const PartnersPage = () => {
    return (
        <>
        <div 
            className="border bg-[#f8f8f8]
            box-border flex justify-start             
            items-center flex-col min-w-[1600px] 
            border-solid border-[rgba(0,0,0,0.20)]"
        >
            <NewHeader />
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
                    <div className="flex justify-start items-start flex-row w-[100.00%] box-border">
                        <div className="flex justify-start items-stretch flex-col grow shrink-0 basis-auto pb-[25px]">
                        <div className="grow-0 shrink-0 basis-auto pr-8">
      <p className="bg-[#ffb9ff] box-border [font-family:'Nunito_Sans',sans-serif] text-5xl font-extrabold tracking-[1.44px] leading-[48px] text-[#032c28] w-[100.00%] m-0 pt-10 pb-[100px] px-[39px] p-0 rounded-[30px]">
        О сотрудничестве с нами
      </p>
    </div>
                        <div className="mt-[-70px] self-end grow-0 shrink-0 basis-auto">
                            <img src="/icons/partners/what-gives.svg" className="h-[127px] max-w-[initial] object-cover w-[411px] box-border block border-[none]" />
                        </div>
                        <div className="mt-[-107px] grow-0 shrink-0 basis-auto px-10">
                            <div className="bg-[#fee200] box-border flex justify-center items-center flex-row gap-2.5 w-[504px] px-[30px] py-5 rounded-[30px]">
                            <p className="[font-family:Mulish,sans-serif] text-xl font-bold text-left text-[#032c28] grow shrink basis-auto m-0 p-0">
                                Как привлечь постоянных клиентов и стать известнее? Присоединиться к программе
                            </p>
                            </div>
                        </div>
                        </div>
                        <img src="/icons/partners/main.svg" alt="" className="h-[231px] max-w-[initial] w-[268px] block box-border ml-[1.25px]" />
                    </div>
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
                    {/* <div className="w-[100.00%] box-border">
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
                    </div> */}
                    <Faq/>  
                </div>  
            </div>
            <div className="max-w-7xl w-full">
                <NewFooter/>
            </div>
        </div>
        
    </>
    )
}

export default PartnersPage;