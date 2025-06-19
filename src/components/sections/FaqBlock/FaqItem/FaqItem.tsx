'use client';

import { MouseEvent, useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { IFaqItem } from '@/types/FaqItems';

import styles from './FaqItem.module.css';

const FaqItem = ({ heading, isOpen, onClick, children, className, ...rest }: IFaqItem) => {
	const [isExpanded, setIsExpanded] = useState(!!isOpen);

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (onClick) {
			onClick(e);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	useEffect(() => {
		setIsExpanded(!!isOpen);
	}, [isOpen]);

	return (
		<div {...rest} className={clsx(styles['faq-item'], className)} onClick={handleClick}>
			<div className={styles['header']}>
				<p className={styles['heading']}>{heading}</p>
				<Image
					src="/icons/faq/down.svg"
					alt=""
					width={32}
					height={32}
					className={clsx(styles['arrow'], { [styles['arrow-rotated']]: isExpanded })}
				/>
			</div>
			<div className={clsx(styles['content'], { [styles['content-open']]: isExpanded })}>
				<div className={styles['text']}>{children}</div>
			</div>
		</div>
	);
};

export default FaqItem;
