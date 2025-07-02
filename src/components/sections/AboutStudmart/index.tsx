import { Button } from '@mui/base';
import Image from 'next/image';
import Link from 'next/link';

import HeadingSection from '@/ui/HeadingSection';

import styles from './About.module.css';

const aboutStudmart = 'Про Студмарт';
const studmartDescription =
	'«Студмарт» — это система лояльности. Студентам она предоставляет скидки, а бизнесу — возможность расширить аудиторию.';

interface IAboutStudmartProps {
	isAuthenticated: boolean;
}

export default function AboutStudmart({ isAuthenticated }: IAboutStudmartProps) {
	if (isAuthenticated) return null;

	return (
		<div className={styles['about-container']}>
			<HeadingSection>{aboutStudmart}</HeadingSection>
			<div className={styles['about-content']}>
				<div className={styles['text-section']}>
					<p className={styles['description']}>{studmartDescription}</p>
					<div className={styles['card-wrapper']}>
						<div className={styles['info-card']}>
							<p className={styles['card-text']}>
								После регистрации на платформе учащийся открывает доступ к программам лояльности и
								уникальным акциям. Как получить скидку студента? Подтвердить личность через почту
								вуза и неограниченно выбирать из каталога выгодные предложения. 
							</p>
						</div>
						<div className={styles['info-card']}>
							<p className={styles['card-text']}>
								Для предпринимателей продвижение бизнеса через скидки — возможность использовать
								новый канал продаж и привлечь аудиторию, которая останется лояльной на долгое время.
							</p>
						</div>
					</div>
					<Link href="/registration">
						<Button className={styles['primary-button']}>Зарегистрироваться</Button>
					</Link>
				</div>
				<div className={styles['image-wrapper']}>
					<Image
						src="/icons/About/layout.svg"
						alt=""
						className={styles['layout-image']}
						width={282}
						height={368}
					/>
					<Image
						src="/icons/About/girl.svg"
						alt=""
						className={styles['girl-image']}
						height={386}
						width={386}
					/>
				</div>
			</div>
		</div>
	);
}
