'use client';

import './style.css';

import AboutStudmart from '@/components/sections/AboutStudmart';
import ImageGalleryWidget from '@/components/sections/ImageGalleryWidget/ImageGalleryWidget';
import ServiceAudience from '@/components/sections/ServiceAudience';
import StylishShoppingSection from '@/components/sections/StylishShoppingSection';

import { useAuth } from '@/context/AuthContext';

export default function Home() {
	const { isAuthenticated } = useAuth();

	return (
		<div className="home-screen">
			<div className="image-cards">
				<ImageGalleryWidget isAuthenticated={isAuthenticated} />
				<StylishShoppingSection />
			</div>
			{!isAuthenticated && (
				<div className="info-panel">
					<ServiceAudience isAuthenticated={isAuthenticated} />
					<AboutStudmart isAuthenticated={isAuthenticated} />
				</div>
			)}
		</div>
	);
}
