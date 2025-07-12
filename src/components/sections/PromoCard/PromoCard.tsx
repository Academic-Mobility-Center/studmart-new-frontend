import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PromoCardsDescriprion from '@/components/unknown/PromoCardsContent/promo-card-description';

import { useHandleFavoriteCard } from '@/hooks/query/usePartnersCardsQuery';

import { useAuth } from '@/context/AuthContext';

import styles from './PromoCard.module.css';

export type PromoCardProps = {
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

export const PromoCard: React.FC<PromoCardProps> = ({
	imageUrl,
	heading,
	description,
	discount,
	id,
	// width = 282,
	// height = 203,
	isInitiallyFavourite,
}) => {
	const router = useRouter();
	const { isAuthenticated, role } = useAuth();
	const [isFavourite, setIsFavourite] = useState<boolean>(isInitiallyFavourite ?? false);

	const handleClick = () => {
		router.prefetch(`/partner-offer/${id}`);
		router.push(`/partner-offer/${id}`);
	};

	const { addInFavouritePartner, deleteOutFavouritePartner } = useHandleFavoriteCard();
	const handleStarClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const newValue = !isFavourite;
		setIsFavourite(newValue);

		try {
			const result = newValue
				? await addInFavouritePartner(id)
				: await deleteOutFavouritePartner(id);

			if (result?.ignoredError) console.warn('Ignored error from API');
		} catch (error) {
			console.error('Ошибка при обновлении избранного:', error);
			setIsFavourite(!newValue);
		}
	};

	return (
		<div className={styles.card} onClick={handleClick}>
			<ImageWrapper
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

type ImageWrapperProps = {
	imageUrl: string;
	isFavourite: boolean;
	onStarClick: (e: React.MouseEvent) => void;
	isAuthenticated: boolean;
	role: string | null;
};

const ImageWrapper: React.FC<ImageWrapperProps> = ({
	imageUrl,
	isFavourite,
	onStarClick,
	isAuthenticated,
	role,
}) => {
	const isStudent = role === 'Student';

	return (
		<div
			className={styles['image-wrapper']} //style={{ backgroundImage: `url(${imageUrl})`
		>
			<div className={styles['partner-image']}>
				<Image
					src={imageUrl}
					className={styles['image']}
					fill
					alt="partner"
					loading="lazy"
					quality={80}
					sizes="400px"
				/>
			</div>
			{isAuthenticated && isStudent && (
				<div className={styles.star} onClick={onStarClick}>
					<Image
						src={isFavourite ? '/icons/home/yellowStar.svg' : '/icons/home/whiteStar.svg'}
						width={32}
						height={32}
						alt="star"
					/>
				</div>
			)}
		</div>
	);
};
