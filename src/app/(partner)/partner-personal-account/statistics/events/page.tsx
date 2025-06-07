'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import StatisticEvents from '@/components/forms/statistics-form/StatisticEvents';
import { useAuth } from '@/context/AuthContext';

import { useStatistic } from '../context';

const EventsPage = () => {
	const { role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Employee') {
			router.replace('/student-personal-account');
		}
	}, [role, router]);
	const { formData, setFormData, regions, universities, partnerId } = useStatistic();

	return (
		<StatisticEvents
			universityOptions={universities}
			regionOptions={regions}
			formData={formData}
			setFormData={setFormData}
			partnerId={partnerId}
		/>
	);
};

export default EventsPage;
