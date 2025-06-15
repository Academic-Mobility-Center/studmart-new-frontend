import { FC, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './CardBrown.module.scss';

export interface ICardBrownProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const CardBrown: FC<ICardBrownProps> = ({ children, className, ...rest }) => {
	return (
		<div {...rest} className={clsx(styles['card-brown'], className)}>
			{children}
		</div>
	);
};

export default CardBrown;
