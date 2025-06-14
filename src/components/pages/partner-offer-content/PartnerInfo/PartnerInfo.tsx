import { FC } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import ButtonCustom from '@/components/ui/ButtonCustom';
import { useAuth } from '@/context/AuthContext';
import { forwardLinks } from '@/lib/api/statistics';

import styles from './PartnerInfo.module.css';

export interface IPartnerInfoProps {
	imageUrl?: string;
	companyName?: string;
	subtitle?: string;
	description?: string;
	className?: string;
	site?: string;
	partnerId: string;
}

const PartnerInfo: FC<IPartnerInfoProps> = ({
	imageUrl,
	companyName,
	subtitle,
	description,
	className,
	site,
	partnerId,
}) => {
	const { id, role } = useAuth();
	const handleClick = async () => {
		if (role === 'Student' && site) {
			try {
				await forwardLinks(partnerId, id ?? '');
			} catch (error) {
				console.warn('Ошибка при вызове forwardLinks:', error);
			}
		}
		if (site) {
			window.open(site, '_blank', 'noopener,noreferrer');
		}
	};
	return (
		<div className={clsx(styles['info'], className)}>
			{imageUrl && (
				<div className={styles['image-container']}>
					<Image src={imageUrl} className={styles['image']} alt="" fill priority quality={100} />
				</div>
			)}
			<p className={styles['partner-title']}>{companyName}</p>
			<p className={styles['partner-subtitle']}>{subtitle}</p>
			<article className={styles['partner-description']}>
				<MarkdownRenderer content={description} />
			</article>
			<ButtonCustom onClick={handleClick} className={styles['button-site']}>
				Перейти на сайт
			</ButtonCustom>

			<ButtonCustom className={styles['button-more']}>Подробнее</ButtonCustom>
		</div>
	);
};

export default PartnerInfo;
