'use client';

import React, { useMemo, useState } from 'react';

import { Button } from '@mui/base';

import { PromoCard } from '@/components/sections/PromoCard/PromoCard';
import ButtonCustom from '@/components/ui/ButtonCustom';
import Loader from '@/components/ui/Loader';

import { usePartnersCardsQuery } from '@/hooks/query/usePartnersCardsQuery';

import PromoCardType from '@/types/PromoCard';

import styles from './StylishWidgetSection.module.css';

interface StylishWidgetSectionProps {
	selectedCategoryId: number | null;
}

function StylishWidgetSection({ selectedCategoryId }: StylishWidgetSectionProps) {
	const INITIAL_VISIBLE_CARDS = 16;
	const LOAD_MORE_STEP = 4;

	const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_CARDS);

	const { cards, fixedCards, favoritesCards, isLoadingFavoritesCard, isLoadingPartnersCard } =
		usePartnersCardsQuery(selectedCategoryId);

	const favouriteIds = useMemo(() => new Set(favoritesCards.map((p) => p.id)), [favoritesCards]);

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
					height={fixed ? 248 : undefined}
				/>
			))}
		</div>
	);

	const handleLoadMore = () => setVisibleCount((prev) => prev + LOAD_MORE_STEP);

	const showLoadMore = cards.length > visibleCount;

	if (isLoadingFavoritesCard || isLoadingPartnersCard) return <Loader />;

	return (
		<>
			{renderCards(fixedCards, true)}

			<div className={styles['hierarchical-content-container']}>
				{renderCards(cards.slice(0, visibleCount))}
			</div>

			{showLoadMore && (
				<ButtonCustom className={styles['promo-button']} onClick={handleLoadMore}>
					Посмотреть еще
				</ButtonCustom>
			)}
		</>
	);
}

export default StylishWidgetSection;
