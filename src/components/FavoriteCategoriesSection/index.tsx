// "use client";
// import "./style.css";
// import { useEffect, useRef, useState } from "react";
// import { getPromocodeCategories } from "@/lib/api/promocodes";
// import { ScrollContainer, StyledButton } from "@/app/home/context";
// import MenuItem from "@/types/MenuItem";
// import Image from "next/image";
// import { useAuth } from "@/context/AuthContext";
// interface FavoriteCategoriesSectionProps {
//   selectedCategoryId: number | null;
//   onSelectCategory: (id: number | null) => void;
// }

// interface Category {
//   id: number;
//   name: string;
//   Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   IconUrl?: string;
// }

// export default function FavoriteCategoriesSection({
//   selectedCategoryId,
//   onSelectCategory,
// }: FavoriteCategoriesSectionProps) {
//   const [fetchedMenuItems, setFetchedMenuItems] = useState<MenuItem[]>([]);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(true);
//   const { isAuthenticated, role } = useAuth();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const categories = await getPromocodeCategories();
//         if (categories) {
//           const withIcons = categories.map((category: Category) => ({
//             ...category,
//             IconUrl: category.IconUrl || `https://files.studmart-dev.inxan.ru/Categories/${category.id}`,
//           }));

//           const favorite = {
//             id: 0,
//             name: "Избранное",
//             IconUrl: "/icons/home/star.svg"
//           };
//           const others = withIcons.filter((c: Category) => c.name !== "Избранное");

//           const finalMenu = isAuthenticated && favorite && role && role === "Student"
//             ? [favorite, ...others]
//             : others;

//           setFetchedMenuItems(finalMenu);
//         }
//       } catch (error) {
//         console.error(error);
//         setFetchedMenuItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   },[isAuthenticated, role]);

//   useEffect(() => {
//     if (loading) return;

//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     const handleWheelScroll = (event: WheelEvent) => {
//       if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
//         scrollContainer.scrollLeft += event.deltaY;
//         event.preventDefault();
//       }
//     };

//     scrollContainer.addEventListener("wheel", handleWheelScroll, { passive: false });

//     return () => {
//       scrollContainer.removeEventListener("wheel", handleWheelScroll);
//     };
//   }, [loading]);

//   const IconComponent = ({ iconUrl }: { iconUrl?: string }) =>
//     iconUrl ? (
//       <Image
//         src={iconUrl}
//         width={24}
//         height={24}
//         alt=""
//         unoptimized
//         onError={(e) => {
//           (e.target as HTMLImageElement).src = "https://files.studmart-dev.inxan.ru/Categories/9";
//         }}
//       />
//     ) : (
//       <div style={{width: 24, height: 24}} />
//     );

//   return (
//     <div className="beauty-health-container">
//       {!loading && (
//         <ScrollContainer ref={scrollRef}>
//           {fetchedMenuItems.map(({ name, IconUrl, id }) => (
//             <StyledButton
//               key={id}
//               onClick={() => onSelectCategory(typeof id === "number" ? (id === selectedCategoryId ? null : id) : null)}
//               style={{
//                 background: id === selectedCategoryId ? "#e0f7fa" : "#f8f8f8",
//                 borderColor: id === selectedCategoryId ? "#4dd0e1" : "rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <IconComponent iconUrl={IconUrl} />
//               {name}
//             </StyledButton>
//           ))}
//         </ScrollContainer>
//       )}
//     </div>
//   );
// }
'use client';

import './style.css';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { ScrollContainer, StyledButton } from '@/app/(public)/home/context';
import { useAuth } from '@/context/AuthContext';
import { getPromocodeCategories } from '@/lib/api/promocodes';
import MenuItem from '@/types/MenuItem';

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
		<div
			className="beauty-health-container"
			style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
		>
			{!loading && (
				<>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<ScrollContainer
							ref={scrollRef}
							style={{
								overflowX: 'auto',
								display: 'flex',
								gap: '8px',
								padding: '0 30px',
								scrollBehavior: 'smooth',
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
										borderColor: id === selectedCategoryId ? '#4dd0e1' : 'rgba(0, 0, 0, 0.2)',
									}}
								>
									<IconComponent iconUrl={IconUrl} />
									{name}
								</StyledButton>
							))}
						</ScrollContainer>

						{/* Кнопки под меню */}
						<div
							style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}
						>
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
				</>
			)}
		</div>
	);
}
