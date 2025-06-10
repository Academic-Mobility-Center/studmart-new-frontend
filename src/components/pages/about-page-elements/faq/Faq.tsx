import { useState } from 'react';

import FaqItem from '@/components/faq-item/FaqItem';
import HeadingSection from '@/components/ui/HeadingSection';

import styles from './Faq.module.css';
import { faqItemsArray } from './Items';

const Faq = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleClick = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className={styles['faq-container']}>
			<HeadingSection>FAQ</HeadingSection>
			<div className={styles['faq-grid']}>
				{faqItemsArray.map((item, index) => (
					<FaqItem
						key={index}
						{...item}
						isOpen={openIndex === index}
						onClick={() => handleClick(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default Faq;
