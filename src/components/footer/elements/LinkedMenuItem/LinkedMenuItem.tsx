import clsx from 'clsx';
import Link from 'next/link';

import styles from './LinkedMenuItem.module.css';

interface ILinkedMenuItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
	disabled?: boolean;
	link: string;
}

const LinkedMenuItem = ({ children, link, className, disabled = false }: ILinkedMenuItemProps) => {
	if (disabled) {
		return <span className={clsx(styles['menu-item-disabled'], className)}>{children}</span>;
	}

	return (
		<Link href={link} className={clsx(styles['menu-item'], className)}>
			{children}
		</Link>
	);
};

export default LinkedMenuItem;
