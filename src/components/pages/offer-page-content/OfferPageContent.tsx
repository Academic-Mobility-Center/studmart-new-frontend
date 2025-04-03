import { Button } from "@mui/base";
import TermsOfUse from "../offer-page-elements/terms-of-use/TermsOfUse";
import DiscountBox from "../offer-page-elements/discount-box/DiscountBox";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { DiscountModal } from "../offer-page-elements/discount-modal/DiscountModal";


const OfferPageContent = () => {
    const onClick = () => {console.log(1223)}
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
    <div className="flex flex-col items-center min-w-[1280px]">
        <div className="w-[100.00%] box-border mt-[25px] px-[40px]">
            <div className="flex justify-start items-stretch flex-col w-[100.00%] box-border">
                <div className="flex justify-start items-start flex-row grow-0 shrink-0 basis-auto mt-[25px]">
                    <div className="w-[589px] grow-0 shrink-0 basis-auto box-border pb-[11px]">
                        <div className="w-[100.00%] box-border">
                            <img
                                src="/icons/offer/image.svg"
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
                                    Шоколадница
                                </p>
                                <p 
                                    className="[font-family:Mulish,sans-serif] 
                                    text-base font-bold text-[#032c28] mt-2.5 m-0 p-0"
                                >
                                    Сеть кофеен
                                </p>
                                <p 
                                    className="[font-family:Mulish,sans-serif] 
                                    text-sm font-normal text-left text-[#032c28] 
                                    max-w-[479px] box-border mt-5 m-0 p-0"
                                >
                                    "Шоколадница" — одна из самых известных и любимых сетей кофеен в России, которая уже более 20 лет радует своих гостей уютной атмосферой, вкусным кофе и изысканными десертами. Это
                                    место, где каждый может насладиться качественными напитками, авторскими десертами и сытными блюдами в комфортной обстановке.
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
                            <Button 
                                className="bg-[#8fe248] 
                                [font-family:Mulish,sans-serif] 
                                text-sm font-bold tracking-[0.42px] 
                                uppercase text-[#032c28] min-w-[282px] 
                                h-12 w-[282px] cursor-pointer block box-border 
                                mt-5 rounded-[15px] border-[none]"
                            >
                                Перейти на сайт
                            </Button>
                        </div>
                    </div>
                    <div className="box-border flex justify-start items-start flex-col gap-[30px] w-[588px] grow-0 shrink-0 basis-auto">
                        <DiscountBox 
                            title={"-15% на покупку от 700 руб."} 
                            description={"Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!"}
                            onClick={openModal}
                        />
                        <DiscountBox 
                            title={"-15% на покупку от 700 руб."} 
                            description={"Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!"}
                            onClick={openModal}
                        />
                        <DiscountBox 
                            title={"-15% на покупку от 700 руб."} 
                            description={"Не упустите возможность порадовать себя вкусным кофе и десертами по специальной цене!"}
                            onClick={openModal}
                        />
                    </div>
                </div>
            </div>  
        </div>
        <DiscountModal isOpen={isModalOpen} closeModal={closeModal}/>
    </div>
    )
}

export default OfferPageContent;

