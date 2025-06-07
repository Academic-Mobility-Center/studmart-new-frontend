// "use client";

// import { useParams } from "next/navigation";
// import { useStatistic } from "@/app/partner-personal-account/statistics/context";
// import { SelectField } from "@/components/fields/select/SelectField";
// import { transformToOptions } from "@/utils/dataTransform";
// import { DateRangeField } from "@/components/fields/date/DateRangeField";
// import { Option } from "@/types/Option";
// import { useState, ChangeEvent } from "react";
// import { groupChartDataBy } from "@/utils/groupChartDataBy";
// import { eventConfigs } from "@/data/statistics/eventConfigs";
// import { applyFilters } from "@/utils/applyFilters";
// import Link from "next/link";
// import { filterChartDataByDate } from "@/utils/filterChartDataByDate";

// export default function EventDetailsPageContent() {
//   const { formData, setFormData, regions, universities } = useStatistic();
//   const { eventKey } = useParams();
//   const [grouping, setGrouping] = useState<"day" | "week" | "month">("day");

//   const groupingButtons = [
//     { label: "По дням", value: "day" },
//     { label: "По неделям", value: "week" },
//     { label: "По месяцам", value: "month" },
//   ];

//   const config = eventConfigs[eventKey as keyof typeof eventConfigs];
//   if (!formData || !config) return <div>Нет данных для {eventKey}</div>;

//   const handleSelectChange =
//     (name: "region" | "university") => (event: ChangeEvent<HTMLSelectElement>) => {
//       const value = event.target.value;

//       let selectedOption: Option | undefined;
//       if (name === "region") {
//         const region = regions.find(r => r.id.toString() === value);
//         selectedOption = region ? { value: region.id.toString(), label: region.name } : undefined;
//       } else {
//         const university = universities.find(u => u.id.toString() === value);
//         selectedOption = university ? { value: university.id.toString(), label: university.name } : undefined;
//       }

//       setFormData(prev => prev ? { ...prev, [name]: selectedOption } : prev);
//     };

//   const filteredUniversities = formData.region
//     ? universities.filter(u => u.city.region.id.toString() === formData.region!.value)
//     : universities;

//     const dateRange = formData.dateRange;
//     const filteredByDate = filterChartDataByDate(
//       config.chartData,
//       dateRange?.[0] ?? null,
//       dateRange?.[1] ?? null
//     );

//     const filteredData = groupChartDataBy(
//       applyFilters(filteredByDate, formData),
//       grouping
//     );

//   return (
//     <div className="p-5 bg-[#F8F8F8] rounded-2xl border border-gray-300 w-[588px]">
//       <Link href="/partner-personal-account/statistics/events">
//         <button
//           className={`h-12 w-[174px] rounded-[15px] text-sm
//           font-bold uppercase tracking-[0.42px] cursor-pointer
//           bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]`}
//         >
//           Назад
//         </button>
//       </Link>

//       <h1 className="text-xl font-extrabold mb-5 text-[#032C28] mt-5">{config.title}</h1>

//       <div className="grid grid-cols-2 gap-7 mb-4">
//         <SelectField
//           label="Регион"
//           placeholder="Регион"
//           options={transformToOptions(regions)}
//           value={formData.region}
//           onChange={handleSelectChange("region")}
//           name="region"
//           width={262}
//           labelFontSize={14}
//         />
//         <SelectField
//           label="Университет"
//           placeholder="Университет"
//           options={transformToOptions(filteredUniversities)}
//           value={formData.university}
//           onChange={handleSelectChange("university")}
//           name="university"
//           width={262}
//           labelFontSize={14}
//         />
//       </div>

//       <DateRangeField
//         label="Выбор периода"
//         width={262}
//         labelFontSize={14}
//         value={formData.dateRange}
//         onChange={(dates) =>
//           setFormData(prev => prev ? { ...prev, dateRange: dates } : prev)
//         }
//       />

//       <div className="flex flex-row gap-10 my-4 ">
//         {groupingButtons.map(({ label, value }) => (
//           <button
//             key={value}
//             className={`h-12 w-[167px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer
//               ${grouping === value
//                 ? "bg-[#8FE248] text-[#032c28] border-none"
//                 : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"}`}
//                 onClick={() => setGrouping(value as "day" | "week" | "month")}
//                 >
//             {label}
//           </button>
//         ))}
//       </div>

