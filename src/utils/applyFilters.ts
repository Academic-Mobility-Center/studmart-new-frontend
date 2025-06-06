import { parse } from 'date-fns';

import ChartDataItem from '@/types/ChartDataItem';
import StatisticFormData from '@/types/StatisticFormData';

export function applyFilters(data: ChartDataItem[], formData: StatisticFormData): ChartDataItem[] {
	return data.filter((item) => {
		const parsedDate = parse(item.date, 'dd.MM.yy', new Date());
		const startDate = formData?.dateRange?.[0];
		const endDate = formData?.dateRange?.[1];

		if (startDate && parsedDate < startDate) return false;
		if (endDate && parsedDate > endDate) return false;

		return true;
	});
}
