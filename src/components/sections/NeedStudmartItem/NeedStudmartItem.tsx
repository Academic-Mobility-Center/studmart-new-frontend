import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import styles from './NeedStudmartItem.module.css';

interface INeedStudmartItem extends React.HTMLAttributes<HTMLDivElement> {
	url: string;
	title: string;
	subtitle?: string;
}

const NeedStudmartItem = ({
	url,
	title,
	subtitle,
	children,
	className,
	...rest
}: INeedStudmartItem) => {
	return (
		<div {...rest} className={clsx(styles['item-container'], className)}>
			<div className={styles['item-image']}>
				<Image alt="" src={url} fill />
			</div>
			<div className={styles['text-container']}>
				<p className={styles['title']}>
					{title.split('\n').map((line, i) => (
						<React.Fragment key={i}>
							{line}
							<br />
						</React.Fragment>
					))}
					{subtitle}
				</p>
				<p className={styles['description']}>{children}</p>
			</div>
		</div>
	);
};

export default NeedStudmartItem;
