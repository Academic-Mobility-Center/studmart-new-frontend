"use client";
import { useState } from "react";
import { BlackArrowUp } from "./icons/BlackArrowUp";
import { BlackArrowDown } from "./icons/BlackArrowDown";
import { SelectField } from "@/components/fields/select/SelectField";
import { transformToOptions } from "@/utils/dataTransform";
import InputField from "@/components/fields/input/InputField";
import { FaqQuestions, faqCategoryOptionsPartner } from "../context";
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
import MarkdownRenderer from "@/components/MarkdownRenderer";

const FaqPage = () => {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (role && role !== "Employee") {
            router.replace("/student-personal-account");
        }
    }, [role, router]);
    const [expandedStates, setExpandedStates] = useState<{ [key: string]: boolean }>(
        Object.fromEntries(FaqQuestions.map(item => [item.title, false]))
    );
    const toggleExpand = (heading: string) => {
        setExpandedStates(prev => ({
            ...prev,
            [heading]: !prev[heading]
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
                    Часто задаваемые вопросы
                </h3>
                <div className="flex flex-col gap-5">
                    {FaqQuestions.map(({ title, text}) => {
                        const isExpanded = expandedStates[title];
                        return (
                            <div
                                key={title}
                                className="w-[548px] rounded-[15px] 
                                    border border-[rgba(0,0,0,0.20)] 
                                    bg-[#F8F8F8] text-[#032C28] p-5 font-[Mulish]"
                            >
                                <div className="flex flex-row justify-between font-extrabold">
                                    <p>{title}</p>
                                    <div className="flex flex-row justify-between gap-5 items-center">
                                        <div onClick={() => toggleExpand(title)} className="cursor-pointer">
                                            {isExpanded ? <BlackArrowUp /> : <BlackArrowDown />}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <article className="mt-5 text-[14px]"><MarkdownRenderer content={text} /></article>
                                    )}                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className="border bg-[#f8f8f8] box-border 
                flex justify-start items-stretch flex-col grow-0 
                shrink-0 basis-auto pl-5 pr-5 rounded-[15px] 
                border-solid border-[rgba(0,0,0,0.20)] w-[588px] pb-5 "
            >
                <p
                    className="font-['Nunito_Sans'] text-[24px] 
                    font-extrabold text-[#032c28] m-0 p-0 mt-5  w-[413px]"
                >
                    Не нашли ответ?
                </p>
                <p
                    className="font-['Nunito_Sans'] text-[24px] 
                    font-extrabold text-[#032c28] m-0 p-0 mb-5 w-[413px]"
                >
                    Задайте свой вопрос.
                </p>
                <div className="flex flex-col gap-5">
                <SelectField
                    width={548}
                    label="Выберете категорию вопроса"
                    placeholder="Категория вопроса"
                    options={transformToOptions(faqCategoryOptionsPartner)}
                    labelFontSize={14}
                    name="category"
                />
                <InputField 
                    width={548}
                    name="question"
                    placeholder="Введите вопрос..."
                    labelFontSize={14}
                    label="Вопрос"
                    minRows={1}
                    maxRows={10}
                />
                <button type="submit" className="bg-[#8fe248] font-[Mulish] text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] min-w-[548px] mt-5 h-12 cursor-pointer block box-border grow-0 shrink-0 basis-auto rounded-[15px] border-[none]">
                    Отправить
                </button>
                </div>

            </div>
        </div>)
}

export default FaqPage;