import { Option } from '@/types/Option';

export const transformToOptions = (array: { id: number; name: string }[]): Option[] => {
	return array.map((item) => ({
		label: item.name,
		value: item.id.toString(),
	}));
};

export const transformToOption = (item: { name: string; id: number }): Option => {
	return {
		label: item.name,
		value: item.id.toString(),
	};
};
