"use client";
import { useState } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const personalDataItems = [
    "Университет",
    "Специальность",
    "Курс",
    "Наличие места работы",
    "Регион проживания",
    "Город проживания",
    "Дата рождения",
    "Пол",
    "Семейное положение",
    "Владение иностранными языками"
];

const PolicyPage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeStates, setActiveStates] = useState<{ [key: string]: boolean }>(
        Object.fromEntries(personalDataItems.map(item => [item, false]))
    );

    const toggleItem = (item: string) => {
        setActiveStates(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };
    const CustomSwitch = styled(Switch)(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        display: "flex",
        alignItems: "center",
      
        "& .MuiSwitch-switchBase": {
          padding: 2,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#032C28",
            "& + .MuiSwitch-track": {
              backgroundColor: "#8FE248",
              borderColor: "#8FE248",
              opacity: 1,
              border: "1px solid #032C28",
            },
          },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 9.75,
            height: 9.75,
            backgroundColor: "#032C28",
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: 1.5, // Подогнано под центр
          },
        "& .MuiSwitch-track": {
          borderRadius: 13,
          border: "1px solid #032C28",
          backgroundColor: "transparent",
          opacity: 1,
          boxSizing: "border-box",
        },
      }));
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
                    Управление данными
                </h3>

                <div className="flex flex-row gap-5 mb-5">
                    <button
                        className="bg-[#F8F8F8] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                        uppercase text-[#032c28] min-w-[262px] h-12 cursor-pointer block box-border 
                        grow-0 shrink-0 basis-auto rounded-[15px] border border-[rgba(0,0,0,0.20)]"
                        onClick={() => setIsExpanded(prev => !prev)}
                    >
                        Категории и услуги
                    </button>
                    <button
                        className="bg-[#F8F8F8] font-[Mulish] text-sm font-bold tracking-[0.42px] 
                        uppercase text-[#032c28] min-w-[262px] h-12 cursor-pointer block box-border 
                        grow-0 shrink-0 basis-auto rounded-[15px] border border-[rgba(0,0,0,0.20)]"
                        onClick={() => setIsExpanded(prev => !prev)}
                    >
                        Персональные данные
                    </button>
                </div>

                {isExpanded && (
                    <div className="grid grid-cols-2 gap-3">
                        {personalDataItems.map(item => (
                            <div
                                key={item}
                                onClick={() => toggleItem(item)}
                                className="flex justify-between items-center px-4 py-2 
                                rounded-[10px] border text-sm font-medium cursor-pointer 
                                bg-white text-[#032C28] border-[rgba(0,0,0,0.2)] font-[Mulish] min-h-[48px]"
                            >
                                {item}
                                <CustomSwitch
                                    checked={activeStates[item]}
                                    onChange={() => toggleItem(item)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PolicyPage;
