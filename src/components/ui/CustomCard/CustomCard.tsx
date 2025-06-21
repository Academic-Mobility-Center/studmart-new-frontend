import { FC, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './CustomCard.module.scss';

export interface ICustomCardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	customColor?: 'brown' | 'white';
}

const CustomCard: FC<ICustomCardProps> = ({
	children,
	className,
	customColor = 'brown',
	...rest
}) => {
	return (
		<div
			{...rest}
			className={clsx(
				styles['card'],
				{ [styles['card-white']]: customColor === 'white' },
				className,
			)}
		>
			{children}
		</div>
	);
};

export default CustomCard;
