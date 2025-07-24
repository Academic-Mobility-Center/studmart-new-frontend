'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { getPromocodeCategories } from '@/lib/api/promocodes';

import { useAuth } from '@/context/AuthContext';
import { ScrollContainer, StyledButton } from '@/context/HomePageContext';
import MenuItem from '@/types/MenuItem';

import styles from './style.module.css';

interface FavoriteCategoriesSectionProps {
	selectedCategoryId: number | null;
	onSelectCategory: (id: number | null) => void;
}

interface Category {
	id: number;
	name: string;
	Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	IconUrl?: string;
}

export default function FavoriteCategoriesSection({
	selectedCategoryId,
	onSelectCategory,
}: FavoriteCategoriesSectionProps) {
	const [fetchedMenuItems, setFetchedMenuItems] = useState<MenuItem[]>([]);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const { isAuthenticated, role } = useAuth();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categories = await getPromocodeCategories();
				if (categories) {
					const withIcons = categories.map((category: Category) => ({
						...category,
						IconUrl:
							category.IconUrl ||
							`https://files.${process.env.NEXT_PUBLIC_API_URL}/Categories/${category.id}`,
					}));

					const favorite = {
						id: 0,
						name: 'Избранное',
						IconUrl: '/icons/home/star.svg',
					};
					const others = withIcons.filter((c: Category) => c.name !== 'Избранное');

					const finalMenu =
						isAuthenticated && favorite && role === 'Student' ? [favorite, ...others] : others;

					setFetchedMenuItems(finalMenu);
				}
			} catch (error) {
				console.error(error);
				setFetchedMenuItems([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, [isAuthenticated, role]);

	useEffect(() => {
		if (loading) return;

		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		const updateScrollButtons = () => {
			setCanScrollLeft(scrollContainer.scrollLeft > 0);
			setCanScrollRight(
				scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth,
			);
		};

		const handleWheelScroll = (event: WheelEvent) => {
			if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
				scrollContainer.scrollLeft += event.deltaY;
				event.preventDefault();
				updateScrollButtons();
			}
		};

		scrollContainer.addEventListener('scroll', updateScrollButtons);
		scrollContainer.addEventListener('wheel', handleWheelScroll, { passive: false });
		updateScrollButtons();

		return () => {
			scrollContainer.removeEventListener('scroll', updateScrollButtons);
			scrollContainer.removeEventListener('wheel', handleWheelScroll);
		};
	}, [loading]);

	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		let isDragging = false;
		let startX = 0;
		let scrollLeft = 0;

		const handleMouseDown = (e: MouseEvent) => {
			isDragging = true;
			container.classList.add(styles.dragging); // Добавь стили, если нужно
			startX = e.pageX - container.offsetLeft;
			scrollLeft = container.scrollLeft;
		};

		const handleMouseLeave = () => {
			isDragging = false;
			container.classList.remove(styles.dragging);
		};

		const handleMouseUp = () => {
			isDragging = false;
			container.classList.remove(styles.dragging);
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			e.preventDefault();
			const x = e.pageX - container.offsetLeft;
			const walk = (x - startX) * 1.5; // скорость скролла
			container.scrollLeft = scrollLeft - walk;
		};

		container.addEventListener('mousedown', handleMouseDown);
		container.addEventListener('mouseleave', handleMouseLeave);
		container.addEventListener('mouseup', handleMouseUp);
		container.addEventListener('mousemove', handleMouseMove);

		return () => {
			container.removeEventListener('mousedown', handleMouseDown);
			container.removeEventListener('mouseleave', handleMouseLeave);
			container.removeEventListener('mouseup', handleMouseUp);
			container.removeEventListener('mousemove', handleMouseMove);
		};
	}, [loading]);

	const scrollBy = (amount: number) => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
		}
	};

	const IconComponent = ({ iconUrl }: { iconUrl?: string }) =>
		iconUrl ? (
			<Image
				src={iconUrl}
				width={24}
				height={24}
				alt=""
				unoptimized
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						`https://files.${process.env.NEXT_PUBLIC_API_URL}/Categories/9`;
				}}
			/>
		) : (
			<div style={{ width: 24, height: 24 }} />
		);

	return (
		<div className={styles.category}>
			{!loading && (
				<div>
					<ScrollContainer
						ref={scrollRef}
						style={{
							overflowX: 'auto',
							display: 'flex',
							gap: '8px',
							padding: '0 20px',
							scrollBehavior: 'auto',
						}}
					>
						{fetchedMenuItems.map(({ name, IconUrl, id }) => (
							<StyledButton
								key={id}
								onClick={() =>
									onSelectCategory(
										typeof id === 'number' ? (id === selectedCategoryId ? null : id) : null,
									)
								}
								style={{
									background: id === selectedCategoryId ? '#e0f7fa' : '#f8f8f8',
									borderColor: id === selectedCategoryId ? '#8fe248' : 'rgba(0, 0, 0, 0.2)',
								}}
							>
								<IconComponent iconUrl={IconUrl} />
								{name}
							</StyledButton>
						))}
					</ScrollContainer>

					{/* Кнопки под меню */}
					<div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
						<button
							onClick={() => scrollBy(-200)}
							disabled={!canScrollLeft}
							style={{
								opacity: canScrollLeft ? 1 : 0.3,
								cursor: canScrollLeft ? 'pointer' : 'default',
								background: 'none',
								border: 'none',
								fontSize: 24,
								color: '#8fe248',
							}}
						>
							◀
						</button>
						<button
							onClick={() => scrollBy(200)}
							disabled={!canScrollRight}
							style={{
								opacity: canScrollRight ? 1 : 0.3,
								cursor: canScrollRight ? 'pointer' : 'default',
								background: 'none',
								border: 'none',
								fontSize: 24,
								color: '#8fe248',
							}}
						>
							▶
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
