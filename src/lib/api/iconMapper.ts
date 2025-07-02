// /lib/api/iconMapper.ts

import DevicesSvg from '@/public/icons/favourite-categories/DevicesSvg';
import ExerciseSvg from '@/public/icons/favourite-categories/ExerciseSvg';
import FavoriteSvg from '@/public/icons/favourite-categories/FavoriteSvg';
import LunchDiningSvg from '@/public/icons/favourite-categories/LunchDiningSvg';
import SchoolSvg from '@/public/icons/favourite-categories/SchoolSvg';
import ShoppingBarSvg from '@/public/icons/favourite-categories/ShoppingBarSvg';

const categoryIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
	electronics: DevicesSvg,
	food: LunchDiningSvg,
	sport: ExerciseSvg,
	education: SchoolSvg,
	shopping: ShoppingBarSvg,
	favorite: FavoriteSvg,
};

export const getCategoryIcon = (
	slug: string,
): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
	return categoryIconMap[slug] || FavoriteSvg; // fallback иконка
};
