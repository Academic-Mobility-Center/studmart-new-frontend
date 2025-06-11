'use client';

import WhyStudmart from '@/components/WhyStudmart';

import Faq from '../../FAQ/Faq';
import AboutTheSystem from '../about-page-elements/about-the-system/AboutTheSystem';
import styles from './AboutPage.module.css';
import { studentsFaqItemsArray, whyStudmartItems } from './studentsItems';

const AboutPage = () => {
	return (
		<div className={styles['about-page-inner']}>
			<div className={styles['about-page-content']}>
				<AboutTheSystem />
				<WhyStudmart items={whyStudmartItems} title="Зачем тебе «Студмарт»?" />
			</div>
			<Faq items={studentsFaqItemsArray} />
		</div>
	);
};

export default AboutPage;
