'use client';

import NewFooter from '@/components/new-footer/NewFooter';
import NewHeader from '@/components/new-header/NewHeader';
import OfferPageContent from '@/components/pages/offer-page-content/OfferPageContent';
import { useAuth } from '@/context/AuthContext';

const OfferPage = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}
	return (
		<div
			className="border bg-[#f8f8f8] 
            box-border flex justify-start 
            items-center flex-col min-w-[1600px] 
            border-solid border-[rgba(0,0,0,0.20)]"
		>
			<NewHeader isAuthenticated={isAuthenticated} />
			<div
				className="flex flex-col 
                items-center 
                min-w-[1280px]"
			>
				<OfferPageContent />
			</div>
			<div className="max-w-7xl w-full">
				<NewFooter isAuthenticated={isAuthenticated} />
			</div>
		</div>
	);
};

export default OfferPage;
