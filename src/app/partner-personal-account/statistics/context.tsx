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
import { PartnerProfileData } from "@/app/partner-personal-account/context";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {getPartnerInfo} from "@/lib/api/partners"
import StatisticFormData from "@/types/StatisticFormData";
import Region from "@/types/Region";
import University from "@/types/University";
import City from "@/types/Cities";
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
  partnerId: string;
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
  const { id } = useAuth();
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [formData, setFormData] = useState<StatisticFormData | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [partner, setPartner] = useState<PartnerProfileData | null>(null);
  const [partnerId, setPartnerId] = useState("")
  const updateFormData = useCallback(
    <K extends keyof StatisticFormData>(key: K, value: StatisticFormData[K]) => {
      setFormData((prev) => (prev ? { ...prev, [key]: value } : null));
    },
    []
  );

  // Загружаем партнёра отдельно
  useEffect(() => {
    const fetchPartnerInfo = async () => {
      if (!id) return;
      try {
        const partnerData = await getPartnerInfo(id);
        setPartner(partnerData);
        setPartnerId(partnerData?.partner?.id)
      } catch (error) {
        console.warn("Ошибка при загрузке партнёра:", error);
      }
    };

    fetchPartnerInfo();
  }, [id]);

  // Загружаем начальные данные (регионы, университеты и первую статистику)
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!id || !partner?.partner?.id) return;

      try {
        const [fetchedRegions, fetchedUniversities] = await Promise.all([
          getPartnerRegions(),
          getStudentUniversities(),
        ]);
        setRegions(fetchedRegions);
        setUniversities(fetchedUniversities);

        const dateRange: [Date, Date] = [oneMonthAgo, today];

        const events = await getEvents({
          From: oneMonthAgo.toISOString().split("T")[0],
          To: today.toISOString().split("T")[0],
          RegionId: undefined,
          UniversityId: undefined,
          PartnerId: partner.partner.id,
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

    fetchInitialData();
  }, [id, partner?.partner?.id]);

  useEffect(() => {
    const fetchUpdatedStats = async () => {
      if (!formData || !partner?.partner?.id) return;

      const [start, end] = formData.dateRange;
      const regionValue = formData.region?.value?.toString() ?? undefined;
      const universityValue = formData.university?.value?.toString();

      try {
        const [events, demography, geography, devices] = await Promise.all([
          getEvents({
            From: start?.toISOString().split("T")[0],
            To: end?.toISOString().split("T")[0],
            RegionId: regionValue,
            UniversityId: universityValue,
            PartnerId: partner.partner.id,
          }),
          getUsersDemography({
            IsSex: "true",
            From: start?.toISOString().split("T")[0],
            To: end?.toISOString().split("T")[0],
            PartnerId: partner.partner.id,
          }),
          getUsersCities({
            IsCities: "true",
            From: start?.toISOString().split("T")[0],
            To: end?.toISOString().split("T")[0],
            PartnerId: partner.partner.id,
          }),
          getUsersDevices({
            IsDevices: "true",
            From: start?.toISOString().split("T")[0],
            To: end?.toISOString().split("T")[0],
            PartnerId: partner.partner.id,
          }),
        ]);

        updateFormData("eventStats", events);
        updateFormData("demographyData", demography);
        updateFormData("geographyData", geography);
        updateFormData("devicesData", devices);
      } catch (error) {
        console.warn("Ошибка при обновлении статистики:", error);
      }
    };

    fetchUpdatedStats();
  }, [
    formData?.dateRange,
    formData?.region?.value,
    formData?.university?.value,
    updateFormData,
    partner?.partner?.id,
  ]);

  return (
    <StatisticContext.Provider value={{ formData, setFormData, regions, universities, partnerId }}>
      {children}
    </StatisticContext.Provider>
  );
};