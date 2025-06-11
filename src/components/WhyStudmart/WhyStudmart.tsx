import { FC } from 'react';

import Image from 'next/image';

import NeedStudmartItem from '../pages/about-page-elements/need-studmart-item/NeedStudmartItem';
import styles from './WhyStudmart.module.css';

export interface IWhyStudmartItem {
	url: string;
	title: string;
	content: React.ReactNode;
}
export interface IWhyStudmartProps {
	title?: string;
	items: IWhyStudmartItem[];
	scribbleShow?: boolean;
}

const WhyStudmart: FC<IWhyStudmartProps> = ({ title, items, scribbleShow }) => {
	return (
		<div className={styles['box']}>
			<p className={styles['title']}>{title}</p>
			<div className={styles['items']}>
				{items.map((item, index) => (
					<NeedStudmartItem key={index} url={item.url} title={item.title}>
						{item.content}
					</NeedStudmartItem>
				))}
			</div>
			{scribbleShow && (
				<div className={styles['image']}>
					<Image
						src="/icons/partners/what-gives.svg"
						className="absolute bottom-0 right-0 z-[1] -mx-2.5"
						alt=""
						fill
					/>
				</div>
			)}
		</div>
	);
};

export default WhyStudmart;
