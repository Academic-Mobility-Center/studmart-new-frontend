import { FC, ReactNode } from 'react';

import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

import styles from './ModalWindow.module.scss';

export interface IModalWindowProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose: () => void;
}

const ModalWindow: FC<IModalWindowProps> = ({ isOpen, onClose, children, className }) => {
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className={clsx(styles['modal-window'], 'backdrop-blur-xs', className)}
		>
			<div onClick={onClose} className={styles['outer-click']} />
			{children}
		</Dialog>
	);
};

export default ModalWindow;
