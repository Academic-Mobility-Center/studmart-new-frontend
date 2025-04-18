"use client";

import StatisticFormData from "@/types/StatisticFormData";
import { createContext, useContext, useState } from "react";

type StatisticFormContextType = {
    formData: StatisticFormData;
    setFormData: React.Dispatch<React.SetStateAction<StatisticFormData>>;
};

const StatisticFormContext = createContext<StatisticFormContextType | undefined>(undefined);

const defaultDemographyData = [
    { age: "17-20", male: 15, female: 10 }, { age: "21-23", male: 20, female: 25 },
    { age: "24-26", male: 75, female: 35 }, { age: "27-30", male: 55, female: 53 },
    { age: ">30", male: 15, female: 3 },
];

const defaultGeographyData = [
    { city: "Москва", value: 40.26 }, { city: "Санкт-Петербург", value: 17.99 },
    { city: "Казань", value: 2.82 }, { city: "Нижний Новгород", value: 2.82 },
    { city: "Прочие", value: 33.29 },
];

const defaultDevicesData = [
    { name: "Просмотры с мобильных", value: 75 },
    { name: "Просмотры с компьютеров", value: 25 },
];



const defaultEventStats = {
    visitors: { value: 2000, percentage: 32, isUp: true },
    repeatVisits: { value: 1567, percentage: 12, isUp: false },
    uniqueVisitors: { value: 1800, percentage: 13, isUp: true },
    promocodes: { value: 521, percentage: 19, isUp: true },
    repeatPromocodes: { value: 346, percentage: 15, isUp: true },
    siteVisits: { value: 168, percentage: 19, isUp: true },
};

export const StatisticFormProvider = ({ children }: { children: React.ReactNode }) => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1)
    const [formData, setFormData] = useState<StatisticFormData>({
        region: undefined,
        university: undefined,
        dateRange: [oneMonthAgo, today],
        geographyData: defaultGeographyData,
        demographyData: defaultDemographyData,
        devicesData: defaultDevicesData,
        eventStats: defaultEventStats
    });

    return (
        <StatisticFormContext.Provider value={{ formData, setFormData }}>
            {children}
        </StatisticFormContext.Provider>
    );
};

export const useStatisticForm = () => {
    const context = useContext(StatisticFormContext);
    if (!context) {
        throw new Error("useStatisticForm must be used within a StatisticFormProvider");
    }
    return context;
};
