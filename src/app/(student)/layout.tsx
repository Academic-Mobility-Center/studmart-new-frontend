'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

export default function StudentLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && isAuthenticated === false) {
			router.push('/login');
		}
	}, [isLoading, isAuthenticated, router]);

	return <>{children}</>;
}
