import { getDetailedPromocodes, getDetailedVisitors } from '@/lib/api/statistics';
import ChartDataItem from '@/types/ChartDataItem';

type Params = {
	From?: string;
	To?: string;
	RegionId?: string;
	UniversityId?: string;
	PartnerId?: string;
};

export const loadEventData = async (
	key: 'visitors' | 'promocodes',
	params: Params,
): Promise<ChartDataItem[]> => {
	if (key === 'visitors') {
		const data = await getDetailedVisitors(params);
		return data ?? [];
	} else if (key === 'promocodes') {
		const data = await getDetailedPromocodes(params);
		return data ?? [];
	}

	return [];
};
