import LinkedMenuItem from '../LinkedMenuItem/LinkedMenuItem';
import styles from './Navigation.module.css';

interface NavigationProps {
	isAuthenticated: boolean;
	logout: () => void;
}

const Navigation = ({ isAuthenticated, logout }: NavigationProps) => {
	return (
		<div className={styles['navigation-container']}>
			<p className={styles['navigation-title']}>Навигация</p>
			<div className={styles['navigation-links']}>
				<LinkedMenuItem link={'/home'}>Главная страница</LinkedMenuItem>
				<LinkedMenuItem link={'/about'}>О сервисе</LinkedMenuItem>
				<LinkedMenuItem link={'/partners'}>Партнерам</LinkedMenuItem>

				{isAuthenticated ? (
					<span onClick={logout} className={styles['logout-button']}>
						Выход
					</span>
				) : (
					<LinkedMenuItem link="/login">Вход</LinkedMenuItem>
				)}
			</div>
		</div>
	);
};

export default Navigation;
