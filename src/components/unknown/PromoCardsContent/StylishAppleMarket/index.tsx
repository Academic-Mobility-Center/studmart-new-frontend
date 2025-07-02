import StylishWrapper from '@/components/unknown/stylish-wrapper';

import '../style.css';

import PromoCardsDescriprion from '@/components/unknown/PromoCardsContent/promo-card-description';

function StylishAppleMarket() {
	return (
		<div className="delivery-service-card">
			<StylishWrapper category="golden-apple" />
			<PromoCardsDescriprion
				heading="Золотое Яблоко"
				discount="10"
				description="Магазин косметики"
			/>
		</div>
	);
}

export default StylishAppleMarket;
