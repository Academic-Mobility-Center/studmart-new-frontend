'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

export default function AccountRootPage() {
	const { role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!role) return;

		if (role !== 'Student') {
			router.replace('/partner-personal-account');
		} else {
			router.replace('/student-personal-account/id');
		}
	}, [role, router]);

	return null; // Можно добавить спиннер/лоадер по желанию
}
