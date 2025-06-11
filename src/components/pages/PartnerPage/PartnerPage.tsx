import Image from 'next/image';

import Faq from '@/components/FAQ/Faq';
import WhyStudmart from '@/components/WhyStudmart';
import AboutTheSystem from '@/components/pages/about-page-elements/about-the-system/AboutTheSystem';
import LongWhiteButton from '@/components/ui/LongWhiteButton';

import styles from './PartnersPage.module.css';
import { partnerWhyItem, partnersFaqItemsArray } from './partnersItems';

const PartnersPage = () => {
	return (
		<div className={styles['container']}>
			<AboutTheSystem
				title="О сотрудничестве с нами"
				description="Как привлечь постоянных клиентов и стать известнее? Присоединиться к программе"
				type="partners"
			/>
			<WhyStudmart items={partnerWhyItem} title="Что дает «Студмарт»?" scribbleShow />
			<div className={styles['banner-wrapper']}>
				<div className={styles['banner-box']}>
					<p className={styles['banner-text']}>
						Бесплатный тестовый доступ до 31 декабря 2025 года
					</p>
					<div className={styles['banner-button']}>
						<LongWhiteButton>Оставить заявку</LongWhiteButton>
					</div>
					<div className={styles['banner-image']}>
						<Image alt="" src="/icons/partners/access-procent.svg" fill />
					</div>
				</div>
			</div>
			<Faq items={partnersFaqItemsArray} />
		</div>
	);
};

export default PartnersPage;
