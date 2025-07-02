import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { CustomTooltip } from '@/components/charts/CustomTooltip';

import ChartDataItem from '@/types/ChartDataItem';

export type EventConfig = {
	title: string;
	chartData: ChartDataItem[];
	renderChart: (data: ChartDataItem[]) => React.ReactNode;
};

export const eventConfigs: Record<string, EventConfig> = {
	visitors: {
		title: 'Посетители',
		chartData: [
			{ date: '01.05.25', new: 12, repeat: 5, unique: 15, views: 100 },
			{ date: '02.05.25', new: 18, repeat: 4, unique: 20, views: 140 },
			{ date: '03.05.25', new: 22, repeat: 7, unique: 25, views: 170 },
			{ date: '04.05.25', new: 19, repeat: 6, unique: 22, views: 160 },
			{ date: '05.05.25', new: 10, repeat: 3, unique: 13, views: 90 },
			{ date: '06.05.25', new: 17, repeat: 8, unique: 21, views: 150 },
			{ date: '07.05.25', new: 24, repeat: 9, unique: 28, views: 180 },
			{ date: '08.05.25', new: 21, repeat: 10, unique: 26, views: 175 },
			{ date: '09.05.25', new: 13, repeat: 5, unique: 16, views: 110 },
			{ date: '10.05.25', new: 9, repeat: 2, unique: 11, views: 70 },
		],
		renderChart: (data) => (
			<div className="border border-zinc-300 rounded-xl p-4">
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip content={<CustomTooltip />} />
						<Line
							type="linear"
							dataKey="new"
							stroke="#8FE248"
							name="Новые"
							strokeDasharray="4 2"
							strokeWidth={1}
						/>
						<Line
							type="linear"
							dataKey="repeat"
							stroke="#F5052E"
							name="Повторные посещения"
							strokeDasharray="4 2"
							strokeWidth={1}
						/>
						<Line
							type="linear"
							dataKey="unique"
							stroke="#FEE200"
							name="Уникальные посетители"
							strokeDasharray="4 2"
							strokeWidth={1}
						/>
						<Line
							type="linear"
							dataKey="views"
							stroke="#FFB9FF"
							name="Просмотры"
							strokeDasharray="4 2"
							strokeWidth={1}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		),
	},
	promocodes: {
		title: 'Промокоды',
		chartData: [
			{ date: '01.05.25', new: 12, repeat: 5, unique: 15, views: 100 },
			{ date: '02.05.25', new: 18, repeat: 4, unique: 20, views: 140 },
			{ date: '03.05.25', new: 22, repeat: 7, unique: 25, views: 170 },
			{ date: '04.05.25', new: 19, repeat: 6, unique: 22, views: 160 },
			{ date: '05.05.25', new: 10, repeat: 3, unique: 13, views: 90 },
			{ date: '06.05.25', new: 17, repeat: 8, unique: 21, views: 150 },
			{ date: '07.05.25', new: 24, repeat: 9, unique: 28, views: 180 },
			{ date: '08.05.25', new: 21, repeat: 10, unique: 26, views: 175 },
			{ date: '09.05.25', new: 13, repeat: 5, unique: 16, views: 110 },
			{ date: '10.05.25', new: 9, repeat: 2, unique: 11, views: 70 },
		],
		renderChart: (data) => {
			const maxValue = Math.max(...data.map((item) => Math.max(item.new, item.repeat)));

			return (
				<div className="border border-zinc-200 rounded-xl p-5 space-y-2">
					<div className="flex items-center gap-4 mb-5 text-sm text-[#032C28]">
						<div className="flex items-center gap-1">
							<div className="w-3 h-3 rounded bg-[#76E57F]" />
							Новые
						</div>
						<div className="flex items-center gap-1">
							<div className="w-3 h-3 rounded bg-[#FFD54F]" />
							Повторные
						</div>
					</div>
					{data.map((item) => {
						const isRepeatBigger = item.repeat >= item.new;
						const leftValue = isRepeatBigger ? item.new : item.repeat;
						const rightValue = isRepeatBigger ? item.repeat : item.new;

						const leftColor = isRepeatBigger ? '#76E57F' : '#FFD54F';
						const rightColor = isRepeatBigger ? '#FFD54F' : '#76E57F';

						const leftWidth = `${(leftValue / maxValue) * 100}%`;
						const rightWidth = `${(rightValue / maxValue) * 100}%`;

						return (
							<div
								key={item.date}
								className="flex items-center gap-4 border-b-[0.66px] pb-2 border-gray-300 last:border-b-0 last:pb-0 "
							>
								<div className="text-xs text-gray-500 w-16 shrink-0 text-[#032C28]">
									{item.date}
								</div>

								<div className="flex w-full h-6 rounded-l-none rounded-r-full overflow-hidden bg-gray-100 relative text-xs font-medium">
									<div
										className="h-full flex items-center pl-2 text-[#032C28] rounded-r-full"
										style={{
											backgroundColor: leftColor,
											width: leftWidth,
											zIndex: 2,
										}}
									>
										{leftValue}
									</div>

									<div
										className="h-full flex items-center pl-4 -ml-2 text-[#032C28] rounded-r-full"
										style={{
											backgroundColor: rightColor,
											left: leftWidth,
											width: `calc(${rightWidth} - ${leftWidth})`,
											zIndex: 1,
										}}
									>
										{rightValue}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			);
		},
	},
};
