import { ReactNode } from 'react';

import StudentPersonalAccountMenu from '@/components/layouts/menus/partner-personal-account-menu/PartnerPersonalAccountMenu';

export default function AccountLayout({ children }: { children: ReactNode }) {
	const contentWrapperClasses =
		'flex flex-row items-center min-w-[1280px] pt-[40px] gap-[40px] pb-[120px]';
	return (
		<div className={contentWrapperClasses}>
			<StudentPersonalAccountMenu />
			{children}
		</div>
	);
}
