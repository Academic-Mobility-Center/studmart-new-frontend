'use client';

import { Button } from '@mui/base';
import Link from 'next/link';

import AudienceSvg from '../../../public/icons/PartnerServicesSection/AudienceSvg';
import ProfitabilitySvg from '../../../public/icons/PartnerServicesSection/ProfitabilitySvg';
import ImageDisplayWidget from '../ImageDisplayWidget';
import SalesChannelCard from '../SalesChannelCard';
import ServiceCard from '../service-card';
import styles from './PartnerSection.module.css';

function PartnerSection() {
	return (
		<div className={styles.container}>
			<div className={styles['main-content']}>
				<div className={styles['left-column']}>
					<p className={styles['section-title']}>Партнерам</p>
					<div className={styles['service-card-list']}>
						<ServiceCard title="Окупаемая стоимость" Icon={ProfitabilitySvg} />
						<ServiceCard title="Точно определяемая аудитория" Icon={AudienceSvg} />
					</div>
				</div>
				<div className={styles['right-column']}>
					<ImageDisplayWidget />
					<SalesChannelCard />
				</div>
			</div>
			<Link href="partners">
				<Button className={styles['details-button']}>Подробнее</Button>
			</Link>
		</div>
	);
}

export default PartnerSection;
