'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import StudentPersonalLayout from '@/components/HOC/StudentPersonalLayout';
import { useAuth } from '@/context/AuthContext';

export default function StudentPersonalAccountLayout({ children }: { children: ReactNode }) {
	const { role } = useAuth();
	const { replace } = useRouter();

	useEffect(() => {
		if (role !== 'Student') {
			replace('/partner-personal-account');
		}
	}, [role, replace]);

	return <StudentPersonalLayout>{children}</StudentPersonalLayout>;
}
