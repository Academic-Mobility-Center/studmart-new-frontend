'use client';

import { FC } from 'react';

import AboutStudmart from '@/components/sections/AboutStudmart';
import ImageGalleryWidget from '@/components/sections/ImageGalleryWidget/ImageGalleryWidget';
import ServiceAudience from '@/components/sections/ServiceAudience';
import StylishShoppingSection from '@/components/sections/StylishShoppingSection';

import { useAuth } from '@/context/AuthContext';

import styles from './HomePage.module.css';

const HomePage: FC = () => {
	const { isAuthenticated } = useAuth();
	return (
		<div className={styles['home-screen']}>
			<div className={styles['image-cards']}>
				<ImageGalleryWidget isAuthenticated={isAuthenticated} />
				<StylishShoppingSection />
			</div>
			{!isAuthenticated && (
				<div className={styles['info-panel']}>
					<ServiceAudience isAuthenticated={isAuthenticated} />
					<AboutStudmart isAuthenticated={isAuthenticated} />
				</div>
			)}
		</div>
	);
};

export default HomePage;
