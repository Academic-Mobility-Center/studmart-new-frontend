"use client"
import { StyledSwitch } from "@/components/fields/switch/StyledSwitch";
import { notificationsItems } from "../context";
import { useState } from "react";

const NotificationsPage = () => {
        const [activeStates, setActiveStates] = useState<{ [key: string]: boolean }>(
            Object.fromEntries(notificationsItems.map(item => [item, false]))
        );
        const toggleItem = (item: string) => {
            setActiveStates(prev => ({
                ...prev,
                [item]: !prev[item]
            }));
        };
        const saveButtonClasses = "bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] mt-5 h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto rounded-[15px] border-[none]";

    return (
    <div className="flex flex-col gap-[40px]">
        <div
            className="border bg-[#f8f8f8] box-border 
            flex justify-start items-stretch flex-col grow-0 
            shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
            border-solid border-[rgba(0,0,0,0.20)] w-[588px] pb-5"
        >
            <h3
                className="font-['Nunito_Sans'] text-[24px] 
                font-extrabold text-[#032c28] m-0 p-0 mt-5 mb-5"
            >
                Настройка уведомлений
            </h3>
            <p className="font-[Mulish] text-[14px] text-[#032C28] mb-10">Вы можете выбрать категории предложений, которые не хотите просматривать и получать. Управлять предпочтениями вы можете в данном разделе</p>
            <div className="grid grid-cols-2 gap-3">
                {notificationsItems.map(item => (
                    <div
                        key={item}
                        onClick={() => toggleItem(item)}
                        className="flex justify-between items-center px-4 py-2 
                        rounded-[10px] border text-sm font-medium cursor-pointer 
                        bg-white text-[#032C28] border-[rgba(0,0,0,0.2)] font-[Mulish] min-h-[48px] "
                    >
                        <div className="max-w-[171px] ">{item}</div>

                        <StyledSwitch
                            checked={activeStates[item]}
                            onChange={() => toggleItem(item)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                ))}
            </div>
            <button type="submit" className={saveButtonClasses}>
                    Сохранить
            </button>
        </div>
    </div>
    )
}

export default NotificationsPage;