import { FC } from 'react';

import clsx from 'clsx';
import { ClipLoader } from 'react-spinners';

import styles from './Loader.module.scss';

export interface ILoaderProps {
	color?: string;
	className?: string;
}

const Loader: FC<ILoaderProps> = ({ className, color = '#36d7b7' }) => {
	return (
		<div className={clsx(styles.loader, className)}>
			<ClipLoader size={50} color={color} />
		</div>
	);
};

export default Loader;
