import AboutStudmart from '@/components/sections/AboutStudmart';
import ServiceAudience from '@/components/sections/ServiceAudience';

import { useAuth } from '@/context/AuthContext';

import DynamicDisplayWidget from './DynamicDisplayWidget/DynamicDisplayWidget';

export default function ContentLayoutWidget() {
	const { isAuthenticated } = useAuth();
	return (
		<div className="student-discount-portal">
			<DynamicDisplayWidget />
			<ServiceAudience isAuthenticated={isAuthenticated} />
			<AboutStudmart isAuthenticated={isAuthenticated} />
		</div>
	);
}
