'use client';

import { Button } from '@mui/base';

import './style.css';

import React, { useEffect, useRef, useState } from 'react';

import { transformPromos } from '@/app/home/context';
import { useAuth } from '@/context/AuthContext';
import { useCity } from '@/context/CityContext';
import {
	getFavouritesPartners,
	getPromocodePartners,
	getPromocodePartnersByRegionId,
} from '@/lib/api/promocodes';
import PromoCardType from '@/types/PromoCard';

import { PromoCard } from '../promo-card/PromoCard';

interface StylishWidgetSectionProps {
	selectedCategoryId: number | null;
}

function StylishWidgetSection({ selectedCategoryId }: StylishWidgetSectionProps) {
	const [visibleRows, setVisibleRows] = useState(4);
	const fixedCardsPerRow = 3;
	const regularCardsPerRow = 4;
	const initialVisibleCards = 16;
	const { id } = useAuth();
	const { regionId } = useCity();
	const favouritesFetchedRef = useRef(false);
	const [partners, setPartners] = useState<PromoCardType[]>([]);
	const [favouritePartners, setFavouritePartners] = useState<PromoCardType[]>([]);
	useEffect(() => {
		const fetchPromoCards = async () => {
			try {
				let promoCardsArray;
				if (regionId) {
					promoCardsArray = await getPromocodePartnersByRegionId(regionId);
				} else {
					promoCardsArray = await getPromocodePartners();
				}

				const transformed = transformPromos(promoCardsArray || []);
				setPartners(transformed);
			} catch (error) {
				console.error('Error fetching promocodes:', error);
				setPartners([]);
			}
		};

		fetchPromoCards();
	}, [regionId]);

	useEffect(() => {
		if (favouritesFetchedRef.current || !id) return;

		const fetchFavourites = async () => {
			try {
				const data = await getFavouritesPartners(id);
				const transformed = transformPromos(data || []).map((card) => ({
					...card,
					categoryId: 0,
				}));
				setFavouritePartners(transformed);
				favouritesFetchedRef.current = true;
			} catch (error) {
				console.warn(error);
				setFavouritePartners([]);
			}
		};

		fetchFavourites();
	}, [id]);

	const favouriteIds = favouritePartners.map((p) => p.id);
	const renderPromoCardsRow = (cards: PromoCardType[]) => (
		<div className="promo-card-container">
			{cards.map((card) => (
				<PromoCard
					id={card.id}
					key={card.id}
					imageUrl={`https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${card.id}`}
					heading={card.heading}
					description={card.subtitle}
					discount={card.discount}
					categoryId={card.categoryId}
					isInitiallyFavourite={favouriteIds.includes(card.id)}
				/>
			))}
		</div>
	);

	const renderFixedCards = (cards: PromoCardType[]) => (
		<div className="promo-card-container">
			{cards.map((card) => (
				<PromoCard
					id={card.id}
					key={`fixed-${card.id}`}
					width={384}
					height={246}
					heading={card.heading}
					description={card.subtitle}
					discount={card.discount}
					categoryId={card.categoryId}
					imageUrl={`https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${card.id}`}
					isInitiallyFavourite={favouriteIds.includes(card.id)}
				/>
			))}
		</div>
	);

	// === Избранное отображение ===
	if (selectedCategoryId === 0) {
		const fixedCards = favouritePartners.filter((card) => card.isFixed);
		const regularCards = favouritePartners.filter((card) => !card.isFixed);
		const totalRows = Math.ceil(regularCards.length / regularCardsPerRow);

		const regularChunks = Array.from({ length: totalRows }, (_, i) =>
			regularCards.slice(i * regularCardsPerRow, (i + 1) * regularCardsPerRow),
		);
		const fixedChunks = Array.from(
			{ length: Math.ceil(fixedCards.length / fixedCardsPerRow) },
			(_, i) => fixedCards.slice(i * fixedCardsPerRow, (i + 1) * fixedCardsPerRow),
		);

		const showLoadMore = regularCards.length > initialVisibleCards && visibleRows < totalRows;

		return (
			<>
				{fixedChunks.map((chunk, index) => (
					<div key={`fixed-fav-chunk-${index}`} className="fixed-cards-container">
						{renderFixedCards(chunk)}
					</div>
				))}

				<div className="vertical-center-column">
					<div className="hierarchical-text-container">
						<div className="hierarchical-content-container">
							{regularChunks.slice(0, visibleRows).map((chunk, i) => (
								<React.Fragment key={`fav-chunk-${i}`}>{renderPromoCardsRow(chunk)}</React.Fragment>
							))}
						</div>
					</div>

					{showLoadMore && (
						<Button className="promo-button" onClick={() => setVisibleRows((prev) => prev + 1)}>
							Посмотреть еще
						</Button>
					)}
				</div>
			</>
		);
	}

	// === Обычное отображение ===
	const filteredCards =
		selectedCategoryId !== null
			? partners.filter((card) => card.categoryId === selectedCategoryId)
			: partners;

	const fixedCards = filteredCards.filter((card) => card.isFixed);
	const regularCards = filteredCards.filter((card) => !card.isFixed);

	const totalRows = Math.ceil(regularCards.length / regularCardsPerRow);
	const regularChunks = Array.from({ length: totalRows }, (_, i) =>
		regularCards.slice(i * regularCardsPerRow, (i + 1) * regularCardsPerRow),
	);
	const fixedChunks = Array.from(
		{ length: Math.ceil(fixedCards.length / fixedCardsPerRow) },
		(_, i) => fixedCards.slice(i * fixedCardsPerRow, (i + 1) * fixedCardsPerRow),
	);

	const showLoadMore = regularCards.length > initialVisibleCards && visibleRows < totalRows;

	return (
		<>
			{fixedChunks.map((chunk, index) => (
				<div key={`fixed-chunk-${index}`} className="fixed-cards-container">
					{renderFixedCards(chunk)}
				</div>
			))}

			<div className="vertical-center-column">
				<div className="hierarchical-text-container">
					<div className="hierarchical-content-container">
						{regularChunks.slice(0, visibleRows).map((chunk, i) => (
							<React.Fragment key={`chunk-${i}`}>{renderPromoCardsRow(chunk)}</React.Fragment>
						))}
					</div>
				</div>

				{showLoadMore && (
					<Button className="promo-button" onClick={() => setVisibleRows((prev) => prev + 1)}>
						Посмотреть еще
					</Button>
				)}
			</div>
		</>
	);
}

export default StylishWidgetSection;
