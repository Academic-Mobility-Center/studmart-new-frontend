import Image from 'next/image';

import HeadingSection from '@/ui/HeadingSection';

import AnalyticalSvg from '@/public/icons/PartnerServicesSection/AnaliticalSvg';
import AudienceSvg from '@/public/icons/PartnerServicesSection/AudienceSvg';
import ForeignStudentSvg from '@/public/icons/PartnerServicesSection/ForeignStudentSvg';
import HandSvg from '@/public/icons/PartnerServicesSection/HandSvg';
import ProfitabilitySvg from '@/public/icons/PartnerServicesSection/ProfitabilitySvg';
import SalesSvg from '@/public/icons/PartnerServicesSection/SalesSvg';
import MoneySvg from '@/public/icons/StudentServicesSection/MoneySvg';
import ProcentSvg from '@/public/icons/StudentServicesSection/ProcentSvg';
import ReferalSvg from '@/public/icons/StudentServicesSection/ReferalSvg';

import BenefitSection from './BenefitSection';
import styles from './ServiceAudience.module.css';

interface Props {
	isAuthenticated: boolean;
}

const studentsCards = [
	{ title: 'Получаешь скидку 5–30%', Icon: ProcentSvg },
	{ title: 'Реферальная система', Icon: ReferalSvg },
	{ title: 'Бесплатно', Icon: MoneySvg },
	{ title: 'Доступ для иностранных студентов', Icon: ForeignStudentSvg },
];

const partnersCards = [
	{ title: 'Получаешь скидку 5–30%', Icon: ProfitabilitySvg },
	{ title: 'Реферальная система', Icon: AudienceSvg },
	{ title: 'Бесплатно', Icon: AnalyticalSvg },
	{ title: 'Доступ для иностранных студентов', Icon: SalesSvg },
];

function ServiceAudience({ isAuthenticated }: Props) {
	if (isAuthenticated) return null;

	return (
		<div className={styles['content-container']}>
			<HeadingSection>Кому пригодится сервис?</HeadingSection>
			<div className={styles['cards']}>
				<div className={styles['student-card']}>
					<BenefitSection
						title="Студентам"
						cards={studentsCards}
						buttonHref="about"
						backgroundColor="linear-gradient(113.42deg, rgb(255, 211, 255, 1) 0%, rgb(255, 185, 255, 1) 100%)"
					/>
					<div className={styles['smile-container']}>
						<Image
							fill
							src="/icons/home/yellowSmile.svg"
							alt=""
							className={styles['smile-image']}
						/>
					</div>
				</div>
				<div className={styles['partner-card']}>
					<BenefitSection title="Партнерам" cards={partnersCards} buttonHref="partners" />
					<div className={styles['hand-container']}>
						<HandSvg className={styles['hand-image']} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ServiceAudience;
