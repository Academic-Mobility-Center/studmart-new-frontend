'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ButtonCustom from '@/components/ui/ButtonCustom';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer/MarkdownRenderer';

import PersonalPromocode from '@/types/PersonalPromocode';

import styles from './DiscountBox.module.scss';

interface Props {
	title: string;
	description: string;
	onClick?: () => void;
	isAuth: boolean;
	role: string | null;
	promocode: PersonalPromocode | undefined;
}

const DiscountBox = ({ title, description, onClick, isAuth, role, promocode }: Props) => {
	const isStudent = role === 'Student';
	const isButtonDisabled = !isAuth || !isStudent;
	const { push } = useRouter();

	const handleNotAuthClick = () => {
		if (!isAuth) {
			push('/login');
		}
	};

	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		if (promocode?.promocode) {
			navigator.clipboard.writeText(promocode.promocode).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			});
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles['text-section']}>
				<p className={styles.title}>{title}</p>
				<article className={styles.description}>
					<MarkdownRenderer content={description} />
				</article>
			</div>
			<div className={styles['button-row']}>
				<ButtonCustom
					customType="white"
					onClick={!isButtonDisabled ? copyToClipboard : handleNotAuthClick}
				>
					{copied && <>Промокод скопирован</>}
					{!copied && <>Получить скидку</>}
				</ButtonCustom>
				<ButtonCustom
					customType="white"
					disabled={isButtonDisabled}
					className={styles['secondary-button']}
					onClick={isStudent ? onClick : undefined}
				>
					<div className={styles['eye-image']}>
						<Image src="/icons/offer/eye.svg" alt="" fill />
					</div>
				</ButtonCustom>
			</div>
			<Image
				src="/icons/offer/lines.svg"
				className={styles['card-bg-image']}
				alt="Background Decoration"
				height={98}
				width={191}
			/>
			{(!isStudent || !isAuth) && (
				<p className={styles.note}>
					Получение промокода / скидки доступно только зарегистрированным студентам
				</p>
			)}
		</div>
	);
};

export default DiscountBox;
