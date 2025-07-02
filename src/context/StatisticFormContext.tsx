'use client';

import { createContext, useContext } from 'react';

import StatisticFormData from '@/types/StatisticFormData';

const StatisticsContext = createContext<{
	formData: StatisticFormData;
	updateFormData: <K extends keyof StatisticFormData>(key: K, value: StatisticFormData[K]) => void;
}>(null!);

export function useStatisticsLayout() {
	return useContext(StatisticsContext);
}

export function StatisticsProvider({
	children,
	value,
}: {
	children: React.ReactNode;
	value: {
		formData: StatisticFormData;
		updateFormData: <K extends keyof StatisticFormData>(
			key: K,
			value: StatisticFormData[K],
		) => void;
	};
}) {
	return <StatisticsContext.Provider value={value}>{children}</StatisticsContext.Provider>;
}
