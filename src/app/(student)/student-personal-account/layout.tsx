import { ReactNode } from 'react';

import StudentMenu from '@/components/menu/student-personal-account-menu/StudentPersonalAccountMenu';

export default function AccountLayout({ children }: { children: ReactNode }) {
	const contentWrapperClasses =
		'flex flex-row items-start min-w-[1280px] pt-[40px] gap-[40px] pb-[120px]';
	return (
		<div className={contentWrapperClasses}>
			<StudentMenu />
			{children}
		</div>
	);
}
