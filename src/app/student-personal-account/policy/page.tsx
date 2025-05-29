"use client";
import { useState, useEffect } from "react";
import { personalDataItems } from "../context";
import { StyledSwitch } from "@/components/fields/switch/StyledSwitch";
import { ArrowDown } from "./icons/ArrowDown";
import { categoriesAndServices } from "../context";
import { ArrowUp } from "./icons/ArrowUp";
const saveButtonClasses = "bg-[#EFEFEF] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] mt-5 h-12 block box-border grow-0 shrink-0 basis-auto rounded-[15px] border-[none]";
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"

const PolicyPage = () => {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (role && role !== "Student") {
            router.replace("/partner-personal-account");
        }
    }, [role, router]);
    const [categoryStates, setCategoryStates] = useState<{ [key: string]: boolean }>(
        Object.fromEntries(categoriesAndServices.map(item => [item.heading, true]))
    );
    const [selectedMenuItem, setSelectedMenuItem] = useState<"categories" | "data" | null>("categories");
    const [activeStates, setActiveStates] = useState<{ [key: string]: boolean }>(
        Object.fromEntries(personalDataItems.map(item => [item, true]))
    );
    const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>(
        Object.fromEntries(categoriesAndServices.map(item => [item.heading, false]))
    );
    const toggleExpand = (heading: string) => {
        setExpandedStates(prev => ({
            ...prev,
            [heading]: !prev[heading]
        }));
    };
    const toggleItem = (item: string) => {
        setActiveStates(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

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
                        className=" font-[Mulish] text-sm font-bold tracking-[0.42px] 
                        uppercase text-[#032c28] min-w-[262px] h-12 cursor-pointer block box-border 
                        grow-0 shrink-0 basis-auto rounded-[15px] border border-[rgba(0,0,0,0.20)]"
                        style={{backgroundColor: selectedMenuItem === "categories" ? "#efefef" : "#F8F8F8"}}
                        onClick={() => {
                            setSelectedMenuItem("categories")
                        }}
                    >
                        Категории и услуги
                    </button>
                    <button
                        className=" font-[Mulish] text-sm font-bold tracking-[0.42px] 
                        uppercase text-[#032c28] min-w-[262px] h-12 cursor-pointer block box-border 
                        grow-0 shrink-0 basis-auto rounded-[15px] border border-[rgba(0,0,0,0.20)]"
                        style={{backgroundColor: selectedMenuItem === "data" ? "#efefef" : "#F8F8F8"}}
                        onClick={() => {
                            setSelectedMenuItem("data")
                        }}
                    >
                        Персональные данные
                    </button>
                </div>

                {selectedMenuItem === "data" && (
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
                                <StyledSwitch
                                    checked={activeStates[item]}
                                    onChange={() => toggleItem(item)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {selectedMenuItem === "categories" && (
                    <div className="flex flex-col gap-5">
                        {categoriesAndServices.map(({ heading, p, p_array }) => {
                            const isExpanded = expandedStates[heading];
                            return (
                                <div
                                    key={heading}
                                    className="w-[548px] rounded-[15px] 
                                        border border-[rgba(0,0,0,0.20)] 
                                        bg-[#EFEFEF] text-[#032C28] p-5 font-[Mulish]"
                                >
                                    <div className="flex flex-row justify-between font-extrabold">
                                        <p>{heading}</p>
                                        <div className="flex flex-row justify-between gap-5 items-center">
                                        <StyledSwitch
                                            checked={categoryStates[heading]}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={() => setCategoryStates(prev => ({
                                                ...prev,
                                                [heading]: !prev[heading],
                                            }))}
                                        />
                                            <div onClick={() => toggleExpand(heading)} className="cursor-pointer">
                                                {isExpanded ? <ArrowUp /> : <ArrowDown />}
                                            </div>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <>
                                            <p className="mt-5 text-[14px]">{p}</p>
                                            <div className="flex flex-col gap-[10px] mt-5 text-[14px]">
                                                {Object.values(p_array).map((item, idx) => (
                                                    <p key={idx}>{item}</p>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
                {selectedMenuItem !== null && (                
                    <button type="submit" className={saveButtonClasses} disabled>
                    Сохранить
                    </button>
                )}
            </div>
        </div>
    );
};

export default PolicyPage;
