'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import ButtonCustom from '@/components/ui/ButtonCustom';
import { StyledSwitch } from '@/components/ui/fields/switch/StyledSwitch';

import { useAuth } from '@/context/AuthContext';
import { notificationsItems } from '@/context/StudentPersonalContext';

import styles from './StudentNotificationsPage.module.css';

const StudentNotificationsPage = () => {
	const { role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Student') {
			router.replace('/partner-personal-account');
		}
	}, [role, router]);

	const [activeStates, setActiveStates] = useState<{ [key: string]: boolean }>(
		Object.fromEntries(notificationsItems.map((item) => [item, false])),
	);

	const toggleItem = (item: string) => {
		setActiveStates((prev) => ({
			...prev,
			[item]: !prev[item],
		}));
	};

	return (
		<div className={styles['notifications-card']}>
			<h3 className={styles['notifications-title']}>Настройка уведомлений</h3>
			<p className={styles['notifications-description']}>
				Вы можете выбрать категории предложений, которые не хотите просматривать и получать.
				Управлять предпочтениями вы можете в данном разделе
			</p>
			<div className={styles['notifications-grid']}>
				{notificationsItems.map((item) => (
					<div key={item} onClick={() => toggleItem(item)} className={styles['notification-item']}>
						<div className={styles['notification-text']}>{item}</div>
						<StyledSwitch
							checked={activeStates[item]}
							onChange={() => toggleItem(item)}
							onClick={(e: React.MouseEvent) => e.stopPropagation()}
						/>
					</div>
				))}
			</div>
			<ButtonCustom type="submit" className={styles['save-button']} disabled>
				Сохранить
			</ButtonCustom>
		</div>
	);
};

export default StudentNotificationsPage;
