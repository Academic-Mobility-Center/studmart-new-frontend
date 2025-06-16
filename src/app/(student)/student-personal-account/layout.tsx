import { ReactNode } from 'react';

import StudentPersonalLayout from '@/components/HOC/StudentPersonalLayout';

export default function StudentPersonalAccountLayout({ children }: { children: ReactNode }) {
	return <StudentPersonalLayout>{children}</StudentPersonalLayout>;
}
