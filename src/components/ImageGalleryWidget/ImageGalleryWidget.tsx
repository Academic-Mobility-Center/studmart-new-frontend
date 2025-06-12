import Link from 'next/link';

import LinesSvg from '../../../public/icons/ContentLayoutWidget/LinesSvg';
import SmileSvg from '../../../public/icons/ContentLayoutWidget/SmileSvg';
import ButtonCustom from '../ui/ButtonCustom';
import styles from './ImageGalleryWidget.module.css';

interface ImageGalleryWidgetProps {
	isAuthenticated: boolean;
}
function ImageGalleryWidget({ isAuthenticated }: ImageGalleryWidgetProps) {
	return (
		<div className={styles.container}>
			<div className={styles['yellow-block']}>
				<h1 className={styles.heading}>
					Получай эксклюзивные
					<br />
					скидки у партнеров,
					<br />
					ведь ты студент!
				</h1>
				<div className={styles['button-container']}>
					{!isAuthenticated && (
						<Link href="/registration" passHref className="w-full">
							<ButtonCustom customType="white">Получить доступ</ButtonCustom>
						</Link>
					)}
				</div>
				<div className={styles['background-image-container']}>
					<LinesSvg className={styles['background-image']} />
				</div>
			</div>
			<div className={styles['human-photo-container']}>
				<SmileSvg className={styles['human-photo']} />
			</div>
		</div>
	);
}

export default ImageGalleryWidget;
