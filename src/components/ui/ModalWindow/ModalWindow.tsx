import { FC, Fragment, ReactNode } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import CloseIcon from '@/assets/icons/close.svg';

import ButtonCustom from '../ButtonCustom';
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
				<div onClick={onClose} className={styles['outer-click']} />
				<div className={styles['content']}>
					<div className={styles.header}>
						<ButtonCustom className={styles.close} onClick={onClose} customType="white">
							<CloseIcon />
						</ButtonCustom>
					</div>
					{children}
				</div>
			</Dialog>
		</Transition>
	);
};

export default ModalWindow;
