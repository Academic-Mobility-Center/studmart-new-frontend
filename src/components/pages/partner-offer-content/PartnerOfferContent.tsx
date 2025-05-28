"use client"
import DiscountBox from "../offer-page-elements/discount-box/DiscountBox";
import { useEffect, useState } from "react";
import { DiscountModal } from "../offer-page-elements/discount-modal/DiscountModal";
import Image from "next/image";
import { getPromocodePartnerByIdAndRegionId, getPromocodeDiscountByDiscountIdAndStudentId } from "@/lib/api/promocodes";
import { PartnerWithIdType } from "@/app/partner-personal-account/context";
import { useCity } from "@/context/CityContext";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PersonalPromocode from "../../../types/PersonalPromocode"
import {useAuth} from "@/context/AuthContext"
interface Discount{
    id: string;
    name: string;
    description: string;
    size: number;
    promocodeValue: string;
    partner: {
        id: string;
        companyName: string;
        subtitle: string;
        maxDiscount: number;
        isFixed: boolean;
    };
    hasAllRegions: boolean;
    regions: [];
}
interface Props{
    imageUrl: string;
    partnerId: string;
    isAuth: boolean
    role: string | null
}

const PartnerOfferContent = ({ imageUrl, partnerId, isAuth, role}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState<PersonalPromocode | undefined>(undefined);
    const [personalPromocodes, setPersonalPromocodes] = useState<PersonalPromocode[]>([])
    const [partnerData, setPartnerData] = useState<PartnerWithIdType | null>(null);
    const {regionId} = useCity();
    const [discountsIds, setDiscountsIds] = useState<string[]>([])
    const {id} = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const partnerInfo = await getPromocodePartnerByIdAndRegionId(partnerId, regionId);
                setPartnerData(partnerInfo);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [partnerId, regionId, setPartnerData]);
    useEffect(() => {
        if (partnerData?.discounts) {
            const ids = partnerData.discounts.map((d: Discount) => String(d.id));
            setDiscountsIds(ids);
        }
    }, [partnerData]);
    
    useEffect(() => {
        const fetchDiscounts = async () => {
            if (!discountsIds.length) return;
    
            try {
                const results: PersonalPromocode[] = [];
    
                for (const discountId of discountsIds) {
                    try {
                        const promocode = await getPromocodeDiscountByDiscountIdAndStudentId(discountId, id ?? "");
                        results.push(promocode);
                    } catch (error) {
                        console.error(`Ошибка при получении промокода для discountId: ${discountId}`, error);
                    }
                }
    
                setPersonalPromocodes(results);
            } catch (error) {
                console.error("Ошибка при получении промокодов:", error);
            }
        };
        if (id) {
            fetchDiscounts();
        }
                                        {/* <p 
            className="[font-family:Mulish,sans-serif] 
            text-sm font-normal text-left text-[#032c28] 
            mt-2.5 m-0 p-0"
        >
            {description}
        </p> */}
    }, [discountsIds, id]);

    const openModal = (promo: PersonalPromocode) => {
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
                                    <article className="[font-family:Mulish,sans-serif] prose font-normal text-left text-[#032c28] max-w-[479px] mt-5">
                                        <MarkdownRenderer content={partnerData?.description} />
                                    </article>
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
                            {personalPromocodes.map((promo, index) => (
                                <DiscountBox 
                                    key={index}
                                    title={promo.discount?.name}
                                    description={promo.discount.description}
                                    onClick={() => openModal(promo)}
                                    isAuth={isAuth}
                                    role={role}
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
            />
        </div>
    )
}

export default PartnerOfferContent;

