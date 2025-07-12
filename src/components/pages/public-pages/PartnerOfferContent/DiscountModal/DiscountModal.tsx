import React, { useState } from 'react';

import Image from 'next/image';

import CustomCard from '@/components/ui/CustomCard';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer/MarkdownRenderer';
import ModalWindow from '@/components/ui/ModalWindow';

import PersonalPromocode from '@/types/PersonalPromocode';

import styles from './DiscountModal.module.scss';

interface Props {
	isOpen: boolean;
	closeModal: () => void;
	promoCode?: PersonalPromocode;
}

export const DiscountModal: React.FC<Props> = ({ isOpen, closeModal, promoCode }) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		if (promoCode?.promocode) {
			navigator.clipboard.writeText(promoCode.promocode).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			});
		}
	};

	return (
		<ModalWindow isOpen={isOpen} onClose={closeModal}>
			<CustomCard className={styles.card}>
				<p className={styles.title}>{promoCode?.discount.name || 'Промокод'}</p>
				<article className={styles.description}>
					<MarkdownRenderer content={promoCode?.discount.description} />
				</article>

				{promoCode?.promocode && (
					<>
						<div className={styles.promocode} onClick={copyToClipboard}>
							<div>
								<p className={styles.label}>Промокод</p>
								<p className={styles['promocode-value']}>{promoCode.promocode}</p>
							</div>
							<button className={styles['copy-button']}>
								<Image
									src="/icons/offer/copy.svg"
									alt="Копировать промокод"
									width={24}
									height={24}
								/>
							</button>
						</div>
						{copied && <p className={styles['copied-message']}>Промокод скопирован!</p>}
					</>
				)}

				<div className={styles.footer}>
					{promoCode?.student && (
						<>
							<div className={styles['info-block']}>
								<p className={styles.label}>Пользователь</p>
								<p className={styles.value}>
									{promoCode.student.lastName} {promoCode.student.firstName}
								</p>
							</div>
							<div className={styles['info-block']}>
								<p className={styles.label}>Университет</p>
								<p className={styles.value}>{promoCode.student.university.name}</p>
							</div>
						</>
					)}
					{promoCode?.discount.partner.companyName && (
						<div className={styles['info-block']}>
							<p className={styles.label}>Партнер</p>
							<p className={styles.value}>{promoCode.discount.partner.companyName}</p>
						</div>
					)}
				</div>
				<Image
					alt=""
					src="/icons/offer/lines2.svg"
					width={245}
					height={102}
					className={styles.decor}
				/>
			</CustomCard>
		</ModalWindow>
	);
};