//       <div>{config.renderChart(filteredData)}</div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState, ChangeEvent } from "react";
// import { useParams } from "next/navigation";
// import { useStatistic } from "@/app/partner-personal-account/statistics/context";
// import { SelectField } from "@/components/fields/select/SelectField";
// import { DateRangeField } from "@/components/fields/date/DateRangeField";
// import { transformToOptions } from "@/utils/dataTransform";
// import { groupChartDataBy } from "@/utils/groupChartDataBy";
// import { applyFilters } from "@/utils/applyFilters";
// import { loadEventData } from "@/components/loadEventData/loadEventData";
// import { eventConfigs } from "@/data/statistics/eventConfigs";
// import { Option } from "@/types/Option";
// import ChartDataItem from "@/types/ChartDataItem";
// import Link from "next/link";

// export default function EventDetailsPageContent() {
//   const { formData, setFormData, regions, universities } = useStatistic();
//   const { eventKey } = useParams();
//   const [grouping, setGrouping] = useState<"day" | "week" | "month">("day");
//   const [data, setData] = useState<ChartDataItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   const config = eventConfigs[eventKey as keyof typeof eventConfigs];
//   // if (!formData || !config) return <div>Нет данных для {eventKey}</div>;

//   useEffect(() => {
//     if (!formData || !config) return;
//     const fetchData = async () => {
//       setLoading(true);
//       const params = {
//         From: formData?.dateRange?.[0] ? formData.dateRange[0].toISOString().split("T")[0] : undefined,
//         To: formData?.dateRange?.[1] ? formData.dateRange[1].toISOString().split("T")[0] : undefined,
//         RegionId: formData?.region?.value,
//         UniversityId: formData?.university?.value,
//       };

//         const response = await loadEventData(eventKey as "visitors" | "promocodes", params);
//       setData(response);
//       setLoading(false);
//     };
//     fetchData();
//   }, [formData, eventKey]);

//   const handleSelectChange =
//     (name: "region" | "university") => (event: ChangeEvent<HTMLSelectElement>) => {
//       const value = event.target.value;

//       let selectedOption: Option | undefined;
//       if (name === "region") {
//         const region = regions.find(r => r.id.toString() === value);
//         selectedOption = region ? { value: region.id.toString(), label: region.name } : undefined;
//       } else {
//         const university = universities.find(u => u.id.toString() === value);
//         selectedOption = university ? { value: university.id.toString(), label: university.name } : undefined;
//       }

//       setFormData(prev => prev ? { ...prev, [name]: selectedOption } : prev);
//     };

//   const filteredUniversities = formData.region
//     ? universities.filter(u => u.city.region.id.toString() === formData.region!.value)
//     : universities;

//   const filteredData = groupChartDataBy(
//     applyFilters(data, formData),
//     grouping
//   );

//   const groupingButtons = [
//     { label: "По дням", value: "day" },
//     { label: "По неделям", value: "week" },
//     { label: "По месяцам", value: "month" },
//   ];

//   return (
//     <div className="p-5 bg-[#F8F8F8] rounded-2xl border border-gray-300 w-[588px]">
//       <Link href="/partner-personal-account/statistics/events">
//         <button className="h-12 w-[174px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]">
//           Назад
//         </button>
//       </Link>

//       <h1 className="text-xl font-extrabold mb-5 text-[#032C28] mt-5">{config.title}</h1>

//       <div className="grid grid-cols-2 gap-7 mb-4">
//         <SelectField
//           label="Регион"
//           placeholder="Регион"
//           options={transformToOptions(regions)}
//           value={formData.region}
//           onChange={handleSelectChange("region")}
//           name="region"
//           width={262}
//           labelFontSize={14}
//         />
//         <SelectField
//           label="Университет"
//           placeholder="Университет"
//           options={transformToOptions(filteredUniversities)}
//           value={formData.university}
//           onChange={handleSelectChange("university")}
//           name="university"
//           width={262}
//           labelFontSize={14}
//         />
//       </div>

//       <DateRangeField
//         label="Выбор периода"
//         width={262}
//         labelFontSize={14}
//         value={formData.dateRange}
//         onChange={(dates) =>
//           setFormData(prev => prev ? { ...prev, dateRange: dates } : prev)
//         }
//       />

//       <div className="flex flex-row gap-10 my-4 ">
//         {groupingButtons.map(({ label, value }) => (
//           <button
//             key={value}
//             className={`h-12 w-[167px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer
//               ${grouping === value
//                 ? "bg-[#8FE248] text-[#032c28] border-none"
//                 : "bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]"}`}
//             onClick={() => setGrouping(value as "day" | "week" | "month")}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <div className="text-center text-gray-500">Загрузка...</div>
//       ) : (
//         <div>{config.renderChart(filteredData)}</div>
//       )}
//     </div>
//   );
// }
'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { DateRangeField } from '@/components/fields/date/DateRangeField';
import { SelectField } from '@/components/fields/select/SelectField';
import { loadEventData } from '@/components/loadEventData/loadEventData';
import { applyFilters } from '@/utils/applyFilters';
import { transformToOptions } from '@/utils/dataTransform';
import { groupChartDataBy } from '@/utils/groupChartDataBy';
import { useStatistic } from '@/app/(partner)/partner-personal-account/statistics/context';
import { eventConfigs } from '@/data/statistics/eventConfigs';
import ChartDataItem from '@/types/ChartDataItem';
import { Option } from '@/types/Option';

