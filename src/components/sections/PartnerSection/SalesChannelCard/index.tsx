import SalesSvg from '@/public/icons/PartnerServicesSection/SalesSvg';

import './style.css';

function SalesChannelCard() {
	return (
		<div className="sales-channel-container">
			<SalesSvg className="discount-image" />
			<p className="green-title-heading">Новый канал продаж и продвижения</p>
		</div>
	);
}

export default SalesChannelCard;
