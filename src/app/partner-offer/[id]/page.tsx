"use client";

import NewFooter from "@/components/new-footer/NewFooter";
import NewHeader from "@/components/new-header/NewHeader";
import OfferPageContent from "@/components/pages/offer-page-content/OfferPageContent";
import { useParams } from "next/navigation";

const PartnerOffer = () => {
    const id = useParams();

    return (
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
                <OfferPageContent/>
            </div>
            <div className="max-w-7xl w-full">
                <NewFooter />
            </div>
        </div>
    );
};

export default PartnerOffer;