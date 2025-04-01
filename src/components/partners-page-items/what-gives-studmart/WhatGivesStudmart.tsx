import NeedStudmartItem from "@/components/pages/about-page-elements/need-studmart-item/NeedStudmartItem";

const WhatGivesStudmart = () => {
    return (
        <div 
        className="relative flex justify-start 
        items-stretch flex-col w-[100.00%] 
        box-border mt-[18px]"
    >
        <div 
            className="bg-[#8fe248] box-border
            flex justify-start 
            items-stretch flex-col 
            grow-0 shrink-0 basis-auto 
            px-[29px] py-[30px] rounded-[30px]"
        >
            <p 
                className="[font-family:'Nunito_Sans',sans-serif]
                text-2xl font-extrabold
                text-[#032c28] grow-0 shrink-0
                basis-auto m-0 p-0"
            >
                Что дает «Студмарт»?
            </p>
                <div 
                    className="flex justify-between
                    items-start flex-row gap-6 
                    grow-0 shrink-0 basis-auto mt-5 items-stretch relative z-[20]"
                >
                    <NeedStudmartItem 
                        url="/icons/partners/clients.svg"
                        width={267}
                        p1={"Понятная база потенциальных клиентов"}
                        p2={"Мы уже собрали точную аудиторию — это студенты и "}
                        p3={"представители образовательных организаций."}
                    />
                    <NeedStudmartItem 
                        url="/icons/partners/chart.svg"
                        width={267}
                        p1={"Анализ ЦА и настроенные рассылки"}
                        p2={"Можно следить за статистикой предложения: сколько человек"}
                        p3={"воспользовались, где учатся и чем они увлекаются"}

                    />
                    <NeedStudmartItem 
                        url="/icons/partners/graph.svg"
                        width={267}
                        p1={"Платформа для продвижения"}
                        p2={"Мы рекламируем и развиваем свой сервис — параллельно "}
                        p3={"рассказываем аудитории о бизнесе партнеров."}

                    />
                    <NeedStudmartItem 
                        url="/icons/partners/money.svg"
                        width={267}
                        p1={"Дешевая регистрация"}
                        p2={"До 31 декабря 2025 года регистрация бесплатная."}
                        p3={"С 2026-го предложим тарифы: от 40 до 120 000 рублей в год."}

                    />
                </div>
            <img src="/icons/partners/what-gives.svg" className="absolute bottom-0 right-0 z-[1]"/>
        </div>
    </div>
    )
}
export default WhatGivesStudmart;