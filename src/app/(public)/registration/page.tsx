'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import RegistrationForm from '@/components/pages/public-pages/RegistrationForm';

import { useAuth } from '@/context/AuthContext';

export default function Registration() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) router.push('/');
	}, [isAuthenticated, router]);

	return <RegistrationForm />;
}
