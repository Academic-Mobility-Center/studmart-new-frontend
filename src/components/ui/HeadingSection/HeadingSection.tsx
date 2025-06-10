import { FC, HTMLAttributes } from 'react';

import styles from './HeadingSection.module.scss';

type IHeadingSectionProps = HTMLAttributes<HTMLHeadingElement>;

const HeadingSection: FC<IHeadingSectionProps> = ({ children, ...rest }) => {
	return (
		<h3 {...rest} className={styles['heading']}>
			{children}
		</h3>
	);
};

export default HeadingSection;
