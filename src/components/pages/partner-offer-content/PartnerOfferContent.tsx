import TermsOfUse from "../offer-page-elements/terms-of-use/TermsOfUse";
import DiscountBox from "../offer-page-elements/discount-box/DiscountBox";
import { useState } from "react";
import { DiscountModal } from "../offer-page-elements/discount-modal/DiscountModal";


interface Props{
    heading: string;
    subHeading: string;
    description: string;
    url: string;
    imageUrl: string;
    partnerId: string;
}
interface PromoCode {
    id: string;
    title: string;
    description: string;
    code: string; // Код промокода
    partnerName: string; // Название партнера
}
const PartnerOfferContent = ({heading, subHeading, description, url, imageUrl, partnerId}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (promo: PromoCode) => {
        setSelectedPromo(promo);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const [selectedPromo, setSelectedPromo] = useState<PromoCode | undefined>(undefined);

    const partnerPromoCodes: Record<string, PromoCode[]> = {
        "1": [
            {
                id: "1",
                title: "-15% на покупку от 700 руб.",
                description: "Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!",
                code: "COFFEE15",
                partnerName: "Кофейня №1"
            },
            {
                id: "2",
                title: "-15% на покупку от 700 руб.",
                description: "Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!",
                code: "SWEET15",
                partnerName: "Кофейня №1"
            },
            {
                id: "3",
                title: "-15% на покупку от 700 руб.",
                description: "Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!",
                code: "WELCOME15",
                partnerName: "Кофейня №1"
            }
        ],
        "2": [
            {
                id: "1",
                title: "-20% на все меню",
                description: "Специальное предложение для постоянных клиентов!",
                code: "LOYAL20",
                partnerName: "Ресторан Премиум"
            },
            {
                id: "2",
                title: "Бесплатная доставка",
                description: "Заказы от 1000 руб. доставляются бесплатно!",
                code: "FREEDEL",
                partnerName: "Ресторан Премиум"
            },
            {
                id: "3",
                title: "Подарок к заказу",
                description: "При заказе от 1500 руб. получите бесплатный десерт!",
                code: "GIFT23",
                partnerName: "Ресторан Премиум"
            }
        ],
        "3": [
            {
                id: "1",
                title: "-10% на первый заказ",
                description: "Скидка для новых клиентов!",
                code: "NEW10",
                partnerName: "Фастфуд Оригинал"
            },
            {
                id: "2",
                title: "-25% на бизнес-ланч",
                description: "Специальное предложение с 12:00 до 16:00!",
                code: "LUNCH25",
                partnerName: "Фастфуд Оригинал"
            },
            {
                id: "3",
                title: "2 по цене 1",
                description: "При покупке двух кофе - второе бесплатно!",
                code: "2FOR1",
                partnerName: "Фастфуд Оригинал"
            }
        ]
    };
    const promoCodes = partnerPromoCodes[partnerId] || partnerPromoCodes["1"];

    return (
        <div className="flex flex-col items-center min-w-[1280px]">
            <div className="w-[100.00%] box-border mt-[25px] px-[40px]">
                <div className="flex justify-start items-stretch flex-col w-[100.00%] box-border">
                    <div className="flex justify-start items-start flex-row grow-0 shrink-0 basis-auto mt-[25px]">
                        <div className="w-[589px] grow-0 shrink-0 basis-auto box-border pb-[11px]">
                            <div className="w-[100.00%] box-border">
                                <img
                                    src={imageUrl}
                                    className="border h-[260px] 
                                    max-w-[initial] object-cover 
                                    w-[100.00%] box-border block 
                                    rounded-[30px] border-solid 
                                    border-[rgba(0,0,0,0.20)]"
                                />
                                <div className="w-[100.00%] box-border mt-5">
                                    <p 
                                        className="[font-family:'Nunito_Sans',sans-serif] 
                                        text-4xl font-extrabold tracking-[1.08px] leading-9 
                                        text-[#032c28] m-0 p-0"
                                    >
                                        {heading}
                                    </p>
                                    <p 
                                        className="[font-family:Mulish,sans-serif] 
                                        text-base font-bold text-[#032c28] mt-2.5 m-0 p-0"
                                    >
                                        {subHeading}
                                    </p>
                                    <p 
                                        className="[font-family:Mulish,sans-serif] 
                                        text-sm font-normal text-left text-[#032c28] 
                                        max-w-[479px] box-border mt-5 m-0 p-0"
                                    >
                                        {description}
                                    </p>
                                </div>
                            </div>
                            <div className="w-[100.00%] box-border mt-5">
                                <p className="[font-family:Mulish,sans-serif] text-base font-bold text-[#032c28] m-0 p-0">
                                    Условия использования:
                                </p>
                                <div className="mt-2.5 px-[11px]">
                                    <div className="box-border flex justify-start items-start flex-col gap-2.5 w-[473px]">
                                        <TermsOfUse title="Скидка действительна с [дата начала] по [дата окончания] включительно" />
                                        <TermsOfUse title="Скидка не суммируется с другими акциями и спецпредложениями" />  
                                        <TermsOfUse title="Минимальная сумма заказа для применения скидки: [сумма]" />
                                        <TermsOfUse title="Скидка не распространяется на товары из категорий: [перечень категорий или товаров]" />
                                    </div>
                                </div>
                                <a
                                    href={url}
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

