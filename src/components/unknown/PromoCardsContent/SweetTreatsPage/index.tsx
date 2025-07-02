import StylishWrapper from '@/components/unknown/stylish-wrapper';

import '../style.css';

import PromoCardsDescriprion from '@/components/unknown/PromoCardsContent/promo-card-description';

function SweetTreatsPage() {
	return (
		<div className="delivery-service-card">
			<StylishWrapper category="treats" />
			<PromoCardsDescriprion heading="Шоколадница" discount="15" description="Сеть кофеен" />
		</div>
	);
}

export default SweetTreatsPage;