export default function EventDetailsPageContent() {
	const { formData, setFormData, regions, universities, partnerId } = useStatistic();
	const { eventKey } = useParams();
	const [grouping, setGrouping] = useState<'day' | 'week' | 'month'>('day');
	const [data, setData] = useState<ChartDataItem[]>([]);
	const [loading, setLoading] = useState(false);

	// Предварительная проверка до любых условий
	const config = eventKey ? eventConfigs[eventKey as keyof typeof eventConfigs] : undefined;

	useEffect(() => {
		if (!formData || !eventKey || !partnerId) return;
		console.log(partnerId);
		const fetchData = async () => {
			setLoading(true);
			const params = {
				From: formData.dateRange?.[0]?.toISOString().split('T')[0],
				To: formData.dateRange?.[1]?.toISOString().split('T')[0],
				RegionId: formData.region?.value,
				UniversityId: formData.university?.value,
				PartnerId: partnerId,
			};

			const response = await loadEventData(eventKey as 'visitors' | 'promocodes', params);
			setData(response);
			setLoading(false);
		};

		fetchData();
	}, [formData, eventKey, partnerId]);

	if (!formData) return <div>Загрузка...</div>;
	if (!eventKey) return <div>Нет eventKey</div>;
	if (!config) return <div>Нет данных для {eventKey}</div>;

	const handleSelectChange =
		(name: 'region' | 'university') => (event: ChangeEvent<HTMLSelectElement>) => {
			const value = event.target.value;

			let selectedOption: Option | undefined;
			if (name === 'region') {
				const region = regions.find((r) => r.id.toString() === value);
				selectedOption = region ? { value: region.id.toString(), label: region.name } : undefined;
			} else {
				const university = universities.find((u) => u.id.toString() === value);
				selectedOption = university
					? { value: university.id.toString(), label: university.name }
					: undefined;
			}
			setFormData((prev) => (prev ? { ...prev, [name]: selectedOption } : prev));
		};

	const filteredUniversities = formData.region
		? universities.filter((u) => u.city.region.id.toString() === formData?.region?.value)
		: universities;

	const filteredData = groupChartDataBy(applyFilters(data, formData), grouping);

	const groupingButtons = [
		{ label: 'По дням', value: 'day' },
		{ label: 'По неделям', value: 'week' },
		{ label: 'По месяцам', value: 'month' },
	];

	return (
		<div className="p-5 bg-[#F8F8F8] rounded-2xl border border-gray-300 w-[588px]">
			<Link href="/partner-personal-account/statistics/events">
				<button className="h-12 w-[174px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]">
					Назад
				</button>
			</Link>

			<h1 className="text-xl font-extrabold mb-5 text-[#032C28] mt-5">{config.title}</h1>

			<div className="grid grid-cols-2 gap-7 mb-4">
				<SelectField
					label="Регион"
					placeholder="Регион"
					options={transformToOptions(regions)}
					value={formData.region}
					onChange={handleSelectChange('region')}
					name="region"
					width={262}
					labelFontSize={14}
				/>
				<SelectField
					label="Университет"
					placeholder="Университет"
					options={transformToOptions(filteredUniversities)}
					value={formData.university}
					onChange={handleSelectChange('university')}
					name="university"
					width={262}
					labelFontSize={14}
				/>
			</div>

			<DateRangeField
				label="Выбор периода"
				width={262}
				labelFontSize={14}
				value={formData.dateRange}
				onChange={(dates) => setFormData((prev) => (prev ? { ...prev, dateRange: dates } : prev))}
			/>

			<div className="flex flex-row gap-10 my-4">
				{groupingButtons.map(({ label, value }) => (
					<button
						key={value}
						className={`h-12 w-[167px] rounded-[15px] text-sm font-bold uppercase tracking-[0.42px] cursor-pointer
              ${
								grouping === value
									? 'bg-[#8FE248] text-[#032c28] border-none'
									: 'bg-[#f8f8f8] text-[#032c28] border border-[rgba(0,0,0,0.20)]'
							}`}
						onClick={() => setGrouping(value as 'day' | 'week' | 'month')}
					>
						{label}
					</button>
				))}
			</div>

			{loading ? (
				<div className="text-center text-gray-500">Загрузка...</div>
			) : (
				<div>{config.renderChart(filteredData)}</div>
			)}
		</div>
	);
}
