'use client';

import NewFooter from '@/components/new-footer/NewFooter';
import NewHeader from '@/components/new-header/NewHeader';

import './style.css';

import { ClipLoader } from 'react-spinners';

import ImageGalleryWidget from '@/components/ImageGalleryWidget/ImageGalleryWidget';
import ServiceAudience from '@/components/ServiceAudience';
import StylishShoppingSection from '@/components/StylishShoppingSection';
import About from '@/components/about';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="loader-container">
				{' '}
				<ClipLoader size={50} color="#36d7b7" />{' '}
			</div>
		);
	}
	return (
		<div className="main-content">
			<div className="content">
				<NewHeader isAuthenticated={isAuthenticated} />
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
				<NewFooter isAuthenticated={isAuthenticated} />
			</div>
		</div>
	);
}
