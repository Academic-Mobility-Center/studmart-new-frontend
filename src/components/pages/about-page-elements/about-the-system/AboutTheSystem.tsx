import Image from 'next/image';

import styles from './AboutTheSystem.module.css';

const AboutTheSystem = () => {
	return (
		<div className={styles['about-the-system-container']}>
			<div className={styles['about-the-system-content']}>
				<h1 className={styles['about-the-system-title']}>О системе и выгодах</h1>
				<div className={styles['about-the-system-card-wrapper']}>
					<div className={styles['about-the-system-card']}>
						<p className={styles['about-the-system-card-text']}>
							Зарегистрируйся через почту вуза и получи доступ к каталогу скидок от иностранных и
							российских компаний
						</p>
					</div>
				</div>
			</div>
			<div className={styles['about-the-system-image']}>
				<Image fill src="/icons/about/main-screen.svg" alt="Экран с интерфейсом" />
			</div>
		</div>
	);
};

export default AboutTheSystem;
