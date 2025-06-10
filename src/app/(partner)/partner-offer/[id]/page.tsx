'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

import PartnerOfferContent from '@/components/pages/partner-offer-content/PartnerOfferContent';
import { loaderStyle } from '@/app/context';
import { useAuth } from '@/context/AuthContext';
import { getPromocodePartners } from '@/lib/api/promocodes';
import Category from '@/types/Category';
import RegionWithoutCountry from '@/types/RegionWithoutCountry';

interface PartnerOffer {
	id: string;
	companyName: string;
	subtitle: string;
	description: string;
	site: string;
	category: Category;
	hasAllRegions: boolean;
	regions: RegionWithoutCountry[];
}

const PartnerOffer = () => {
	const params = useParams();
	const id = params?.id as string;
	const { isAuthenticated, isLoading, role } = useAuth();
	const [currentOffer, setCurrentOffer] = useState<PartnerOffer | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && isAuthenticated === false) {
			router.push('/login');
		}
	}, [isLoading, isAuthenticated, router]);
	useEffect(() => {
		const fetchOffer = async () => {
			try {
				const promoCardsArray = await getPromocodePartners();
				const found = promoCardsArray?.find((promo: PartnerOffer) => promo.id === id);
				setCurrentOffer(found);
			} catch (error) {
				console.warn('Ошибка при получении данных: ', error);
				// setCurrentOffer(defaultOffer);
			}
		};

		if (id) fetchOffer();
	}, [id]);

	if (isLoading || !currentOffer || isAuthenticated === false) {
		return (
			<div className={loaderStyle}>
				<ClipLoader size={50} color="#36d7b7" />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center min-w-[1280px]">
			<PartnerOfferContent
				imageUrl={`https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${id}`}
				partnerId={id}
				isAuth={isAuthenticated}
				role={role}
			/>
		</div>
	);
};

export default PartnerOffer;
