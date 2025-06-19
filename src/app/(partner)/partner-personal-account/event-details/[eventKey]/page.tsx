'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import EventDetailsPageContent from '@/components/sections/EventDetailsPageContent/EventDetailsPageContent';

import { useAuth } from '@/context/AuthContext';

import { StatisticProvider } from '../../statistics/context';

export default function EventDetailsPage() {
	const { role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Employee') {
			router.replace('/student-personal-account');
		}
	}, [role, router]);
	return (
		<StatisticProvider>
			<EventDetailsPageContent />
		</StatisticProvider>
	);
}
