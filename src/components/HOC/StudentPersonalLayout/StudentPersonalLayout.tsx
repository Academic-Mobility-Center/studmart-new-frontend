'use client';

import { FC, ReactNode } from 'react';

import StudentMenu from '@/components/menu/student-personal-account-menu/StudentPersonalAccountMenu';
import ButtonCustom from '@/components/ui/ButtonCustom';
import { useAuth } from '@/context/AuthContext';

import styles from './StudentPersonalLayout.module.css';

interface IStudentPersonalLayoutProps {
	children?: ReactNode;
}

const StudentPersonalLayout: FC<IStudentPersonalLayoutProps> = ({ children }) => {
	const { logout } = useAuth();
	return (
		<div className={styles.layout}>
			<StudentMenu />
			{children}
			<ButtonCustom className={styles.button} customType="white" onClick={logout}>
				Выйти из аккаунта
			</ButtonCustom>
		</div>
	);
};

export default StudentPersonalLayout;
