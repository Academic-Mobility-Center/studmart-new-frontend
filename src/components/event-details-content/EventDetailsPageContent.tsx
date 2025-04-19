"use client"
import { useParams } from "next/navigation";
import { regionOptions, universityOptions, useStatistic } from "@/app/partner-personal-account/statistics/context";
import { SelectField } from "@/components/fields/select/SelectField";
import { transformToOptions } from "@/utils/dataTransform";
import { DateRangeField } from "@/components/fields/date/DateRangeField";
import StatisticFormData from "@/types/StatisticFormData";
import { Option } from "@/types/Option";
import { useState } from "react";
import { groupChartDataBy } from "@/utils/groupChartDataBy";
import { eventConfigs } from "@/data/statistics/eventConfigs";
import { applyFilters } from "@/utils/applyFilters";
import Link from "next/link";


export default function EventDetailsPageContent() {
    const { formData, setFormData } = useStatistic();
    const {eventKey} = useParams();
    const [grouping, setGrouping] = useState<"day" | "week" | "month">("day");
    const groupingButtons = [
        { label: "По дням", value: "day" },
        { label: "По неделям", value: "week" },
        { label: "По месяцам", value: "month" },
    ];

    const config = eventConfigs[eventKey as keyof typeof eventConfigs];

    const handleSelectChange = (name: keyof StatisticFormData) => 
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            let selectedOption: Option | null = null;
            
            if (name === "region") {
                const region = regionOptions.find(r => r.id.toString() === event.target.value);
                selectedOption = region ? { value: region.id.toString(), label: region.name } : null;
            } else if (name === "university") {
                const university = universityOptions.find(u => u.id.toString() === event.target.value);
                selectedOption = university ? { value: university.id.toString(), label: university.name } : null;
            }
    
            setFormData(prev => ({
                ...prev,
                [name]: selectedOption,
            }));
    };
    const filteredUniversityOptions = formData.region ? 
        universityOptions.filter(u => 
            u.city.region.id.toString() === formData.region?.value
        ) : 
        universityOptions;    
    const filteredData = groupChartDataBy(applyFilters(config.chartData, formData), grouping);
    if (!config) return <div>Нет данных для {eventKey}</div>;
    return (
        <div className="p-5 bg-[#F8F8F8] rounded-2xl border border-gray-300 w-[588px]">
            <Link href="/partner-personal-account/statistics/events">          
                <button
                    className={`h-12 w-[174px] rounded-[15px] text-sm 
                    font-bold uppercase tracking-[0.42px] cursor-pointer 
                    bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]`}
                >
                    Назад
                </button>
            </Link>

          <h1 className="text-xl font-extrabold mb-5 text-[#032C28] mt-5">{config.title}</h1>
      
          <div className="grid grid-cols-2 gap-7 mb-4">
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
              options={transformToOptions(filteredUniversityOptions)}
              onChange={handleSelectChange("university")}
              name="university"
              width={262}
              labelFontSize={14}
            />
          </div>
      
          <DateRangeField
            label="Выбор периода"
            width={262}
            labelFontSize={14}
            value={formData?.dateRange}
            onChange={(dates) => setFormData(prev => ({ ...prev, dateRange: dates }))}
          />
      
          <div className="flex flex-row gap-10 my-4 ">
            {groupingButtons.map(({ label, value }) => (
              <button
                key={value}
                className={`h-12 w-[167px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer
                  ${grouping === value 
                    ? "bg-[#8FE248] text-[#032c28] border-none" 
                    : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"}`}
                onClick={() => setGrouping(value as "day" | "week" | "month")}
              >
                {label}
              </button>
            ))}
          </div>
      
          <div>{config.renderChart(filteredData)}</div>
        </div>
      );
      
}