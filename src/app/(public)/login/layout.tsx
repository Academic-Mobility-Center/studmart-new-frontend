'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

export default function AuthorizationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/home');
		}
	}, [isAuthenticated, router]);

	return <>{children}</>;
}
