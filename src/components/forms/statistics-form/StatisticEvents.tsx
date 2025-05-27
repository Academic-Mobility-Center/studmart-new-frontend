// import { DateRangeField } from "@/components/fields/date/DateRangeField"
// import { SelectField } from "@/components/fields/select/SelectField"
// import { StatCard } from "@/components/statistics/StatCard"
// import { Option } from "@/types/Option"
// import Region from "@/types/Region"
// import StatisticFormData from "@/types/StatisticFormData"
// import University from "@/types/University"
// import { transformToOptions } from "@/utils/dataTransform"
// import { Dispatch, SetStateAction } from "react"

// interface Props{
//     regionOptions: Region[];
//     universityOptions: University[];
//     formData: StatisticFormData
//     setFormData: Dispatch<SetStateAction<StatisticFormData>>
// }

// const StatisticEvents: React.FC<Props> = ({
//     regionOptions, 
//     universityOptions,
//     formData,
//     setFormData 
// }) => {
//     const handleSelectChange = (name: keyof StatisticFormData) => 
//         (event: React.ChangeEvent<HTMLSelectElement>) => {
//             let selectedOption: Option | null = null;
            
//             if (name === "region") {
//                 const region = regionOptions.find(r => r.id.toString() === event.target.value);
//                 selectedOption = region ? { value: region.id.toString(), label: region.name } : null;
//             } else if (name === "university") {
//                 const university = universityOptions.find(u => u.id.toString() === event.target.value);
//                 selectedOption = university ? { value: university.id.toString(), label: university.name } : null;
//             }
    
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: selectedOption,
//             }));
//     };
    
//     const filteredUniversityOptions = formData.region ? 
//         universityOptions.filter(u => 
//             u.city.region.id.toString() === formData.region?.value
//         ) : 
//         universityOptions;

//     return(
//     <>
//         <div className="flex flex-row justify-center items-start gap-[20px] mt-10">
//             <SelectField
//                 label="Регион"
//                 placeholder="Регион"
//                 options={transformToOptions(regionOptions)}
//                 value={formData?.region}
//                 onChange={handleSelectChange("region")}
//                 name="region"
//                 width={262}
//                 labelFontSize={14}
//             />
//             <SelectField
//                 label="Университет"
//                 placeholder="Университет"
//                 value={formData?.university}
//                 options={transformToOptions(filteredUniversityOptions)}
//                 onChange={handleSelectChange("university")}
//                 name="university"
//                 width={262}
//                 labelFontSize={14}
//             />
//         </div>
//         <div className="flex justify-between items-end mt-5">
//             <div className="flex flex-col">
//             <DateRangeField
//                 label="Выбор периода"
//                 width={262}
//                 labelFontSize={14}
//                 value={formData?.dateRange}
//                 onChange={(dates) => setFormData(prev => ({ ...prev, dateRange: dates }))}
//             />
//             </div>
//             <button 
//                 className="bg-[#8fe248] [font-family:Mulish,sans-serif] 
//                 text-sm font-bold tracking-[0.42px] uppercase text-[#032c28] 
//                 cursor-pointer h-12 w-[262px] rounded-[15px] border-none"
//             >
//                 Экспорт статистики
//             </button>
//         </div>
//         <div className="flex flex-row justify-center items-start gap-[20px] mt-5">
//             <StatCard
//                 title="Посетителей"
//                 percentage={formData?.eventStats?.visitors?.percentage.toString() ?? "0"}
//                 value={formData?.eventStats?.visitors?.value.toString() ?? "0"}
//                 isUp={formData?.eventStats?.visitors?.isUp ?? true}
//                 eventKey="visitors"
//             />
//             <StatCard
//                 title="Повторных посещений"
//                 percentage={formData?.eventStats?.repeatVisits?.percentage.toString() ?? "0"}
//                 value={formData?.eventStats?.repeatVisits?.value.toString() ?? "0"}
//                 isUp={formData?.eventStats?.repeatVisits?.isUp ?? true}
//                 eventKey="visitors"
//             />
//         </div>
//         <div className="flex flex-row justify-center items-start gap-[20px] mt-5">
//             <StatCard
//                 title="Уникальных посетителей"
//                 percentage={formData?.eventStats?.uniqueVisitors?.percentage.toString() ?? "0"}
//                 value={formData?.eventStats?.uniqueVisitors?.value.toString() ?? "0"}
//                 isUp={formData?.eventStats?.uniqueVisitors?.isUp ?? true}
//                 eventKey="visitors"
//             />
//             <StatCard
//                 title="Получено промокодов"
//                 percentage={formData?.eventStats?.promocodes?.percentage.toString() ?? "0"}
//                 value={formData?.eventStats?.promocodes?.value.toString() ?? "0"}
//                 isUp={formData?.eventStats?.promocodes?.isUp ?? true}
//                 eventKey="promocodes"
//             />
//         </div>
//         <div className="flex flex-row justify-center items-start gap-[20px] mt-5">
//             <StatCard
//                 title="Повторно получено промокодов"
//                 percentage={formData?.eventStats?.repeatPromocodes?.percentage.toString() ?? "0"}
//                 value={formData?.eventStats?.repeatPromocodes?.value.toString() ?? "0"}
//                 isUp={formData?.eventStats?.repeatPromocodes?.isUp ?? true}
//                 eventKey="promocodes"
//             />
//             <StatCard
//                 title="Перешли на сайт"
//                 percentage={formData?.eventStats?.siteVisits?.percentage.toString() ?? "0"}
//                 value={formData?.eventStats?.siteVisits?.value.toString() ?? "0"}
//                 isUp={formData?.eventStats?.siteVisits?.isUp ?? true}
//                 eventKey="visitors"
//             />
//         </div>
//     </>)
// }

