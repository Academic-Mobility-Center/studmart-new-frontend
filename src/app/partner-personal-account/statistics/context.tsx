"use client";
export const regionOptions: Region[] = [
    { 
        id: 1, 
        name: "Новосибирская область",
    },
    { 
        id: 2, 
        name: "Москва",
    },
    { 
        id: 3, 
        name: "Санкт-Петербург",
        
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

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import StatisticFormData from "@/types/StatisticFormData";
import Region from "@/types/Region";
import University from "@/types/University";
import City from "@/types/Cities";
import { useCity } from "@/context/CityContext";
import {
  getPartnerRegions,
} from "@/lib/api/partners";
import { getEvents, getUsersDevices, getUsersCities, getUsersDemography } from "@/lib/api/statistics";
import { getStudentUniversities } from "@/lib/api/students";
import {useAuth} from "@/context/AuthContext"
type StatisticContextType = {
  formData: StatisticFormData | null;
  setFormData: React.Dispatch<React.SetStateAction<StatisticFormData | null>>;
  regions: Region[];
  universities: University[];
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
  const { regionId } = useCity();
  const {id} = useAuth();
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [formData, setFormData] = useState<StatisticFormData | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);

  const updateFormData = useCallback(
    <K extends keyof StatisticFormData>(key: K, value: StatisticFormData[K]) => {
      setFormData((prev) => prev ? { ...prev, [key]: value } : null);
    },
    []
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [fetchedRegions, fetchedUniversities] = await Promise.all([
          getPartnerRegions(),
          getStudentUniversities(),
        ]);

        setRegions(fetchedRegions);
        setUniversities(fetchedUniversities);

        const dateRange: [Date, Date] = [oneMonthAgo, today];
        console.log("id", id)
        const events = await getEvents({
          From: oneMonthAgo.toISOString().split("T")[0], 
          To: today.toISOString().split("T")[0],
          RegionId: regionId ?? undefined, 
          UniversityId: undefined, 
          PartnerId: id && id.trim() !== "" ? id : undefined
        });

        setFormData({
          region: undefined,
          university: undefined,
          dateRange,
          geographyData: events.geography,
          demographyData: events.demography,
          devicesData: events.devices,
          eventStats: events.stats,
        });
      } catch (error) {
        console.warn("Ошибка при загрузке данных:", error);
      }
    };
    if (id && id.trim() !== "") {
      fetchInitialData();
    }

  }, [id]);

  useEffect(() => {
    const fetchUpdatedStats = async () => {
      if (!formData || !formData.dateRange[0] || !formData.dateRange[1]) return;
  
      const [start, end] = formData.dateRange;
  
      const regionValue = formData.region?.value?.toString() ?? regionId?.toString() ?? undefined;
      const universityValue = formData.university?.value?.toString() ?? undefined;
  
      try {
        const [events, demography, geography, devices] = await Promise.all([
          getEvents({
            From: start.toISOString().split("T")[0],
            To: end.toISOString().split("T")[0],
            RegionId: regionValue,
            UniversityId: universityValue,
            PartnerId: id && id.trim() !== "" ? id : undefined
          }),
          getUsersDemography({
            IsSex: "true",
            From: start.toISOString().split("T")[0],
            To: end.toISOString().split("T")[0],
            PartnerId: id && id.trim() !== "" ? id : undefined
          }),
          getUsersCities({
            IsCities: "true",
            From: start.toISOString().split("T")[0],
            To: end.toISOString().split("T")[0],
            PartnerId: id && id.trim() !== "" ? id : undefined
          }),
          getUsersDevices({
            IsDevices: "true",
            From: start.toISOString().split("T")[0],
            To: end.toISOString().split("T")[0],
            PartnerId: id && id.trim() !== "" ? id : undefined,
          })
        ]);
  
        updateFormData("demographyData", demography);
        updateFormData("geographyData", geography);
        updateFormData("devicesData", devices);
        updateFormData("eventStats", events);
      } catch (error) {
        console.warn("Ошибка при обновлении статистики:", error);
      }
    };
    if (id && id.trim() !== ""){
      fetchUpdatedStats();
    }
  }, [
    formData?.dateRange,
    formData?.region?.value,
    formData?.university?.value,
    regionId, // добавлено
    updateFormData,
    id]);
  

  return (
    <StatisticContext.Provider value={{ formData, setFormData, regions, universities }}>
      {children}
    </StatisticContext.Provider>
  );
};
