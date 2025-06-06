'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

import { useAuth } from '@/context/AuthContext';

import LoginForm from '../forms/login/LoginForm';
import NewHeader from '../new-header/NewHeader';

export default function AuthorizationPage() {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/home');
		}
	}, [isAuthenticated, router]);
	if (isLoading || isAuthenticated) {
		return (
			<div className="loaderStyle">
				{' '}
				<ClipLoader size={50} color="#36d7b7" />{' '}
			</div>
		);
	}
	return (
		<div className="min-w-[1600px] bg-[#f8f8f8] flex flex-col items-center h-screen">
			<NewHeader isAuthenticated={isAuthenticated} />
			<div className="flex flex-col items-center min-w-[1280px] pb-[105px]">
				<LoginForm />
			</div>
		</div>
	);
}
