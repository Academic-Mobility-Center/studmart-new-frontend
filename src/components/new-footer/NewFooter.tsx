import { Input } from "@mui/base";
import Navigation from "../footer/elements/navigation/Navigation";
import Contacts from "../footer/elements/contacts/Contacts";

const NewFooter = () => {
    return (
        <div className="bg-[#f0e9e2] box-border flex justify-center items-stretch flex-col w-[100.00%] mt-[120px] px-[39px] py-10 rounded-[30px_30px_0px_0px]">
            <div className="flex justify-start items-stretch flex-row grow-0 shrink-0 basis-auto">
                <div className="w-[24.79%] grow-0 shrink-0 basis-auto box-border pb-[143px]">
                    <img 
                    src="/icons/footer/logo.svg" 
                    alt="" 
                    className="h-[59px] max-w-[initial] w-[282px] block box-border" />
                </div>
                <div 
                    className="flex justify-center 
                    items-start flex-row w-[75.21%] 
                    grow-0 shrink-0 basis-auto 
                    box-border pl-[172px]"
                >
                    <Contacts/>
                    <Navigation/>
                </div>
            </div>
        
            <div 
                className="flex justify-between
                items-end flex-row
                gap-2 grow-0 shrink-0
                basis-auto mt-10"
            >
                <p 
                    className="[font-family:Mulish,sans-serif] 
                    text-sm font-normal text-[#032c28] grow-0 
                    shrink-0 basis-auto m-0 pt-[18px] p-0"
                >
                    Политика конфиденциальности
                </p>
                <p 
                    className="[font-family:Mulish,sans-serif] 
                    text-sm font-normal text-right 
                    text-[#032c28] grow-0 shrink-0 basis-auto m-0 p-0"
                >
                    Политика управления
                    <br />
                    персональными данными и cookies
                </p>
            </div>
        </div>
    )
}
export default NewFooter;