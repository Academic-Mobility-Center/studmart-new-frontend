import { FC, Fragment, ReactNode } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import styles from './ModalWindow.module.scss';

export interface IModalWindowProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose: () => void;
	appear?: boolean;
}

const ModalWindow: FC<IModalWindowProps> = ({
	isOpen,
	onClose,
	children,
	className,
	appear = true,
}) => {
	return (
		<Transition appear={appear} show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				onClose={onClose}
				className={clsx(styles['modal-window'], 'backdrop-blur-xs', className)}
			>
				<div className={styles['content']}>
					<div onClick={onClose} className={styles['outer-click']} />
					{children}
				</div>
			</Dialog>
		</Transition>
	);
};

export default ModalWindow;
