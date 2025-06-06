'use client';

import NewFooter from '@/components/new-footer/NewFooter';
import NewHeader from '@/components/new-header/NewHeader';
import { useAuth } from '@/context/AuthContext';

import AboutTheSystem from '../about-page-elements/about-the-system/AboutTheSystem';
import Faq from '../about-page-elements/faq/Faq';
import NeedStudmart from '../about-page-elements/need-studmart/NeedStudmart';

const AboutPage = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}
	return (
		<>
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
					<div
						className="w-[100.00%] box-border 
                        mt-[25px] px-[39px]"
					>
						<div className="w-[100.00%] box-border">
							<AboutTheSystem />
							<NeedStudmart />
						</div>
						<Faq />
					</div>
				</div>
				<div className="max-w-7xl w-full">
					<NewFooter isAuthenticated={isAuthenticated} />
				</div>
			</div>
		</>
	);
};

export default AboutPage;
