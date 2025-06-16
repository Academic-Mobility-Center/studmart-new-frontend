'use client';

import { FC, HTMLAttributes, useEffect, useRef } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ButtonCustom from '@/components/ui/ButtonCustom';
import { useAuth } from '@/context/AuthContext';

import styles from './StudentMenu.module.css';

const menuItems = [
	{ icon: 'id-card', label: 'Студмарт ID', href: '/student-personal-account/id' },
	{ icon: 'profile', label: 'Личная информация', href: '/student-personal-account/profile' },
	{
		icon: 'link',
		label: ' Реферальная программа',
		href: '/student-personal-account/referal-program',
	},
	{
		icon: 'admin-pannel-settings',
		label: 'Политика персональных данных',
		href: '/student-personal-account/policy',
	},
	{
		icon: 'notification-settings',
		label: 'Настройка уведомлений',
		href: '/student-personal-account/notifications',
	},
	{ icon: 'bank', label: 'Банковские реквизиты', href: '/student-personal-account/credentials' },
	{ icon: 'faq', label: 'FAQ', href: '/student-personal-account/faq' },
];

interface IStudentMenu extends HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const StudentMenu: FC<IStudentMenu> = ({ className, ...rest }) => {
	const pathname = usePathname();
	const { logout } = useAuth();
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const onWheel = (e: WheelEvent) => {
			if (e.deltaY === 0) return;
			e.preventDefault();
			wrapper.scrollLeft += e.deltaY;
		};

		wrapper.addEventListener('wheel', onWheel, { passive: false });

		return () => wrapper.removeEventListener('wheel', onWheel);
	}, []);

	return (
		<nav {...rest} className={clsx(styles.menu, className)}>
			<div ref={wrapperRef} className={styles['menu-wrapper']}>
				{menuItems.map(({ icon, label, href }) => {
					const isActive = pathname === href;
					return (
						<Link
							key={icon}
							href={href}
							className={clsx(styles['menu-item'], { [styles['menu-item-active']]: isActive })}
						>
							<Image
								src={`/icons/student-account/${icon}.svg`}
								className={styles.icon}
								alt=""
								width={24}
								height={24}
							/>
							<span className={styles.text}>{label}</span>
						</Link>
					);
				})}
			</div>
			<ButtonCustom className={styles.button} customType="white" onClick={logout}>
				Выйти из аккаунта
			</ButtonCustom>
		</nav>
	);
};

export default StudentMenu;
