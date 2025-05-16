"use client"
import DiscountBox from "../offer-page-elements/discount-box/DiscountBox";
import { useEffect, useState } from "react";
import { DiscountModal } from "../offer-page-elements/discount-modal/DiscountModal";
import Image from "next/image";
import { getPromocodePartnerByIdAndRegionId } from "@/lib/api/promocodes";
import { PartnerWithIdType } from "@/app/partner-personal-account/context";
import { useCity } from "@/context/CityContext";
interface Props{
    imageUrl: string;
    partnerId: string;
    isAuth: boolean
}

interface PromoCode {
    id: string;
    title: string;
    description: string;
    code: string;
    partnerName: string; 
}
const PartnerOfferContent = ({ imageUrl, partnerId, isAuth}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState<PromoCode | undefined>(undefined);
    const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
    const [partnerData, setPartnerData] = useState<PartnerWithIdType | null>(null);
    const {regionId} = useCity();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const partnerInfo = await getPromocodePartnerByIdAndRegionId(partnerId, regionId);
                console.log("partnerInfo", partnerInfo)
                setPartnerData(partnerInfo);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [partnerId, regionId, setPartnerData]);

    useEffect(() => {
        if (partnerData?.discounts && partnerData.discounts.length > 0) {
            const mapped = partnerData?.discounts?.map((discount) => ({
                id: discount.id,
                title: discount.name,
                description: discount.description,
                code: discount.promocodeValue,
                partnerName: discount.partner.companyName,
            }));
            setPromoCodes(mapped);
        } 
    }, [partnerData?.discounts]);

    const openModal = (promo: PromoCode) => {
        setSelectedPromo(promo);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    
    return (
        <div className="flex flex-col items-center min-w-[1280px]">
            <div className="w-[100.00%] box-border mt-[25px] px-[40px]">
                <div className="flex justify-start items-stretch flex-col w-[100.00%] box-border">
                    <div className="flex justify-start items-start flex-row grow-0 shrink-0 basis-auto mt-[25px]">
                        <div className="w-[589px] grow-0 shrink-0 basis-auto box-border pb-[11px]">
                            <div className="w-[100.00%] box-border">
                            <Image
                                src={imageUrl}
                                alt=""
                                width={589}
                                height={260}
                                quality={100}
                                priority
                                className="border h-[260px] 
                                object-cover w-full 
                                rounded-[30px] border-solid 
                                border-[rgba(0,0,0,0.20)]"
                            />
                                <div className="w-[100.00%] box-border mt-5">
                                    <p 
                                        className="[font-family:'Nunito_Sans',sans-serif] 
                                        text-4xl font-extrabold tracking-[1.08px] leading-9 
                                        text-[#032c28] m-0 p-0"
                                    >
                                        {partnerData?.companyName}
                                    </p>
                                    <p 
                                        className="[font-family:Mulish,sans-serif] 
                                        text-base font-bold text-[#032c28] mt-2.5 m-0 p-0"
                                    >
                                        {partnerData?.subtitle}
                                    </p>
                                    <p 
                                        className="[font-family:Mulish,sans-serif] 
                                        text-sm font-normal text-left text-[#032c28] 
                                        max-w-[479px] box-border mt-5 m-0 p-0"
                                    >
                                        {partnerData?.description}
                                    </p>
                                </div>
                            </div>
                            <div className="w-[100.00%] box-border mt-5">
                                <a
                                    href={partnerData?.site}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#8fe248] hover:bg-[#7ece38] transition-colors duration-300
                                    [font-family:Mulish,sans-serif] 
                                    text-sm font-bold tracking-[0.42px] 
                                    uppercase text-[#032c28] min-w-[282px] 
                                    h-12 w-[282px] cursor-pointer block box-border 
                                    mt-5 rounded-[15px] border-[none]
                                    flex items-center justify-center no-underline
                                    hover:shadow-md"
                                >
                                    Перейти на сайт
                                </a>                                
                            </div>
                        </div>
                        <div className="box-border flex justify-start items-start flex-col gap-[30px] w-[588px] grow-0 shrink-0 basis-auto">
                            {promoCodes.map((promo) => (
                                <DiscountBox 
                                    key={promo.id}
                                    title={promo.title}
                                    description={promo.description}
                                    onClick={() => openModal(promo)}
                                    isAuth={isAuth}
                                />
                            ))}
                        </div>
                    </div>
                </div>  
            </div>
            <DiscountModal 
                isOpen={isModalOpen} 
                closeModal={closeModal}
                promoCode={selectedPromo}
                userInfo={{
                    name: "Максим Орлов",
                    university: "Белгородский университет кооперации, экономики и права"
                }}
            />
        </div>
    )
}

export default PartnerOfferContent;

