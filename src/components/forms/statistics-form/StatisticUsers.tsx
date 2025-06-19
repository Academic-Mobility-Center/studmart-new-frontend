import { Dispatch, SetStateAction, useState } from 'react';

import { DemographyChart } from '@/components/charts/statistics/DemographyChart';
import { DevicesChart } from '@/components/charts/statistics/DevicesChart';
import { GeographyChart } from '@/components/charts/statistics/GeographyChart';
import { DateRangeField } from '@/components/ui/fields/date/DateRangeField';

import StatisticFormData from '@/types/StatisticFormData';

interface Props {
	formData: StatisticFormData | null;
	setFormData: Dispatch<SetStateAction<StatisticFormData | null>>;
	partnerId: string;
}

const StatisticUsers: React.FC<Props> = ({ formData, setFormData, partnerId }) => {
	const [exportError, setExportError] = useState<string | null>(null);
	if (!formData) return null;

	const handleExportClick = () => {
		if (!formData?.dateRange?.[0] || !formData?.dateRange?.[1]) return;

		const from = formData.dateRange[0].toISOString().split('T')[0];
		const to = formData.dateRange[1].toISOString().split('T')[0];

		setExportError(null);
		try {
			const url = `https://statistics.${process.env.NEXT_PUBLIC_API_URL}/Export?from=${from}&to=${to}&partnerId=${partnerId}`;
			window.open(url, '_blank');
		} catch (error) {
			console.error('Ошибка экспорта:', error);
			setExportError('Ошибка загрузки статистики');
		}
	};

	return (
		<>
			<div className="flex justify-between items-end mt-10">
				<div className="flex flex-col">
					<DateRangeField
						label="Выбор периода"
						width={262}
						labelFontSize={14}
						value={formData?.dateRange ?? [null, null]}
						onChange={(dates) =>
							setFormData((prev) => (prev ? { ...prev, dateRange: dates } : prev))
						}
					/>
				</div>
				<div className="flex flex-col items-end gap-2">
					<button
						className="bg-[#8fe248] [font-family:Mulish,sans-serif]
                        text-sm font-bold tracking-[0.42px] uppercase text-[#032c28]
                        cursor-pointer h-12 w-[262px] rounded-[15px] border-none disabled:opacity-50"
						onClick={handleExportClick}
						// disabled={isExporting}
					>
						{'Экспорт статистики'}
					</button>
					{exportError && <span className="text-red-500 text-sm">{exportError}</span>}
				</div>
			</div>
			<div
				className="border border-[rgba(0,0,0,0.2)] 
                rounded-[15px]  w-full mt-10"
			>
				<DemographyChart data={formData?.demographyData ?? []} />
			</div>
			<div
				className="border border-[rgba(0,0,0,0.2)] 
                rounded-[15px] pl-[20px] 
                pr-[20px] w-full mt-10"
			>
				<GeographyChart data={formData?.geographyData ?? []} />
			</div>
			<div
				className="border border-[rgba(0,0,0,0.2)] 
                rounded-[5px] w-full mt-10"
			>
				<DevicesChart data={formData?.devicesData ?? []} />
			</div>
		</>
	);
};

export default StatisticUsers;
