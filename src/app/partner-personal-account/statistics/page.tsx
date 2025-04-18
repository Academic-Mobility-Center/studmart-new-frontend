"use client";
import { useState, useEffect, useCallback } from "react";
import StatisticUsers from "@/components/forms/statistics-form/StatisticUsers";
import StatisticEvents from "@/components/forms/statistics-form/StatisticEvents";
import StatisticFormData, { EventStatItem } from "@/types/StatisticFormData";

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
    { name: "Просмотры с мобильных", value: 75 },
    { name: "Просмотры с компьютеров", value: 25 },
];

const universityOptions = [
    { id: 1, name: "Россия" },
    { id: 2, name: "США" },
    { id: 3, name: "ОАЭ" },
];

const regionOptions = [
    { id: 1, name: "НСК" },
    { id: 2, name: "СПБ" },
    { id: 3, name: "МСК" },
    { id: 4, name: "ЕКБ" },
];

const defaultEventStats = {
    visitors: { value: 2000, percentage: 32, isUp: true },
    repeatVisits: { value: 1567, percentage: 12, isUp: false },
    uniqueVisitors: { value: 1800, percentage: 13, isUp: true },
    promocodes: { value: 521, percentage: 19, isUp: true },
    repeatPromocodes: { value: 346, percentage: 15, isUp: true },
    siteVisits: { value: 168, percentage: 19, isUp: true },
};

const StatisticsPage = () => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const [formData, setFormData] = useState<StatisticFormData>({
        region: undefined,
        university: undefined,
        dateRange: [oneMonthAgo, today],
        geographyData: defaultGeographyData,
        demographyData: defaultDemographyData,
        devicesData: defaultDevicesData,
        eventStats: defaultEventStats,
    });

    const [selectedTab, setSelectedTab] = useState<"users" | "events">("users");

    const updateFormData = useCallback(
        <K extends keyof StatisticFormData>(key: K, value: StatisticFormData[K]) => {
            setFormData((prev) => ({ ...prev, [key]: value }));
        },
        []
    );

    useEffect(() => {
        const [start, end] = formData?.dateRange;
    
        const fetchStats = async () => {
            if (!start || !end) return;
        
            const region = formData.region?.value ?? "ALL";
            const university = formData.university?.value ?? "ALL";
            const startDate = start.toISOString();
            const endDate = end.toISOString();
        
            const simulatedFetch = (key: string) =>
                new Promise<any>((resolve) => {
                    setTimeout(() => {
                        const regionMultiplier = region === "МСК" ? 1.2 : region === "НСК" ? 0.8 : 1;
                        const universityBias = university === "Россия" ? 1 : university === "США" ? 1.1 : 0.9;
        
                        switch (key) {
                            case "demography":
                                resolve(defaultDemographyData.map((item) => ({
                                    ...item,
                                    male: Math.floor(Math.random() * 50 * regionMultiplier * universityBias),
                                    female: Math.floor(Math.random() * 50 * regionMultiplier),
                                })));
                                break;
                            case "geography":
                                resolve(defaultGeographyData.map((item) => ({
                                    ...item,
                                    value: +(Math.random() * 30 * regionMultiplier).toFixed(2),
                                })));
                                break;
                            case "devices":
                                const mobile = Math.floor((Math.random() * 30 + 50) * (region === "НСК" ? 1.1 : 1));
                                resolve([
                                    { name: "Мобильные", value: Math.min(mobile, 100) },
                                    { name: "Компьютеры", value: Math.max(100 - mobile, 0) },
                                ]);
                                break;
                            case "eventStats":
                                const randomStat = (): EventStatItem => {
                                    const base = Math.floor(Math.random() * 2000);
                                    const value = Math.floor(base * regionMultiplier * universityBias);
                                    const percentage = Math.floor(Math.random() * 50);
                                    const isUp = Math.random() > 0.5;
                                    return { value, percentage, isUp };
                                };
                                resolve({
                                    visitors: randomStat(),
                                    repeatVisits: randomStat(),
                                    uniqueVisitors: randomStat(),
                                    promocodes: randomStat(),
                                    repeatPromocodes: randomStat(),
                                    siteVisits: randomStat(),
                                });
                                break;
                            default:
                                resolve([]);
                        }
                    }, 800);
                });
        
            const [
                demographyData,
                geographyData,
                devicesData,
                eventStats,
            ] = await Promise.all([
                simulatedFetch("demography"),
                simulatedFetch("geography"),
                simulatedFetch("devices"),
                simulatedFetch("eventStats"),
            ]);
        
            updateFormData("demographyData", demographyData);
            updateFormData("geographyData", geographyData);
            updateFormData("devicesData", devicesData);
            updateFormData("eventStats", eventStats);
        };
        
    
        fetchStats();
    }, [formData?.dateRange, formData.region, formData.university, updateFormData]);
    
    return (
        <div
            className="border bg-[#f8f8f8] 
            box-border px-[19px] py-5 rounded-[15px] 
            border-solid border-[rgba(0,0,0,0.20)] 
            max-w-[590px]"
        >
            <p className="font-nunito text-2xl font-extrabold text-[#032c28] m-0 p-0">
                Статистика
            </p>

            <div className="mt-5">
                <div className="flex justify-start items-center flex-row">
                    <button
                        onClick={() => setSelectedTab("users")}
                        className={`h-12 w-[262px] rounded-[15px] text-sm font-bold 
                            uppercase tracking-[0.42px] cursor-pointer ${
                            selectedTab === "users"
                                ? "bg-[#8fe248] text-[#032c28]"
                                : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"
                        }`}
                    >
                        Пользователи
                    </button>
                    <button
                        onClick={() => setSelectedTab("events")}
                        className={`ml-6 h-12 w-[262px] rounded-[15px] text-sm font-bold 
                            uppercase tracking-[0.42px] cursor-pointer ${
                            selectedTab === "events"
                                ? "bg-[#8fe248] text-[#032c28]"
                                : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"
                        }`}
                    >
                        События
                    </button>
                </div>

                {selectedTab === "events" && (
                    <StatisticEvents
                        universityOptions={universityOptions}
                        regionOptions={regionOptions}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {selectedTab === "users" && (
                    <StatisticUsers
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </div>
        </div>
    );
};

export default StatisticsPage;
