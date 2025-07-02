import PromoCardsDescriprion from '@/components/unknown/PromoCardsContent/promo-card-description';

import './style.css';

import StylishWrapper from '@/components/unknown/stylish-wrapper';

function CreativeHub() {
	return (
		<div className="academic-mobility-center-card">
			<StylishWrapper category="academic" />
			<PromoCardsDescriprion
				heading="Центр Академической Мобильности"
				discount="15"
				description="Центр академической мобильности"
			/>
		</div>
	);
}

export default CreativeHub;
