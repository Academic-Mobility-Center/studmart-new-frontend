"use client";
import { DateRangeField } from "@/components/fields/date/DateRangeField";
import { useState, useEffect } from "react";
import { GeographyChart } from "@/components/statistics/GeographyChart";
import { DevicesChart } from "@/components/statistics/DevicesChart";
import { DemographyChart } from "@/components/statistics/DemographyChart";


const defaultDemographyData = [
    { age: "17-20", male: 15, female: 10 },
    { age: "21-23", male: 20, female: 25 },
    { age: "24-26", male: 75, female: 35 },
    { age: "27-30", male: 55, female: 53 },
    { age: ">30", male: 15, female: 3 },
];

const defaultGeographyData = [
    { city: "Москва", value: 40.26 },
    { city: "Санкт-Петербург", value: 17.99 },
    { city: "Казань", value: 2.82 },
    { city: "Нижний Новгород", value: 2.82 },
    { city: "Прочие", value: 33.29 },
];

const defaultDevicesData = [
    { name: "Мобильные", value: 75 },
    { name: "Компьютеры", value: 25 },
];
  
const COLORS = ["#8fe248", "#FFD55A"];
const StatisticsPage = () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [demographyData, setDemographyData] = useState(defaultDemographyData);
    const [geographyData, setGeographyData] = useState(defaultGeographyData);
    const [devicesData, setDevicesData] = useState(defaultDevicesData);
    const [selectedTab, setSelectedTab] = useState<"users" | "events">("users");

    useEffect(() => {
        if (dateRange[0] && dateRange[1]) {
          // Здесь можно заменить на fetch API:
          // fetch(`/api/statistics?from=${dateRange[0].toISOString()}&to=${dateRange[1].toISOString()}`)
    
          const randomize = () => Math.floor(Math.random() * 80) + 10;
    
          setDemographyData((prev) =>
            prev.map((item) => ({
              ...item,
              male: randomize(),
              female: randomize(),
            }))
          );
    
          setGeographyData((prev) =>
            prev.map((item) => ({
              ...item,
              value: +(Math.random() * 30 + 5).toFixed(2),
            }))
          );
    
          const mobile = Math.floor(Math.random() * 50) + 50;
          setDevicesData([
            { name: "Мобильные", value: mobile },
            { name: "Компьютеры", value: 100 - mobile },
          ]);
        }
      }, [dateRange]);

    return (
        <div 
            className="border bg-[#f8f8f8] 
            box-border px-[19px] py-5 rounded-[15px] 
            border-solid border-[rgba(0,0,0,0.20)] 
            max-w-[590px]"
        >
            <p 
                className="[font-family:'Nunito_Sans',sans-serif] 
                text-2xl font-extrabold text-[#032c28] m-0 p-0"
            >
                Статистика
            </p>

            <div className="mt-5">
            <div className="flex justify-start items-center flex-row">
                <button
                onClick={() => setSelectedTab("users")}
                className={`h-12 w-[262px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer ${
                    selectedTab === "users"
                    ? "bg-[#8fe248] text-[#032c28]"
                    : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"
                }`}
                >
                Пользователи
                </button>
                <button
                onClick={() => setSelectedTab("events")}
                className={`ml-6 h-12 w-[262px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer ${
                    selectedTab === "events"
                    ? "bg-[#8fe248] text-[#032c28]"
                    : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"
                }`}
                >
                События
                </button>
            </div>

                <div className="flex justify-between items-end mt-10">
                    <div className="flex flex-col">
                    <DateRangeField
                        label="Выбор периода"
                        width={262}
                        labelFontSize={14}
                        value={dateRange}
                        onChange={(dates) => setDateRange(dates)}
                    />
                    </div>
                    <button 
                        className="bg-[#8fe248] [font-family:Mulish,sans-serif] 
                        text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] 
                        cursor-pointer h-12 w-[262px] rounded-[15px] border-none"
                    >
                        Экспорт статистики
                    </button>
                </div>
                {selectedTab === "users" && (
                    <>
                        <DemographyChart data={demographyData} />
                        <GeographyChart data={geographyData} />
                        <DevicesChart data={devicesData} />
                    </>
                )}
            </div>
        </div>
    );
};

export default StatisticsPage;