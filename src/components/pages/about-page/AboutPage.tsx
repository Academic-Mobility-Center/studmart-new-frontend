"use client";
import NewHeader from "@/components/new-header/NewHeader";
import AboutTheSystem from "../about-page-elements/about-the-system/AboutTheSystem";
import NeedStudmart from "../about-page-elements/need-studmart/NeedStudmart";
import Faq from "../about-page-elements/faq/Faq";
import NewFooter from "@/components/new-footer/NewFooter";


const AboutPage = () => {
    return(
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
                        <div className="w-[100.00%] box-border">
                            <AboutTheSystem/>
                            <NeedStudmart/>

                        </div>
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


export default AboutPage;