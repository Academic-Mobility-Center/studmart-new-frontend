import DynamicDisplayWidget from '@/components/DynamicDisplayWidget/DynamicDisplayWidget';
import ServiceAudience from '@/components/ServiceAudience';
import About from '@/components/about';
import { useAuth } from '@/context/AuthContext';

export default function ContentLayoutWidget() {
	const { isAuthenticated } = useAuth();
	return (
		<div className="student-discount-portal">
			<DynamicDisplayWidget />
			<ServiceAudience isAuthenticated={isAuthenticated} />
			<About isAuthenticated={isAuthenticated} />
		</div>
	);
}
