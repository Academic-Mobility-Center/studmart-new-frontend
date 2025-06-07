'use client';

import AboutTheSystem from '../about-page-elements/about-the-system/AboutTheSystem';
import Faq from '../about-page-elements/faq/Faq';
import NeedStudmart from '../about-page-elements/need-studmart/NeedStudmart';

const AboutPage = () => {
	return (
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
	);
};

export default AboutPage;
