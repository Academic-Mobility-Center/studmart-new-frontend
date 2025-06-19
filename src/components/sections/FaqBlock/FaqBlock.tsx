'use client';

import { useState } from 'react';

import FaqItem from '@/components/sections/FaqBlock/FaqItem/FaqItem';
import HeadingSection from '@/components/ui/HeadingSection';

import { IFaqItem } from '@/types/FaqItems';

import styles from './Faq.module.css';

interface IFaqProps {
	items: IFaqItem[];
}

const FaqBlock = ({ items }: IFaqProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleClick = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className={styles['faq-container']}>
			<HeadingSection>FAQ</HeadingSection>
			<div className={styles['faq-grid']}>
				{items.map((item, index) => (
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

export default FaqBlock;
