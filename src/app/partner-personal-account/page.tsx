"use client";

import PartnerProfileForm from "@/components/forms/partner-profile-form/PartnerProfileForm";
import StudentPersonalAccountMenu from "@/components/menu/partner-personal-account-menu/PartnerPersonalAccountMenu";
import NewHeader from "@/components/new-header/NewHeader";
import { useAuth } from "@/context/AuthContext";


const PartnerPersonalAccount = () => {

    const { isAuthenticated, isLoading } = useAuth();

    const containerClasses = "border bg-[#f8f8f8] box-border flex justify-start items-center flex-col min-w-[1600px] border-solid border-[rgba(0,0,0,0.20)]";
    const contentWrapperClasses = "flex flex-row items-center min-w-[1280px] pt-[40px] gap-[40px] pb-[120px]";

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={containerClasses}>
            <NewHeader isAuthenticated={isAuthenticated}/>
            <div className={contentWrapperClasses}>
                <StudentPersonalAccountMenu/>
                <PartnerProfileForm/>
            </div>
        </div>
    );
};

export default PartnerPersonalAccount;