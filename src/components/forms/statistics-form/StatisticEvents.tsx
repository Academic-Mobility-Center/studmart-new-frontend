import { Dispatch, SetStateAction, useState } from 'react';

import { DateRangeField } from '@/components/fields/date/DateRangeField';
import { SelectField } from '@/components/fields/select/SelectField';
import { StatCard } from '@/components/statistics/StatCard';
import { transformToOptions } from '@/utils/dataTransform';
import { Option } from '@/types/Option';
import Region from '@/types/Region';
import StatisticFormData from '@/types/StatisticFormData';
import University from '@/types/University';

interface Props {
	regionOptions: Region[];
	universityOptions: University[];
	formData: StatisticFormData | null;
	setFormData: Dispatch<SetStateAction<StatisticFormData | null>>;
	partnerId: string;
}

const StatisticEvents: React.FC<Props> = ({
	regionOptions,
	universityOptions,
	formData,
	setFormData,
	partnerId,
}) => {
	const [exportError, setExportError] = useState<string | null>(null);
	if (!formData) return null;

	type StatItem = {
		title: string;
		key: keyof NonNullable<typeof formData.eventStats>;
	};

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

	const handleSelectChange =
		(name: keyof StatisticFormData) => (event: React.ChangeEvent<HTMLSelectElement>) => {
			let selectedOption: Option | null = null;

			if (name === 'region') {
				const region = regionOptions.find((r) => r.id.toString() === event.target.value);
				selectedOption = region ? { value: region.id.toString(), label: region.name } : null;
			} else if (name === 'university') {
				const university = universityOptions.find((u) => u.id.toString() === event.target.value);
				selectedOption = university
					? { value: university.id.toString(), label: university.name }
					: null;
			}

			setFormData((prev) => (prev ? { ...prev, [name]: selectedOption } : prev));
		};

	const filteredUniversityOptions = formData.region
		? universityOptions.filter((u) => u.city.region.id.toString() === formData.region?.value)
		: universityOptions;
	const statItems: StatItem[] = [
		{ title: 'Посетителей', key: 'visitors' },
		{ title: 'Повторных посещений', key: 'repeatVisits' },
		{ title: 'Уникальных посетителей', key: 'uniqueVisitors' },
		{ title: 'Получено промокодов', key: 'promocodes' },
		{ title: 'Повторно получено промокодов', key: 'repeatPromocodes' },
		{ title: 'Перешли на сайт', key: 'siteVisits' },
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
					onChange={handleSelectChange('region')}
					name="region"
					width={262}
					labelFontSize={14}
				/>
				<SelectField
					label="Университет"
					placeholder="Университет"
					options={transformToOptions(filteredUniversityOptions)}
					value={formData.university}
					onChange={handleSelectChange('university')}
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
					>
						{'Экспорт статистики'}
					</button>
					{exportError && <span className="text-red-500 text-sm">{exportError}</span>}
				</div>
			</div>

			{groupedStats.map((pair, i) => (
				<div key={i} className="flex flex-row justify-center items-start gap-[20px] mt-5">
					{pair.map(({ title, key }) => {
						const stat = formData.eventStats?.[key];
						return (
							<StatCard
								key={key}
								title={title}
								percentage={stat?.percentage?.toString() ?? '0'}
								value={stat?.value?.toString() ?? '0'}
								isUp={stat?.isUp ?? true}
								eventKey={key.includes('promo') ? 'promocodes' : 'visitors'}
							/>
						);
					})}
				</div>
			))}
		</>
	);
};

export default StatisticEvents;
