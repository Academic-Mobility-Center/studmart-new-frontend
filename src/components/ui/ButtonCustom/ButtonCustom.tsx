import { ButtonHTMLAttributes, FC } from 'react';

import { Button } from '@mui/base';
import clsx from 'clsx';

import styles from './ButtonCustom.module.css';

interface IButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	customType?: 'primary' | 'secondary' | 'white';
}

const ButtonCustom: FC<IButtonCustomProps> = ({
	className,
	children,
	customType = 'primary',
	...rest
}) => {
	return (
		<Button
			{...rest}
			className={clsx(
				styles.button,
				{
					[styles.white]: customType === 'white',
					[styles.primary]: customType === 'primary',
					[styles.secondary]: customType === 'secondary',
				},
				className,
			)}
		>
			{children}
		</Button>
	);
};

export default ButtonCustom;
