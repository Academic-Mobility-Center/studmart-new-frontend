'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { StyledSwitch } from '@/components/fields/switch/StyledSwitch';
import ButtonCustom from '@/components/ui/ButtonCustom';
import {
	categoriesAndServices,
	personalDataItems,
} from '@/app/(student)/student-personal-account/context';
import { useAuth } from '@/context/AuthContext';

import styles from './StudentPolicyPage.module.css';
import { ArrowDown } from './icons/ArrowDown';
import { ArrowUp } from './icons/ArrowUp';

const StudentPolicyPage = () => {
	const { role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (role && role !== 'Student') {
			router.replace('/partner-personal-account');
		}
	}, [role, router]);

	const [categoryStates, setCategoryStates] = useState(
		Object.fromEntries(categoriesAndServices.map((item) => [item.heading, true])),
	);
	const [selectedMenuItem, setSelectedMenuItem] = useState<'categories' | 'data' | null>(
		'categories',
	);
	const [activeStates, setActiveStates] = useState(
		Object.fromEntries(personalDataItems.map((item) => [item, true])),
	);
	const [expandedStates, setExpandedStates] = useState(
		Object.fromEntries(categoriesAndServices.map((item) => [item.heading, false])),
	);

	const toggleExpand = (heading: string) => {
		setExpandedStates((prev) => ({
			...prev,
			[heading]: !prev[heading],
		}));
	};

	const toggleItem = (item: string) => {
		setActiveStates((prev) => ({
			...prev,
			[item]: !prev[item],
		}));
	};

	return (
		<div className={styles['card-container']}>
			<h3 className={styles['title']}>Управление данными</h3>

			<div className={styles['menu-buttons']}>
				<ButtonCustom
					customType="white"
					className={clsx(styles['menu-button'], {
						[styles['select-menu']]: selectedMenuItem === 'categories',
					})}
					onClick={() => setSelectedMenuItem('categories')}
				>
					Категории и услуги
				</ButtonCustom>
				<ButtonCustom
					customType="white"
					className={clsx(styles['menu-button'], {
						[styles['select-menu']]: selectedMenuItem === 'data',
					})}
					onClick={() => setSelectedMenuItem('data')}
				>
					Персональные данные
				</ButtonCustom>
			</div>

			{selectedMenuItem === 'data' && (
				<div className={styles['data']}>
					{personalDataItems.map((item) => (
						<div key={item} onClick={() => toggleItem(item)} className={styles['data-item']}>
							{item}
							<StyledSwitch
								checked={activeStates[item]}
								onChange={() => toggleItem(item)}
								onClick={(e) => e.stopPropagation()}
							/>
						</div>
					))}
				</div>
			)}

			{selectedMenuItem === 'categories' && (
				<div className={styles['category-wrapper']}>
					{categoriesAndServices.map(({ heading, p, p_array }) => {
						const isExpanded = expandedStates[heading];
						return (
							<div key={heading} className={styles['category-item']}>
								<div className={styles['category-header']}>
									<p>{heading}</p>
									<div className={styles['category-controls']}>
										<StyledSwitch
											checked={categoryStates[heading]}
											onClick={(e) => e.stopPropagation()}
											onChange={() =>
												setCategoryStates((prev) => ({
													...prev,
													[heading]: !prev[heading],
												}))
											}
										/>
										<div onClick={() => toggleExpand(heading)} className={styles['toggle-icon']}>
											{isExpanded ? <ArrowUp /> : <ArrowDown />}
										</div>
									</div>
								</div>

								{isExpanded && (
									<>
										<p className={styles['category-description']}>{p}</p>
										<div className={styles['category-list']}>
											{Object.values(p_array).map((item, idx) => (
												<p key={idx}>{item}</p>
											))}
										</div>
									</>
								)}
							</div>
						);
					})}
				</div>
			)}

			{selectedMenuItem !== null && (
				<ButtonCustom type="submit" className={styles['save-button']} disabled>
					Сохранить
				</ButtonCustom>
			)}
		</div>
	);
};

export default StudentPolicyPage;
