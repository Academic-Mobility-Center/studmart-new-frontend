'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

const DocumentsPage = () => {
	const { role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Employee') {
			router.replace('/student-personal-account');
		}
	}, [role, router]);
	return <></>;
};

export default DocumentsPage;
