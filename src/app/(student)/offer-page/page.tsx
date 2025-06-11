'use client';

import OfferPageContent from '@/components/pages/offer-page-content/OfferPageContent';

const OfferPage = () => {
	return (
		<div
			className="flex flex-col 
                items-center 
                min-w-[1280px]"
		>
			<OfferPageContent />
		</div>
	);
};

export default OfferPage;
