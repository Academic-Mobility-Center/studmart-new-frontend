import { PromoPartners } from '@/context/HomePageContext';

export const getPromocodeCategories = async () => {
	try {
		const res = await fetch('/api/promocodes/Categories');

		if (!res.ok) {
			throw new Error(`Ошибка при получении категорий: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodeCategories:', error);
		return null;
	}
};
export const getCategoryById = async (id: string) => {
	try {
		const res = await fetch(`/api/promocodes/Categories/${id}`);

		if (!res.ok) {
			throw new Error(`Ошибка при получении категорий: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodeCategories:', error);
		return null;
	}
};
export const getPromocodePartners = async (): Promise<PromoPartners[]> => {
	try {
		const res = await fetch('/api/promocodes/Partners');
		if (!res.ok) {
			throw new Error(`Ошибка при получении партнеров: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodePartners:', error);
		return [];
	}
};
export const getPromocodeDiscounts = async () => {
	try {
		const res = await fetch('/api/promocodes/Discounts');
		if (!res.ok) {
			throw new Error(`Ошибка при получении купонов партнера: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodeDiscounts:', error);
		return null;
	}
};
export const getPromocodeRegions = async () => {
	try {
		const res = await fetch('/api/promocodes/Regions');
		if (!res.ok) {
			throw new Error(`Ошибка при получении городов: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodeRegions:', error);
		return null;
	}
};
export const getPromocodePartnerById = async (id: string) => {
	try {
		const res = await fetch(`/api/promocodes/Partners?Id=${id}`);
		if (!res.ok) {
			throw new Error(`Ошибка при получении городов: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodeRegions:', error);
		return null;
	}
};
export const getPromocodePartnersByRegionId = async (id: string): Promise<PromoPartners[]> => {
	try {
		const res = await fetch(`/api/promocodes/Partners?RegionId=${id}`);
		if (!res.ok) {
			throw new Error(`Ошибка при получении партнеров по региону: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodePartnersByRegionId:', error);
		return [];
	}
};
export const getPromocodePartnerByIdAndRegionId = async (
	partnerId: string,
	regionId: string,
	StudentId: string,
) => {
	try {
		const res = await fetch(
			`/api/promocodes/Partners?Id=${partnerId}&RegionId=${regionId}&StudentId=${StudentId}`,
		);
		if (!res.ok) {
			throw new Error(`Ошибка при получении партнеров по региону: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodePartnersByRegionId:', error);
		return null;
	}
};
export const getPromocodeDiscountByDiscountIdAndStudentId = async (
	discountId: string,
	studentId: string,
) => {
	try {
		const res = await fetch(`/api/promocodes/discount/${discountId}/giveToStudent/${studentId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		});

		if (!res.ok) {
			throw new Error(`Ошибка: ${res.status}`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodeDiscountByDiscountIdAndStudentId:', error);
		return null;
	}
};
export const getFavouritesPartners = async (id: string | null): Promise<PromoPartners[]> => {
	try {
		const res = await fetch(`/api/promocodes/Favourites/${id ?? ''}`);
		if (!res.ok) {
			throw new Error(`Ошибка при получении избранных партнеров: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodePartnersByRegionId:', error);
		return [];
	}
};

export const addToFavouritePartner = async (partnerId: string, studentId: string | null) => {
	try {
		if (!studentId) {
			throw new Error(`Ошибка: 403`);
		}
		const res = await fetch(`/api/promocodes/Favourites`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ partnerId, studentId }),
		});

		if (!res.ok) {
			// Возвращаем объект с ошибкой, но не кидаем исключение, если 500
			if (res.status === 500) {
				return { ignoredError: true, status: 500 };
			}
			throw new Error(`Ошибка: ${res.status}`);
		}

		const text = await res.text();
		const data = text ? JSON.parse(text) : null;
		return data;
	} catch (error) {
		console.error('Ошибка в addToFavouritePartner:', error);
		return { ignoredError: false };
	}
};

export const deleteFavouritePartner = async (partnerId: string, studentId: string | null) => {
	try {
		if (!studentId) {
			throw new Error(`Ошибка: 403`);
		}
		const res = await fetch('/api/promocodes/Favourites', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				studentId: studentId,
				partnerId: partnerId,
			}),
		});

		if (!res.ok) {
			throw new Error(`Ошибка: ${res.status}`);
		}
		const text = await res.text();
		const data = text ? JSON.parse(text) : null;
		return data;
	} catch (error) {
		console.error('Ошибка в deleteFavouritePartner:', error);
		return { ignoredError: false };
	}
};

export const getPromocodeById = async (id: string) => {
	try {
		const res = await fetch(`/api/promocodes/Discounts?Id=${id}`);

		if (!res.ok) {
			throw new Error(`Ошибка при получении категорий: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Ошибка в getPromocodeCategories:', error);
		return null;
	}
};
