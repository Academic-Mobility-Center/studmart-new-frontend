'use client';

import { FC, ReactNode } from 'react';

import StudentMenu from '@/components/menu/student-personal-account-menu/StudentPersonalAccountMenu';

import styles from './StudentPersonalLayout.module.css';

interface IStudentPersonalLayoutProps {
	children?: ReactNode;
}

const StudentPersonalLayout: FC<IStudentPersonalLayoutProps> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<StudentMenu />
			{children}
		</div>
	);
};

export default StudentPersonalLayout;