// export default StatisticEvents;
import { DateRangeField } from "@/components/fields/date/DateRangeField"
import { SelectField } from "@/components/fields/select/SelectField"
import { StatCard } from "@/components/statistics/StatCard"
import { Option } from "@/types/Option"
import Region from "@/types/Region"
import StatisticFormData from "@/types/StatisticFormData"
import University from "@/types/University"
import { transformToOptions } from "@/utils/dataTransform"
import { Dispatch, SetStateAction } from "react"

interface Props {
    regionOptions: Region[];
    universityOptions: University[];
    formData: StatisticFormData | null;
    setFormData: Dispatch<SetStateAction<StatisticFormData | null>>;
}

const StatisticEvents: React.FC<Props> = ({
    regionOptions,
    universityOptions,
    formData,
    setFormData,
}) => {
    if (!formData) return null;
    type StatItem = {
        title: string;
        key: keyof NonNullable<typeof formData.eventStats>;
    };
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

            setFormData(prev => prev ? ({ ...prev, [name]: selectedOption }) : prev);
        };

    const filteredUniversityOptions = formData.region
        ? universityOptions.filter(u =>
            u.city.region.id.toString() === formData.region?.value
        )
        : universityOptions;
        const statItems: StatItem[] = [
            { title: "Посетителей", key: "visitors" },
            { title: "Повторных посещений", key: "repeatVisits" },
            { title: "Уникальных посетителей", key: "uniqueVisitors" },
            { title: "Получено промокодов", key: "promocodes" },
            { title: "Повторно получено промокодов", key: "repeatPromocodes" },
            { title: "Перешли на сайт", key: "siteVisits" }
        ];
        
        const groupedStats = statItems.reduce<StatItem[][]>((acc, _, index, array) => {
            if (index % 2 === 0) {
                acc.push(array.slice(index, index + 2));
            }
            return acc;
        }, []);
        
    return (
        <>
            <div className="flex flex-row justify-center items-start gap-[20px] mt-10">
                <SelectField
                    label="Регион"
                    placeholder="Регион"
                    options={transformToOptions(regionOptions)}
                    value={formData.region}
                    onChange={handleSelectChange("region")}
                    name="region"
                    width={262}
                    labelFontSize={14}
                />
                <SelectField
                    label="Университет"
                    placeholder="Университет"
                    options={transformToOptions(filteredUniversityOptions)}
                    value={formData.university}
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
                        value={formData.dateRange ?? [null, null]}
                        onChange={(dates) =>
                            setFormData(prev => prev ? { ...prev, dateRange: dates } : prev)
                        }
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

            {groupedStats.map((pair, i) => (
                <div key={i} className="flex flex-row justify-center items-start gap-[20px] mt-5">
                    {pair.map(({ title, key }) => {
                        const stat = formData.eventStats?.[key];
                        return (
                            <StatCard
                                key={key}
                                title={title}
                                percentage={stat?.percentage?.toString() ?? "0"}
                                value={stat?.value?.toString() ?? "0"}
                                isUp={stat?.isUp ?? true}
                                eventKey={key.includes("promo") ? "promocodes" : "visitors"}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
};

export default StatisticEvents;
