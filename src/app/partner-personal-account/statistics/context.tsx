"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import StatisticFormData, { EventStatItem } from "@/types/StatisticFormData";
import Region from "@/types/Region";
import University from "@/types/University";
import City from "@/types/Cities";
import Country from "@/types/Country";

const country: Country = {
    id: 1,
    name: "Россия"
};

export const regionOptions: Region[] = [
    { 
        id: 1, 
        name: "Новосибирская область",
        country
    },
    { 
        id: 2, 
        name: "Москва",
        country
    },
    { 
        id: 3, 
        name: "Санкт-Петербург",
        country
    },
];

export const cityOptions: City[] = [
    {
        id: 1,
        name: "Новосибирск",
        region: regionOptions[0]
    },
    {
        id: 2,
        name: "Москва",
        region: regionOptions[1]
    },
    {
        id: 3,
        name: "Санкт-Петербург",
        region: regionOptions[2]
    },
];

export const universityOptions: University[] = [
    {
        id: 1,
        name: "Московский Государственный Университет",
        shortName: "МГУ",
        city: cityOptions[1]
    },
    {
        id: 2,
        name: "Новосибирский Государственный Университет",
        shortName: "НГУ",
        city: cityOptions[0]
    },
    {
        id: 3,
        name: "Санкт-Петербургский Государственный Университет",
        shortName: "СПбГУ",
        city: cityOptions[2]
    },
];

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

const defaultEventStats = {
    visitors: { value: 2000, percentage: 32, isUp: true },
    repeatVisits: { value: 1567, percentage: 12, isUp: false },
    uniqueVisitors: { value: 1800, percentage: 13, isUp: true },
    promocodes: { value: 521, percentage: 19, isUp: true },
    repeatPromocodes: { value: 346, percentage: 15, isUp: true },
    siteVisits: { value: 168, percentage: 19, isUp: true },
};

type StatisticContextType = {
  formData: StatisticFormData;
  setFormData: React.Dispatch<React.SetStateAction<StatisticFormData>>;
};

const StatisticContext = createContext<StatisticContextType | null>(null);
export const useStatistic = () => {
  const context = useContext(StatisticContext);
  if (!context) {
    throw new Error("useStatistic must be used within a StatisticProvider");
  }
  return context;
};

export const StatisticProvider = ({ children }: { children: React.ReactNode }) => {
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

  const updateFormData = useCallback(
    <K extends keyof StatisticFormData>(key: K, value: StatisticFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  useEffect(() => {
    const [start, end] = formData?.dateRange;
    if (!start || !end) return;

    const fetchStats = async () => {
      let regionMultiplier = formData.region ? 0.7 : 1;
      let universityMultiplier = formData.university ? 0.5 : 1;
      const totalMultiplier = regionMultiplier * universityMultiplier;

      const simulatedFetch = (key: string) =>
        new Promise<any>((resolve) => {
          setTimeout(() => {
            switch (key) {
              case "demography":
                resolve(defaultDemographyData.map(item => ({
                  ...item,
                  male: Math.floor(item.male * totalMultiplier),
                  female: Math.floor(item.female * totalMultiplier),
                })));
                break;
              case "geography":
                resolve(defaultGeographyData.map(item => ({
                  ...item,
                  value: +(item.value * totalMultiplier).toFixed(2),
                })));
                break;
              case "devices":
                resolve(defaultDevicesData.map(item => ({
                  ...item,
                  value: Math.floor(item.value * totalMultiplier),
                })));
                break;
              case "eventStats":
                const randomStat = (base: number): EventStatItem => {
                  const value = Math.floor(base * totalMultiplier);
                  const percentage = Math.floor(Math.random() * 50);
                  const isUp = Math.random() > 0.5;
                  return { value, percentage, isUp };
                };
                resolve({
                  visitors: randomStat(2000),
                  repeatVisits: randomStat(1567),
                  uniqueVisitors: randomStat(1800),
                  promocodes: randomStat(521),
                  repeatPromocodes: randomStat(346),
                  siteVisits: randomStat(168),
                });
                break;
              default:
                resolve([]);
            }
          }, 800);
        });

      const [demographyData, geographyData, devicesData, eventStats] = await Promise.all([
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
  }, [formData.dateRange, formData.region, formData.university, updateFormData]);

  return (
    <StatisticContext.Provider value={{ formData, setFormData }}>
      {children}
    </StatisticContext.Provider>
  );
};
