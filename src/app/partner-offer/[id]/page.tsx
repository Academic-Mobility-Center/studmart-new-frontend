"use client";

import NewFooter from "@/components/new-footer/NewFooter";
import NewHeader from "@/components/new-header/NewHeader";
import OfferPageContent from "@/components/pages/offer-page-content/OfferPageContent";
import PartnerOfferContent from "@/components/pages/partner-offer-content/PartnerOfferContent";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface PartnerOffer {
    id: string;
    heading: string;
    subHeading: string;
    description: string;
    url: string;
    imageUrl: string;
  }

const PartnerOffer = () => {
    const router = useRouter();

    const params = useParams();
    const id = params?.id as string;
    const { isAuthenticated, isLoading } = useAuth();

    // здесь fetch
    const partnerOffers: PartnerOffer[] = [
        {
          id: "1",
          heading: "Шоколадница",
          subHeading: "Сеть кофеен",
          description: "Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!",
          url: "https://shoko.ru/",
          imageUrl: "/icons/partners/chocolate.png"
        },
    ];    

    const currentOffer = partnerOffers.find(offer => offer.id === id);
    useEffect(() => {
        if (id && !currentOffer) {
            router.push('/home');
        }
    }, [id, currentOffer, router]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!currentOffer) {
        return null;
    }
    if (isLoading) {
      return <div>Загрузка...</div>;
    }

    return (
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
                <PartnerOfferContent
                    heading={currentOffer.heading}
                    subHeading={currentOffer.subHeading}
                    description={currentOffer.description}
                    url={currentOffer.url}
                    imageUrl={currentOffer.imageUrl}
                    partnerId={id}
                />
            </div>
            <div className="max-w-7xl w-full">
                <NewFooter isAuthenticated={isAuthenticated}/>
            </div>
        </div>
    );
};

export default PartnerOffer;

        // {
        //   id: "2",
        //   heading: "Золотое Яблоко",
        //   subHeading: "Сеть парфюмерно-косметических магазинов",
        //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt ex id consequat sagittis. Proin dolor est, rhoncus eu dolor nec, posuere dictum quam. Donec et cursus eros, et mattis lectus. Nunc non lectus molestie, porttitor leo vel, malesuada diam. Praesent pretium tellus dolor, et hendrerit nunc feugiat vel. Ut rutrum ullamcorper orci, non facilisis metus tristique vitae. Praesent scelerisque lectus interdum lectus ornare bibendum. In ac lacus molestie, molestie sapien in, aliquet justo. Nam consectetur eleifend risus in ornare. Pellentesque accumsan auctor eros, eu convallis dolor efficitur ut. Sed eu vulputate eros. In ac dapibus quam. Maecenas mi tortor, aliquet ut magna nec, bibendum aliquet velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam blandit turpis nulla, nec egestas augue mattis a. Nunc blandit feugiat lacus aliquet tempus",
        //   url: "https://goldapple.ru/",
        //   imageUrl: "/icons/partners/golden-apple.png"

        // },
        // {
        //   id: "3",
        //   heading: "Рив Гош",
        //   subHeading: "Парфюмерия и косметика",
        //   description: "Эксклюзивные предложения на премиальную косметику и парфюмерию в магазинах Рив Гош!",
        //   url: "https://rivegauche.ru/",
        //   imageUrl: "/icons/partners/cosmetic.png"

        // }