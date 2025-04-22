import Navigation from "../footer/elements/navigation/Navigation";
import Contacts from "../footer/elements/contacts/Contacts";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface NewFooterProps {
    isAuthenticated: boolean;
}

const NewFooter = ({ isAuthenticated }: NewFooterProps) => {
    const { logout } = useAuth();
    return (
        <footer className="bg-[#f0e9e2] flex flex-col w-full mt-32 px-10 py-10 rounded-t-[30px]">
            <div className="flex flex-row justify-start">
                <div className="w-1/4 pb-36">
                    <Image 
                        src="/icons/footer/logo.svg" 
                        alt="Логотип" 
                        className="h-[59px] w-[282px] block" 
                    />
                </div>
                <div className="flex flex-row justify-center items-start w-3/4 pl-40">
                    <Contacts/>
                    <Navigation isAuthenticated={isAuthenticated} logout={logout}/>
                </div>
            </div>
        
            <div className="flex flex-row justify-between items-end mt-10">
                <p className="font-mulish text-sm text-[#032c28] pt-4 pl-4">
                    Политика конфиденциальности
                </p>
                <p className="font-mulish text-sm text-right text-[#032c28]">
                    Политика управления<br />
                    персональными данными и cookies
                </p>
            </div>
        </footer>
    )
}
export default NewFooter;