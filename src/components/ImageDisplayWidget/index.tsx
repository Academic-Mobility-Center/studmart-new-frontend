import HandSvg from '../../../public/icons/PartnerServicesSection/HandSvg';
import AnalyticalSystemDisplay from '../analytical-system-display';

import './style.css';

function ImageDisplayWidget() {
	return (
		<div className="analytic-system-container">
			<HandSvg className="analytic-system-container1" />
			{/* <img src="/assets/image_285e65.png" alt="" className="analytic-system-container1" /> */}
			<AnalyticalSystemDisplay />
		</div>
	);
}

export default ImageDisplayWidget;
