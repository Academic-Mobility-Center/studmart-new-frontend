'use client';

import { FC, ReactNode } from 'react';

import { ClipLoader } from 'react-spinners';

import NewFooter from '@/components/new-footer/NewFooter';
import NewHeader from '@/components/new-header/NewHeader';
import { useAuth } from '@/context/AuthContext';

import styles from './MainLayout.module.css';

interface IMainLayoutProps {
	children?: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();
	if (isLoading) {
		return (
			<div className={styles['loader-container']}>
				<ClipLoader size={50} color="#36d7b7" />
			</div>
		);
	}
	return (
		<div className={styles.layout}>
			<NewHeader isAuthenticated={isAuthenticated} />
			<main className={styles.content}>{children}</main>
			<NewFooter />
		</div>
	);
};

export default MainLayout;
