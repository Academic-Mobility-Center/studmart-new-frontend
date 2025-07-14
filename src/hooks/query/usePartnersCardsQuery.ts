import { useMemo } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
	addToFavouritePartner,
	deleteFavouritePartner,
	getFavouritesPartners,
	getPromocodePartners,
	getPromocodePartnersByRegionId,
} from '@/lib/api/promocodes';

import { queryKeys } from '@/constants/queryKeys';
import { useAuth } from '@/context/AuthContext';
import { useCity } from '@/context/CityContext';
import { transformNotFixedPromos, transformPromos } from '@/context/HomePageContext';

export const usePartnersCardsQuery = (
	selectedCategoryId?: number | null,
	enabledFavorites = true,
) => {
	const { id } = useAuth();
	const { regionId } = useCity();

	const { data: allPartnersCards = [], isLoading: isLoadingPartnersCard } = useQuery({
		queryKey: queryKeys.partnersCard(),
		queryFn: () =>
			(regionId ? getPromocodePartnersByRegionId(regionId) : getPromocodePartners()).then((res) =>
				transformPromos(res),
			),
	});

	const { data: favoritesCards = [], isLoading: isLoadingFavoritesCard } = useQuery({
		queryKey: queryKeys.favoritesCard(),
		queryFn: () => getFavouritesPartners(id).then((res) => transformNotFixedPromos(res)),
		enabled: enabledFavorites,
	});

	const { fixedCards, cards } = useMemo(() => {
		const isFavoriteCategory = selectedCategoryId === 0;
		const sourceCards = isFavoriteCategory
			? favoritesCards
			: selectedCategoryId !== null
				? allPartnersCards.filter((partner: any) => partner.categoryId === selectedCategoryId)
				: allPartnersCards;

		const fixed = sourceCards.filter((card: any) => card.isFixed);
		const cards = sourceCards.filter((card: any) => !card.isFixed);

		return { fixedCards: fixed, cards: cards };
	}, [selectedCategoryId, allPartnersCards, favoritesCards]);

	return {
		allPartnersCards,
		fixedCards,
		cards,
		isLoadingPartnersCard,
		favoritesCards,
		isLoadingFavoritesCard,
	};
};

export const useHandleFavoriteCard = () => {
	const { id } = useAuth();
	const queryClient = useQueryClient();

	const { mutateAsync: addInFavouritePartner, isPending: isAddingInFavouritePartner } = useMutation(
		{
			mutationFn: (partnerId: string) => addToFavouritePartner(partnerId, id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: queryKeys.favoritesCard() });
			},
		},
	);

	const { mutateAsync: deleteOutFavouritePartner, isPending: isDeletingOutFavouritePartner } =
		useMutation({
			mutationFn: (partnerId: string) => deleteFavouritePartner(partnerId, id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: queryKeys.favoritesCard() });
			},
		});

	return {
		addInFavouritePartner,
		isAddingInFavouritePartner,
		deleteOutFavouritePartner,
		isDeletingOutFavouritePartner,
	};
};
