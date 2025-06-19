import Image from 'next/image';

import ButtonCustom from '@/components/ui/ButtonCustom';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer/MarkdownRenderer';

import styles from './DiscountBox.module.scss';

interface Props {
	title: string;
	description: string;
	onClick?: () => void;
	isAuth: boolean;
	role: string | null;
}

const DiscountBox = ({ title, description, onClick, isAuth, role }: Props) => {
	const isStudent = role === 'Student';
	const isButtonDisabled = !isAuth || !isStudent;

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
					disabled={isButtonDisabled || !isStudent}
					onClick={isStudent ? onClick : undefined}
				>
					Получить скидку
				</ButtonCustom>
				<ButtonCustom
					customType="white"
					disabled={!isButtonDisabled}
					className={styles['secondary-button']}
				>
					<div className={styles['eye-image']}>
						<Image
							src="/icons/offer/eye.svg"
							onClick={isStudent ? onClick : undefined}
							alt=""
							fill
						/>
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
			{!isStudent && (
				<p className={styles.note}>
					Получение промокода / скидки доступно только зарегистрированным студентам
				</p>
			)}
		</div>
	);
};

export default DiscountBox;
