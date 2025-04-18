import { DateRangeField } from "@/components/fields/date/DateRangeField"
import { DemographyChart } from "@/components/statistics/DemographyChart"
import { DevicesChart } from "@/components/statistics/DevicesChart"
import { GeographyChart } from "@/components/statistics/GeographyChart"
import StatisticFormData from "@/types/StatisticFormData"
import { Dispatch, SetStateAction } from "react"

interface Props{
    formData: StatisticFormData
    setFormData: Dispatch<SetStateAction<StatisticFormData>>
}

const StatisticUsers: React.FC<Props> = ({
    formData,
    setFormData
}) => {
    return (
        <>
            <div className="flex justify-between items-end mt-10">
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
            <div 
                className="border border-[rgba(0,0,0,0.2)] 
                rounded-[15px]  w-full mt-10"
            >
                <DemographyChart data={formData?.demographyData} />
            </div>              
            <div 
                className="border border-[rgba(0,0,0,0.2)] 
                rounded-[15px] pl-[20px] 
                pr-[20px] w-full mt-10"
            >
                <GeographyChart data={formData?.geographyData} /> 
            </div>   
            <div 
                className="border border-[rgba(0,0,0,0.2)] 
                rounded-[5px] w-full mt-10"
            >
                <DevicesChart data={formData?.devicesData} />
            </div>  
        </>
    )
}

export default StatisticUsers;