'use client';

import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import PartnerOfferContent from '@/components/pages/partner-offer-content/PartnerOfferContent';
import { useAuth } from '@/context/AuthContext';
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
	const { isAuthenticated, isLoading: isLoadingAuth, role } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoadingAuth && isAuthenticated === false) {
			router.push('/login');
		}
	}, [isLoadingAuth, isAuthenticated, router]);

	return (
		<PartnerOfferContent
			imageUrl={`https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${id}`}
			partnerId={id}
			isAuth={isAuthenticated}
			role={role}
		/>
	);
};

export default PartnerOffer;
