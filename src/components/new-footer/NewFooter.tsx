import Image from 'next/image';

import { useAuth } from '@/context/AuthContext';

import LinkedMenuItem from '../footer/elements/LinkedMenuItem/LinkedMenuItem';
import Contacts from '../footer/elements/contacts/Contacts';
import Navigation from '../footer/elements/navigation/Navigation';
import styles from './NewFooter.module.css';

const NewFooter = () => {
	const { logout, isAuthenticated } = useAuth();
	return (
		<footer className={styles['footer']}>
			<div className={styles['footer-top']}>
				<div className={styles['logo-wrapper']}>
					<Image src="/icons/footer/logo.svg" alt="Логотип" className={styles['logo']} fill />
				</div>
				<div className={styles['info-section']}>
					<Contacts />
					<Navigation isAuthenticated={isAuthenticated} logout={logout} />
				</div>
			</div>

			<div className={styles['footer-bottom']}>
				<LinkedMenuItem
					link={'/files/Политика конфиденциальности.pdf'}
					className={styles['privacy-link']}
				>
					Политика конфиденциальности
				</LinkedMenuItem>
				<LinkedMenuItem
					link={'/files/Пользовательское соглашение.pdf'}
					className={styles['user-policy-link']}
				>
					Политика управления
					<br />
					персональными данными и cookies
				</LinkedMenuItem>
			</div>
		</footer>
	);
};

export default NewFooter;
