import Footer from "@/components/footer";
import NewHeader from "@/components/new-header/NewHeader";
import AboutTheSystem from "../about-page-elements/about-the-system/AboutTheSystem";
import NeedStudmart from "../about-page-elements/need-studmart/NeedStudmart";
import Faq from "../about-page-elements/faq/Faq";
import NewFooter from "@/components/new-footer/NewFooter";


const AboutPage = () => {
    return(
        <div className="min-w-[1600px] bg-[#f8f8f8] flex flex-col items-center h-screen">
            <NewHeader />
            <div 
                className="flex flex-col 
                items-center 
                min-w-[1280px] pb-[105px]"
            >
                <div 
                    className="w-[100.00%] box-border 
                    mt-[25px] px-[39px]"
                > 
                    <div className="w-[100.00%] box-border">
                        <AboutTheSystem/>
                        <NeedStudmart/>
                            {/* <div 
                                className="mt-[-114px] self-end
                                grow-0 shrink-0 basis-auto"
                            >
                                <img 
                                src="/assets/image_d0d8480f.png" 
                                className="h-[137px] max-w-[initial] 
                                object-cover w-[448px] box-border 
                                block ml-[-9px] mr-[-9px] border-[none]" 
                            />
                            </div> */}
                    </div>
                    {/* <Faq/> */}
                </div>  
                {/* <NewFooter/> */}
                {/* <Footer/>                 */}
            </div>
        </div>
    )
}


export default AboutPage;