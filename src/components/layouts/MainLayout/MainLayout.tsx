'use client';

import { FC, ReactNode } from 'react';

import NewFooter from '@/components/sections/NewFooter/NewFooter';
import NewHeader from '@/components/sections/NewHeader/NewHeader';
import Loader from '@/components/ui/Loader';

import { useAuth } from '@/context/AuthContext';

import styles from './MainLayout.module.css';

interface IMainLayoutProps {
	children?: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
	const { isLoading } = useAuth();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.layout}>
			<NewHeader />
			<main className={styles.content}>{children}</main>
			<NewFooter />
		</div>
	);
};

export default MainLayout;
