import { FC, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import ButtonCustom from '@/components/ui/ButtonCustom';
import CardBrown from '@/components/ui/CardBrown';
import ModalWindow from '@/components/ui/ModalWindow';
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
	const [modalOpen, setModalOpen] = useState(false);
	const handleModalOpen = () => setModalOpen((prev) => !prev);
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
			<article className={clsx(styles['partner-description'], styles['phone-hide'])}>
				<MarkdownRenderer content={description} />
			</article>

			<ButtonCustom
				onClick={handleClick}
				className={clsx(styles['button-site'], styles['phone-hide'])}
			>
				Перейти на сайт
			</ButtonCustom>
			<ButtonCustom onClick={handleModalOpen} className={styles['button-more']}>
				Подробнее
			</ButtonCustom>

			<ModalWindow isOpen={modalOpen} onClose={handleModalOpen}>
				<CardBrown className={styles.card}>
					{imageUrl && (
						<div className={styles['image-container']}>
							<Image
								src={imageUrl}
								className={styles['image']}
								alt=""
								fill
								priority
								quality={100}
							/>
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
				</CardBrown>
			</ModalWindow>
		</div>
	);
};

export default PartnerInfo;
