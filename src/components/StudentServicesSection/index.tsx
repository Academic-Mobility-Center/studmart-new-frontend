'use client';

import { Button } from '@mui/base';
import Link from 'next/link';

import ForeignStudentSvg from '../../../public/icons/PartnerServicesSection/ForeignStudentSvg';
import MoneySvg from '../../../public/icons/StudentServicesSection/MoneySvg';
import ProcentSvg from '../../../public/icons/StudentServicesSection/ProcentSvg';
import ReferalSvg from '../../../public/icons/StudentServicesSection/ReferalSvg';
import ServiceCard from '../service-card';
import styles from './StudentServicesSection.module.css';

function StudentServicesSection() {
	return (
		<div className={styles['student-benefit-card']}>
			<p className={styles['student-title-heading']}>Студентам</p>
			<div className={styles['card-tabs']}>
				<ServiceCard title="Получаешь скидку 5–30%" Icon={ProcentSvg} />
				<ServiceCard title="Реферальная система" Icon={ReferalSvg} />
				<ServiceCard title="Бесплатно" Icon={MoneySvg} />
				<ServiceCard title="Доступ для иностранных студентов" Icon={ForeignStudentSvg} />
			</div>
			<Link href="about" className="w-full">
				<Button className={styles['promo-button-style']}>Подробнее</Button>
			</Link>
		</div>
	);
}

export default StudentServicesSection;
