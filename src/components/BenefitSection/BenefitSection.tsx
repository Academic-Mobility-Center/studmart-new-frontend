import { FC } from 'react';

import { Button } from '@mui/base';
import Link from 'next/link';

import ServiceCard from '../service-card';
import styles from './BenefitSection.module.scss';

type CardProps = {
	title: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export interface IBenefitSectionProps {
	title: string;
	cards: CardProps[];
	buttonHref: string;
	backgroundColor?: string; // hex, rgb или linear-gradient
}

const BenefitSection: FC<IBenefitSectionProps> = ({
	title,
	cards,
	buttonHref,
	backgroundColor = 'linear-gradient(292.56deg, #fee200 0%, #ffeb4b 100%)',
}) => {
	return (
		<div className={styles['benefit-card']} style={{ background: backgroundColor }}>
			<p className={styles['section-title']}>{title}</p>
			<div className={styles['card-grid']}>
				{cards.map((card, index) => (
					<ServiceCard key={index} title={card.title} Icon={card.Icon} />
				))}
			</div>
			<Link href={buttonHref} className="w-full">
				<Button className={styles['button-style']}>Подробнее</Button>
			</Link>
		</div>
	);
};

export default BenefitSection;
