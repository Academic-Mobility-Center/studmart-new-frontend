'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import RegistraionForm from '@/components/registration';
import { useAuth } from '@/context/AuthContext';

export default function Registraion() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) router.push('/');
	}, [isAuthenticated, router]);

	return (
		<div className="flex flex-col items-center min-w-[1280px] pb-[105px]">
			<RegistraionForm />
		</div>
	);
}
