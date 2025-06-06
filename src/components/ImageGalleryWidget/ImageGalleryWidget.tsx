import { Button } from '@mui/base';

import LinesSvg from '../../../public/icons/ContentLayoutWidget/LinesSvg';
import SmileSvg from '../../../public/icons/ContentLayoutWidget/SmileSvg';

import './style.css';

import Link from 'next/link';

interface ImageGalleryWidgetProps {
	isAuthenticated: boolean;
}
function ImageGalleryWidget({ isAuthenticated }: ImageGalleryWidgetProps) {
	return (
		<div className="student-discount-section">
			<div className="student-discount-offer-container">
				<div className="student-discount-offer-container1">
					<p className="exclusive-discount-message">
						Получай эксклюзивные скидки у партнеров,
						<br />
						ведь ты студент!
					</p>
					<div className="button-container" style={{ height: isAuthenticated ? '0' : 'auto' }}>
						{!isAuthenticated && (
							<Link href="/registration" passHref>
								<Button
									className="exclusive-discount-button"
									style={{ visibility: isAuthenticated ? 'hidden' : 'visible' }}
								>
									Получить доступ
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="partner-discount-section">
				<SmileSvg className="image-container-outer" />
			</div>
			<div className="student-discount-offer">
				<LinesSvg className="image-container-style" />
			</div>
		</div>
	);
}

export default ImageGalleryWidget;
