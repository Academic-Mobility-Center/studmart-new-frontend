import clsx from 'clsx';
import Image from 'next/image';

import styles from './FaqItem.module.css';

export interface IFaqItem extends React.HTMLAttributes<HTMLDivElement> {
	heading: string;
	isOpen?: boolean;
}

const FaqItem = ({ heading, isOpen, onClick, children, className, ...rest }: IFaqItem) => {
	return (
		<div {...rest} className={clsx(styles['faq-item'], className)} onClick={onClick}>
			<div className={styles['header']}>
				<p className={styles['heading']}>{heading}</p>
				<Image
					src="/icons/faq/down.svg"
					alt=""
					width={32}
					height={32}
					className={clsx(styles['arrow'], { [styles['arrow-rotated']]: isOpen })}
				/>
			</div>
			<div className={clsx(styles['content'], { [styles['content-open']]: isOpen })}>
				<p className={styles['text']}>{children}</p>
			</div>
		</div>
	);
};

export default FaqItem;
