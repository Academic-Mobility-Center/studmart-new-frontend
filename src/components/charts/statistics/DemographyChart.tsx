'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts';

type Props = {
	data: {
		age: string;
		male: number;
		female: number;
	}[];
};
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-2 rounded shadow text-sm text-[#032c28]">
				<p className="font-bold text-[#8fe248] mb-1">{label}</p>
				{payload.map((entry, index) => (
					<div key={`item-${index}`} className="text-[#032c28]">
						<span style={{ color: entry.color }}>{entry.name}</span>: {entry.value}
					</div>
				))}
			</div>
		);
	}

	return null;
};

export const DemographyChart = ({ data }: Props) => {
	const totalMale = data.reduce((sum, item) => sum + item.male, 0);
	const totalFemale = data.reduce((sum, item) => sum + item.female, 0);
	const total = totalFemale + totalMale;

	const malePercent = total ? ((totalMale / total) * 100).toFixed(0) : '0';
	const femalePercent = total ? ((totalFemale / total) * 100).toFixed(0) : '0';
	return (
		<div className="mt-[20px] mb-5">
			<div className="flex justify-between items-start mb-[20px]">
				<p className="font-bold [font-family:'Nunito_Sans',sans-serif] text-xl text-[#032c28] pl-5">
					Демография
				</p>
				<div className="flex flex-col gap-1 text-sm text-[#032c28]">
					<div className="flex items-center gap-1 text-sm text-[#032c28] mr-5">
						<span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3A7AFE' }} />
						Муж. - {malePercent}%
					</div>
					<div className="flex items-center gap-1 text-sm text-[#032c28]">
						<span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FB5E9C' }} />
						Жен. - {femalePercent}%
					</div>
				</div>
			</div>
			<ResponsiveContainer width="100%" height={240}>
				<BarChart data={data} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
					<CartesianGrid vertical={false} strokeDasharray="2 4" stroke="#ccc" horizontal={true} />
					<XAxis dataKey="age" tickLine={false} axisLine={false} />
					<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
					<Tooltip content={<CustomTooltip />} />
					<Bar dataKey="male" fill="#3A7AFE" name="Муж." radius={[10, 10, 0, 0]} />
					<Bar dataKey="female" fill="#FB5E9C" name="Жен." radius={[10, 10, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
