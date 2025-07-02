import ImageGalleryWidget from '@/components/sections/ImageGalleryWidget/ImageGalleryWidget';
import StylishShoppingSection from '@/components/sections/StylishShoppingSection';

import './style.css';

function DynamicDisplayWidget() {
	return (
		<div className="exclusive-discounts-section">
			<ImageGalleryWidget isAuthenticated />
			<StylishShoppingSection />
		</div>
	);
}

export default DynamicDisplayWidget;
