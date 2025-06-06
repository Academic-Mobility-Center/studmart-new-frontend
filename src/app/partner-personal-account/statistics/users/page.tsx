'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import StatisticUsers from '@/components/forms/statistics-form/StatisticUsers';
import { useAuth } from '@/context/AuthContext';

import { useStatistic } from '../context';

const UsersPage = () => {
	const { role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Employee') {
			router.replace('/student-personal-account');
		}
	}, [role, router]);
	const { formData, setFormData, partnerId } = useStatistic();

	return <StatisticUsers formData={formData} setFormData={setFormData} partnerId={partnerId} />;
};

export default UsersPage;
