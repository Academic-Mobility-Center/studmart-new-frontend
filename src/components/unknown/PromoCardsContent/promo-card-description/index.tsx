import './style.css';

import { Button } from '@mui/base';

interface Props {
	heading: string;
	description: string;
	discount: string;
}
export default function PromoCardsDescriprion({ heading, description, discount }: Props) {
	return (
		<div className="promo-card1">
			<div className="delivery-service-section">
				<p className="golden-apple-heading">{heading}</p>
				<p className="golden-apple-cosmetics-description">{description}</p>
			</div>
			<div className="discount-button-container">
				<Button className="discount-button1">-{discount}%</Button>
			</div>
		</div>
	);
}
