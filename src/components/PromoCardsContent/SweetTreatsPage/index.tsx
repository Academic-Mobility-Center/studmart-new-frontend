import StylishWrapper from '@/components/stylish-wrapper';

import '../../PromoCardsContent/style.css';

import PromoCardsDescriprion from '@/components/promo-card-description';

function SweetTreatsPage() {
	return (
		<div className="delivery-service-card">
			<StylishWrapper category="treats" />
			<PromoCardsDescriprion heading="Шоколадница" discount="15" description="Сеть кофеен" />
		</div>
	);
}

export default SweetTreatsPage;
