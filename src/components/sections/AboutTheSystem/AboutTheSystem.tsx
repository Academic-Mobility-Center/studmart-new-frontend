import { HTMLAttributes } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import styles from './AboutTheSystem.module.css';

interface IAboutTheSystemProps extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	description?: string;
	type?: 'about' | 'partners';
}

const AboutTheSystem = ({
	title = 'О системе и выгодах',
	description = 'Зарегистрируйся через почту вуза и получи доступ к каталогу скидок от иностранных и российских компаний',
	type = 'about',
}: IAboutTheSystemProps) => {
	const isPartners = type === 'partners';
	return (
		<div className={styles['system-container']}>
			<div className={styles['system-content']}>
				<div
					className={clsx(styles['main-card'], {
						[styles['partner-title-card']]: isPartners,
					})}
				>
					<h1 className={styles['main-card-title']}>{title}</h1>
					<div
						className={clsx(styles['scribbles-container-image'], {
							[styles['scribbles-on']]: isPartners,
						})}
					>
						<Image src="/icons/partners/what-gives.svg" alt="" fill />
					</div>
				</div>
				<div className={styles['system-card-wrapper']}>
					<div
						className={clsx(styles['system-card'], {
							[styles['partner-system-card']]: isPartners,
						})}
					>
						<p className={styles['system-card-text']}>{description}</p>
					</div>
				</div>
			</div>
			<div className={styles['system-image']}>
				<Image
					fill
					src={isPartners ? '/icons/partners/main.svg' : '/icons/about/main-screen.svg'}
					alt="Экран с интерфейсом"
				/>
			</div>
		</div>
	);
};

export default AboutTheSystem;
