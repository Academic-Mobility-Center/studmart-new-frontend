import { DateRangeField } from "@/components/fields/date/DateRangeField"
import { SelectField } from "@/components/fields/select/SelectField"
import { StatCard } from "@/components/statistics/StatCard"
import StatisticFormData from "@/types/StatisticFormData"
import { transformToOptions } from "@/utils/dataTransform"
import { Dispatch, SetStateAction } from "react"

interface Props{
    regionOptions: {
        id: number;
        name: string;
    }[]
    universityOptions: {
        id: number;
        name: string;
    }[]
    formData: StatisticFormData
    setFormData: Dispatch<SetStateAction<StatisticFormData>>
}

const StatisticEvents: React.FC<Props> = ({
    regionOptions, 
    universityOptions,
    formData,
    setFormData 
}) => {
    const handleSelectChange = (name: keyof StatisticFormData) => 
        (event: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedOption = transformToOptions(
            name === "region" ? regionOptions : universityOptions
          ).find((opt) => opt.value === event.target.value) || null;
    
          setFormData((prev) => ({
            ...prev,
            [name]: selectedOption,
          }));
        };    
    return(
    <>
        <div className="flex flex-row justify-center items-start gap-[20px] mt-10">
            <SelectField
                label="Регион"
                placeholder="Регион"
                options={transformToOptions(regionOptions)}
                value={formData?.region}
                onChange={handleSelectChange("region")}
                name="region"
                width={262}
                labelFontSize={14}
            />
            <SelectField
                label="Университет"
                placeholder="Университет"
                value={formData?.university}
                options={transformToOptions(universityOptions)}
                onChange={handleSelectChange("university")}
                name="university"
                width={262}
                labelFontSize={14}
            />
        </div>
        <div className="flex justify-between items-end mt-5">
            <div className="flex flex-col">
            <DateRangeField
                label="Выбор периода"
                width={262}
                labelFontSize={14}
                value={formData?.dateRange}
                onChange={(dates) => setFormData(prev => ({ ...prev, dateRange: dates }))}
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
        <div className="flex flex-row justify-center items-start gap-[20px] mt-5">
            <StatCard
                title="Посетителей"
                percentage={formData?.eventStats?.visitors?.percentage.toString() ?? "0"}
                value={formData?.eventStats?.visitors?.value.toString() ?? "0"}
                isUp={formData?.eventStats?.visitors?.isUp ?? true}
            />
            <StatCard
                title="Повторных посещений"
                percentage={formData?.eventStats?.repeatVisits?.percentage.toString() ?? "0"}
                value={formData?.eventStats?.repeatVisits?.value.toString() ?? "0"}
                isUp={formData?.eventStats?.repeatVisits?.isUp ?? true}
            />
        </div>
        <div className="flex flex-row justify-center items-start gap-[20px] mt-5">
            <StatCard
                title="Уникальных посетителей"
                percentage={formData?.eventStats?.uniqueVisitors?.percentage.toString() ?? "0"}
                value={formData?.eventStats?.uniqueVisitors?.value.toString() ?? "0"}
                isUp={formData?.eventStats?.uniqueVisitors?.isUp ?? true}
            />
            <StatCard
                title="Получено промокодов"
                percentage={formData?.eventStats?.promocodes?.percentage.toString() ?? "0"}
                value={formData?.eventStats?.promocodes?.value.toString() ?? "0"}
                isUp={formData?.eventStats?.promocodes?.isUp ?? true}
            />
        </div>
        <div className="flex flex-row justify-center items-start gap-[20px] mt-5">
            <StatCard
                title="Повторно получено промокодов"
                percentage={formData?.eventStats?.repeatPromocodes?.percentage.toString() ?? "0"}
                value={formData?.eventStats?.repeatPromocodes?.value.toString() ?? "0"}
                isUp={formData?.eventStats?.repeatPromocodes?.isUp ?? true}
            />
            <StatCard
                title="Перешли на сайт"
                percentage={formData?.eventStats?.siteVisits?.percentage.toString() ?? "0"}
                value={formData?.eventStats?.siteVisits?.value.toString() ?? "0"}
                isUp={formData?.eventStats?.siteVisits?.isUp ?? true}
            />
        </div>
    </>)
}

export default StatisticEvents;