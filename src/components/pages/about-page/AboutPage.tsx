'use client';

import AboutTheSystem from '../about-page-elements/about-the-system/AboutTheSystem';
import Faq from '../about-page-elements/faq/Faq';
import NeedStudmart from '../about-page-elements/need-studmart/NeedStudmart';
import styles from './AboutPage.module.css';

const AboutPage = () => {
	return (
		<div className={styles['about-page-inner']}>
			<div className={styles['about-page-content']}>
				<AboutTheSystem />
				<NeedStudmart />
			</div>
			<Faq />
		</div>
	);
};

export default AboutPage;
