'use client';

import { useState } from 'react';

import FaqItem from '@/components/faq-item/FaqItem';

const Faq = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleClick = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const faqItems = [
		{
			heading: 'Какую скидку должны предлагать партнеры?',
			p1: 'Минимум — 5%. Но в интересах бизнеса давать большую скидку, чтобы',
			p2: 'выделиться на фоне конкурентов и привлечь внимание покупателей.',
		},
		{
			heading: 'Сколько стоит участие?',
			p1: 'Минимум — 5%. Но в интересах бизнеса давать большую скидку, чтобы',
			p2: 'выделиться на фоне конкурентов и привлечь внимание покупателей.',
		},
		{
			heading: 'Какой функционал получают компании-партнеры?',
			p1: 'Минимум — 5%. Но в интересах бизнеса давать большую скидку, чтобы',
			p2: 'выделиться на фоне конкурентов и привлечь внимание покупателей.',
		},
		{
			heading: 'Можно интегрировать «Студмарт» с уже существующей программой лояльности?',
			p1: 'Минимум — 5%. Но в интересах бизнеса давать большую скидку, чтобы',
			p2: 'выделиться на фоне конкурентов и привлечь внимание покупателей.',
		},
	];

	return (
		<div className="w-full mt-[97px]">
			<p className="font-nunito text-4xl font-extrabold tracking-[1.08px] leading-9 text-[#032c28]">
				FAQ
			</p>
			<div className="grid grid-cols-2 gap-[30px] mt-10">
				{faqItems.map((item, index) => (
					<FaqItem
						key={index}
						heading={item.heading}
						isOpen={openIndex === index}
						onClick={() => handleClick(index)}
					>
						{item.p1}
						<br />
						{item.p2}
					</FaqItem>
				))}
			</div>
		</div>
	);
};

export default Faq;
