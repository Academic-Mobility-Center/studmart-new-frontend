import './style.css';

import PromoCardsDescriprion from '@/components/unknown/PromoCardsContent/promo-card-description';
import StylishWrapper from '@/components/unknown/stylish-wrapper';

function StylishService() {
	return (
		<div className="delivery-service-card">
			<StylishWrapper category="delivery" />
			<PromoCardsDescriprion heading="Самокат" discount="10" description="Сервис доставки" />
		</div>
	);
}

export default StylishService;
