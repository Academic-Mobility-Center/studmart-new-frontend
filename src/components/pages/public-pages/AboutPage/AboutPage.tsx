'use client';

import AboutTheSystem from '@/components/sections/AboutTheSystem/AboutTheSystem';
import FaqBlock from '@/components/sections/FaqBlock/FaqBlock';
import WhyStudmart from '@/components/sections/WhyStudmart';

import styles from './AboutPage.module.css';
import { studentsFaqItemsArray, whyStudmartItems } from './studentsItems';

const AboutPage = () => {
	return (
		<div className={styles['about-page-inner']}>
			<div className={styles['about-page-content']}>
				<AboutTheSystem />
				<WhyStudmart items={whyStudmartItems} title="Зачем тебе «Студмарт»?" />
			</div>
			<FaqBlock items={studentsFaqItemsArray} />
		</div>
	);
};

export default AboutPage;
