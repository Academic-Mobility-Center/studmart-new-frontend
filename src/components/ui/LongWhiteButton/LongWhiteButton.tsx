import { FC, HTMLAttributes } from 'react';

import { Button } from '@mui/base';

import styles from './LongWhiteButton.module.css';

interface ILongWhiteButtonProps extends HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const LongWhiteButton: FC<ILongWhiteButtonProps> = ({ children }) => {
	return <Button className={`${styles.button}`}>{children}</Button>;
};

export default LongWhiteButton;
