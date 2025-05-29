"use client";

import { loaderStyle } from "@/app/context";
import NewFooter from "@/components/new-footer/NewFooter";
import NewHeader from "@/components/new-header/NewHeader";
import PartnerOfferContent from "@/components/pages/partner-offer-content/PartnerOfferContent";
import { useAuth } from "@/context/AuthContext";
import { getPromocodePartners } from "@/lib/api/promocodes";
import Category from "@/types/Category";
import RegionWithoutCountry from "@/types/RegionWithoutCountry";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

interface PartnerOffer {
  id: string;
  companyName: string;
  subtitle: string;
  description: string;
  site: string;
  category: Category;
  hasAllRegions: boolean;
  regions: RegionWithoutCountry[];
}

const PartnerOffer = () => {
  const params = useParams();
  const id = params?.id as string;
  const { isAuthenticated, isLoading, role } = useAuth();
  const [currentOffer, setCurrentOffer] = useState<PartnerOffer | null>(null);
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const promoCardsArray = await getPromocodePartners();
        const found = promoCardsArray?.find((promo: PartnerOffer) => promo.id === id);
        setCurrentOffer(found);
      } catch (error) {
        console.warn("Ошибка при получении данных: ", error);
        // setCurrentOffer(defaultOffer);
      }
    };

    if (id) fetchOffer();
  }, [id]);

  if (isLoading || !currentOffer) {
    return <div className={loaderStyle}> <ClipLoader size={50} color="#36d7b7" /> </div>;
  }

  return (
    <div className="border bg-[#f8f8f8] box-border flex justify-start items-center flex-col min-w-[1600px] border-solid border-[rgba(0,0,0,0.20)]">
      <NewHeader isAuthenticated={isAuthenticated} />
      <div className="flex flex-col items-center min-w-[1280px]">
        <PartnerOfferContent
          imageUrl={`https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${id}`}
          partnerId={id}
          isAuth={isAuthenticated}
          role={role}
        />
      </div>
      <div className="max-w-7xl w-full">
        <NewFooter isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default PartnerOffer;


