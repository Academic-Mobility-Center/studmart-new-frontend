'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { Button } from '@mui/base';

import { PromoCard } from '@/components/sections/PromoCard/PromoCard';

import {
	getFavouritesPartners,
	getPromocodePartners,
	getPromocodePartnersByRegionId,
} from '@/lib/api/promocodes';

import { useAuth } from '@/context/AuthContext';
import { useCity } from '@/context/CityContext';
import { transformPromos } from '@/context/HomePageContext';
import PromoCardType from '@/types/PromoCard';

import styles from './StylishWidgetSection.module.css';

interface StylishWidgetSectionProps {
	selectedCategoryId: number | null;
}

function StylishWidgetSection({ selectedCategoryId }: StylishWidgetSectionProps) {
	const INITIAL_VISIBLE_CARDS = 16;
	const LOAD_MORE_STEP = 4;

	const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_CARDS);
	const [partners, setPartners] = useState<PromoCardType[]>([]);
	const [favouritePartners, setFavouritePartners] = useState<PromoCardType[]>([]);
	const [loading, setLoading] = useState(true);

	const { id } = useAuth();
	const { regionId } = useCity();

	useEffect(() => {
		const fetchPromos = async () => {
			try {
				setLoading(true);
				const data = regionId
					? await getPromocodePartnersByRegionId(regionId)
					: await getPromocodePartners();
				setPartners(transformPromos(data || []));
			} catch (err) {
				console.error('Error fetching promocodes:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchPromos();
	}, [regionId]);

	useEffect(() => {
		if (!id) return;

		const fetchFavourites = async () => {
			try {
				const data = await getFavouritesPartners(id);
				const transformed = transformPromos(data || []).map((card) => ({
					...card,
					categoryId: 0,
				}));
				setFavouritePartners(transformed);
			} catch (error) {
				console.warn('Error fetching favourites:', error);
			}
		};

		fetchFavourites();
	}, [id]);

	// === Мемоизированные данные ===
	const favouriteIds = useMemo(
		() => new Set(favouritePartners.map((p) => p.id)),
		[favouritePartners],
	);

	const { fixedCards, regularCards } = useMemo(() => {
		const sourceCards =
			selectedCategoryId === 0
				? favouritePartners
				: selectedCategoryId !== null
					? partners.filter((p) => p.categoryId === selectedCategoryId)
					: partners;

		const fixed = sourceCards.filter((c) => c.isFixed);
		const regular = sourceCards.filter((c) => !c.isFixed);

		return { fixedCards: fixed, regularCards: regular };
	}, [selectedCategoryId, partners, favouritePartners]);

	// === Рендер карточек ===
	const renderCards = (cards: PromoCardType[], fixed = false) => (
		<div className={fixed ? styles['promo-card-container-fixed'] : styles['promo-card-container']}>
			{cards.map((card) => (
				<PromoCard
					key={`${fixed ? 'fixed-' : ''}${card.id}`}
					id={card.id}
					imageUrl={`https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${card.id}`}
					heading={card.heading}
					description={card.subtitle}
					discount={card.discount}
					categoryId={card.categoryId}
					isInitiallyFavourite={favouriteIds.has(card.id)}
					width={fixed ? 384 : undefined}
					height={fixed ? 246 : undefined}
				/>
			))}
		</div>
	);

	const handleLoadMore = () => setVisibleCount((prev) => prev + LOAD_MORE_STEP);

	const showLoadMore = regularCards.length > visibleCount;

	return (
		<>
			{renderCards(fixedCards, true)}

			<div className={styles['hierarchical-content-container']}>
				{loading ? null : renderCards(regularCards.slice(0, visibleCount))}
			</div>

			{showLoadMore && (
				<Button className={styles['promo-button']} onClick={handleLoadMore}>
					Посмотреть еще
				</Button>
			)}
		</>
	);
}

export default StylishWidgetSection;
