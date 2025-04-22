import { Dialog } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react"

interface PromoCode {
    id: string;
    title: string;
    description: string;
    code: string; // Добавляем поле для кода промокода
    partnerName?: string; // Название партнера (опционально)
}

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    promoCode?: PromoCode; // Принимаем объект промокода
    userInfo?: { // Информация о пользователе (опционально)
        name: string;
        university: string;
    };
}

export const DiscountModal: React.FC<Props> = ({ isOpen, closeModal, promoCode, userInfo }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (promoCode?.code) {
            navigator.clipboard.writeText(promoCode.code).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 flex items-center justify-center z-50">
            <div className="backdrop-blur-[5px] bg-[rgba(0,0,0,0.10)] fixed inset-0" onClick={closeModal}></div>
            <div className="relative bg-[#f0e9e2] border border-[rgba(0,0,0,0.20)] rounded-[30px] pt-[30px] px-[29px] w-[588px] shadow-lg">
                <div className="w-full">
                    <p className="text-[24px] font-extrabold text-[#032c28] m-0 p-0 tracking-widest">
                        {promoCode?.title || "Промокод"}
                    </p>
                    <p className="text-sm text-[#032c28] mt-2.5 max-w-[370px]">
                        {promoCode?.description || "Описание промокода"}
                    </p>
                    {promoCode?.code && (
                        <>
                            <div className="border bg-[#f8f8f8] flex justify-between items-end gap-2 w-full mt-5 p-4 rounded-[20px] border-[rgba(0,0,0,0.20)]">
                                <div>
                                    <p className="text-sm text-[#888888]">Промокод</p>
                                    <p className="text-2xl font-bold text-[#032c28] mt-1">
                                        {promoCode.code}
                                    </p>
                                </div>
                                <button className="w-8 h-8 cursor-pointer" onClick={copyToClipboard}>
                                    <Image src="/icons/offer/copy.svg" alt="Копировать промокод" />
                                </button>
                            </div>
                            {copied && <p className="text-green-600 text-sm mt-2">Промокод скопирован!</p>}
                        </>
                    )}
                </div>
                <div className="flex justify-start items-start flex-row mt-10">
                    <div className="pb-[29px] w-full">
                        <div className="flex flex-col gap-5 w-[356px]">
                            {userInfo?.name && (
                                <div className="flex flex-col gap-[5px] w-[148px]">
                                    <p className="text-sm text-[#888888]">Пользователь</p>
                                    <p className="text-xl font-bold text-[#032c28]">{userInfo.name}</p>
                                </div>
                            )}
                            {userInfo?.university && (
                                <div className="flex flex-col gap-[5px]">
                                    <p className="text-sm text-[#888888]">Университет</p>
                                    <p className="text-xl font-bold text-[#032c28]">{userInfo.university}</p>
                                </div>
                            )}
                            {promoCode?.partnerName && (
                                <div className="flex flex-col gap-[5px]">
                                    <p className="text-sm text-[#888888]">Партнер</p>
                                    <p className="text-xl font-bold text-[#032c28]">{promoCode.partnerName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <Image alt="" src="/icons/offer/lines2.svg" className="h-[102px] w-[245px] object-cover mt-[150px] ml-[-50px]" />
                </div>
            </div>
        </Dialog> 
    )
}