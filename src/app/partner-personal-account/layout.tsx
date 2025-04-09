import StudentPersonalAccountMenu from "@/components/menu/partner-personal-account-menu/PartnerPersonalAccountMenu";
import NewHeader from "@/components/new-header/NewHeader";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
    const containerClasses = "border bg-[#f8f8f8] box-border flex justify-start items-center flex-col min-w-[1600px] border-solid border-[rgba(0,0,0,0.20)]";
    const contentWrapperClasses = "flex flex-row items-center min-w-[1280px] pt-[40px] gap-[40px] pb-[120px]";    
    return (
        <div className={containerClasses}>
            <NewHeader isAuthenticated={true} />
            <div className={contentWrapperClasses}>
                <StudentPersonalAccountMenu />
                {children}
            </div>
        </div>
    );
}
