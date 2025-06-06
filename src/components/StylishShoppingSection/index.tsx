import { useState } from 'react';

import FavoriteCategoriesSection from '../FavoriteCategoriesSection';
import StylishWidgetSection from '../StylishWidgetSection';

import './style.css';

// import { PromoCard } from "../promo-card/PromoCard";

function StylishShoppingSection() {
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

	return (
		<div className="beauty-health-container2">
			<FavoriteCategoriesSection
				selectedCategoryId={selectedCategoryId ?? null}
				onSelectCategory={setSelectedCategoryId}
			/>
			<StylishWidgetSection selectedCategoryId={selectedCategoryId ?? null} />
		</div>
	);
}

export default StylishShoppingSection;
