'use client';

import { useParams } from 'next/navigation';

import PartnerOfferContent from '@/components/pages/public-pages/PartnerOfferContent/PartnerOfferContent';

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

	return (
		<PartnerOfferContent
			imageUrl={`https://files.${process.env.NEXT_PUBLIC_API_URL}/Partners/${id}`}
			partnerId={id}
		/>
	);
};

export default PartnerOffer;
