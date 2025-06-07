import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import { addToFavouritePartner, deleteFavouritePartner } from '@/lib/api/promocodes';

import PromoCardsDescriprion from '../promo-card-description';

type PromoCardProps = {
	id: string;
	imageUrl: string;
	heading: string;
	description: string;
	discount: string;
	categoryId?: number;
	width?: number;
	height?: number;
	isInitiallyFavourite?: boolean;
};
type ApiResponse = {
	ignoredError?: boolean;
};
export const PromoCard: React.FC<PromoCardProps> = ({
	imageUrl,
	heading,
	description,
	discount,
	id,
	width = 282,
	height = 203,
	isInitiallyFavourite,
}) => {
	const router = useRouter();
	const { isAuthenticated, role, id: studentId } = useAuth();
	const [isFavourite, setIsFavourite] = useState<boolean>(isInitiallyFavourite ?? false);

	const handleClick = () => {
		router.prefetch(`/partner-offer/${id}`);
		router.push(`/partner-offer/${id}`);
	};

	const handleStarClick = async (e: React.MouseEvent) => {
		e.stopPropagation();

		const newValue = !isFavourite;
		setIsFavourite(newValue);

		try {
			let result: ApiResponse | null = null;

			if (newValue) {
				result = await addToFavouritePartner(id, studentId ?? '');
			} else {
				result = await deleteFavouritePartner(id, studentId ?? '');
			}

			if (result && result.ignoredError) {
				console.warn(123);
			}
		} catch (error) {
			console.error('Ошибка при обновлении избранного:', error);
			setIsFavourite(!newValue);
		}
	};
	return (
		<div
			className="flex-none rounded-[20px] border border-black/20 
    overflow-hidden box-border transition-transform duration-200 hover:scale-[1.02] cursor-pointer
    flex flex-col"
			style={{ width: `${width}px`, height: `${height}px` }}
			onClick={handleClick}
		>
			<StylishWrapper
				imageUrl={imageUrl}
				isFavourite={isFavourite}
				onStarClick={handleStarClick}
				isAuthenticated={isAuthenticated}
				role={role}
			/>
			<PromoCardsDescriprion heading={heading} description={description} discount={discount} />
		</div>
	);
};

type StylishWrapperProps = {
	imageUrl: string;
	isFavourite: boolean;
	onStarClick: (e: React.MouseEvent) => void;
	isAuthenticated: boolean;
	role: string | null;
};

const StylishWrapper: React.FC<StylishWrapperProps> = ({
	imageUrl,
	isFavourite,
	onStarClick,
	isAuthenticated,
	role,
}) => {
	const isStudent = role === 'Student';
	return (
		<div
			className="w-full rounded-t-[20px] px-[10px] pt-[10px] flex justify-end items-start"
			style={{
				backgroundImage: `url(${imageUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				minHeight: '125px',
				flex: '2 1 auto',
			}}
		>
			<div
				className="cursor-pointer"
				style={{
					width: 32,
					height: 32,
					flex: '0 0 auto',
				}}
				onClick={onStarClick}
			>
				{isAuthenticated &&
					isStudent &&
					(isFavourite ? (
						<Image src="icons/home/yellowStar.svg" width={32} height={32} alt="" />
					) : (
						<Image src="icons/home/whiteStar.svg" width={32} height={32} alt="" />
					))}
			</div>
		</div>
	);
};
