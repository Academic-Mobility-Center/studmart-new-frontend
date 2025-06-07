'use client';

import './style.css';

import ImageGalleryWidget from '@/components/ImageGalleryWidget/ImageGalleryWidget';
import ServiceAudience from '@/components/ServiceAudience';
import StylishShoppingSection from '@/components/StylishShoppingSection';
import About from '@/components/about';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
	const { isAuthenticated } = useAuth();

	return (
		<div className="student-discount-portal">
			<div className="exclusive-discounts-section">
				<ImageGalleryWidget isAuthenticated={isAuthenticated} />
				<StylishShoppingSection />
			</div>
			{!isAuthenticated && (
				<>
					<ServiceAudience isAuthenticated={isAuthenticated} />
					<About isAuthenticated={isAuthenticated} />
				</>
			)}
		</div>
	);
}
