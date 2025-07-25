'use client';

import { ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import CustomCard from '@/components/ui/CustomCard';
import SearchInputField from '@/components/ui/fields/search_input/SearchInputField';
import ModalWindow from '@/ui/ModalWindow';

import { usePartnersCardsQuery } from '@/hooks/query/usePartnersCardsQuery';
import { getPromocodeRegions } from '@/lib/api/promocodes';

import { useAuth } from '@/context/AuthContext';
import { useCity } from '@/context/CityContext';
import PromoCardType from '@/types/PromoCard';

import styles from './NewHeader.module.css';
import SearchPartnerCard from './SearchPartnerModal';

interface NewHeaderProps {
	children?: ReactNode;
}

const citiesInModal = [
	{ id: 1, name: 'Новосибирская область' },
	{ id: 2, name: 'Московская область' },
];
interface Option {
	label: string;
	value: string;
}
export default function NewHeader({}: NewHeaderProps) {
	const { isAuthenticated, role } = useAuth();
	const router = useRouter();
	const { allPartnersCards: partners } = usePartnersCardsQuery(null);

	const handleChange = (event: React.SyntheticEvent, newValue: Option | null) => {
		if (newValue) {
			router.push(`/partner-offer/${newValue.value}`);
		}
	};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const { city } = useCity();
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const isAuth =
		isAuthenticated && role && role === 'Employee'
			? '/partner-personal-account'
			: isAuthenticated
				? '/student-personal-account'
				: '/login';

	const handleSearchModal = () => setIsSearchModalOpen((prev) => !prev);

	return (
		<>
			<header className={styles.header}>
				<Link href="/home" className={styles.logo}>
					<Image src="/icons/Header/logo.png" alt="" fill />
				</Link>

				<nav className={styles.nav}>
					<NavItem text="Предложения" url={'/home'} isAuthenticated={true} />
					<NavItem text="О сервисе" url={'/about'} isAuthenticated={true} />
					<NavItem text="Партнерам" url={'/partners'} isAuthenticated={true} />
				</nav>

				<div className={styles['end-block']}>
					<div className={styles.search}>
						<div className={styles['search-city']} onClick={openModal}>
							<div className={styles.icon}>
								<Image src="/icons/Header/location.svg" alt="" fill />
							</div>
							<p className={styles['search-city_text']}>{city || 'Выберите регион'}</p>
						</div>
						<SearchBar
							isAuthenticated={isAuthenticated}
							handleChange={handleChange}
							partners={partners}
						/>
					</div>

					<div className={styles.account}>
						<button className={clsx(styles.icon, styles['phone-icon'])} onClick={handleSearchModal}>
							<Image src="/icons/Header/search.svg" alt="Поиск" fill />
						</button>
						<Link href={isAuth} className={styles.icon}>
							<Image src="/icons/Header/account.svg" alt="Профиль" fill />
						</Link>
						{role && isAuthenticated && (
							<Link
								href={
									isAuthenticated && role === 'Student'
										? '/student-personal-account/referal-program'
										: isAuthenticated && role === 'Employee'
											? ''
											: '/login'
								}
								className={styles.icon}
							>
								{role === 'Student' ? <Image src="/icons/Header/wallet.svg" alt="" fill /> : <></>}
							</Link>
						)}
					</div>
				</div>
			</header>
			<SearchPartnerCard isOpen={isSearchModalOpen} onClose={handleSearchModal} />
			<CitySelectionModal isOpen={isModalOpen} closeModal={closeModal} />
		</>
	);
}

interface NavItemProps {
	text: string;
	url: string;
	isAuthenticated: boolean;
}

function NavItem({ text, url, isAuthenticated }: NavItemProps) {
	return (
		<div className="w-auto h-[18px] flex items-center">
			<Link
				href={isAuthenticated ? url : '#'}
				className={`text-sm font-bold text-[#032c28] m-0 p-0 ${!isAuthenticated ? 'pointer-events-none opacity-50' : ''}`}
			>
				{text}
			</Link>
		</div>
	);
}

interface SearchBarProps {
	isAuthenticated: boolean;
	handleChange: (event: React.SyntheticEvent, newValue: Option | null) => void;
	partners: PromoCardType[];
}

function SearchBar({ handleChange, partners }: SearchBarProps) {
	const pathname = usePathname();

	// Страницы, где должен быть показан текст-заглушка вместо поиска
	const isAuthPage = ['/login', '/login/reset-password', '/registration'].includes(pathname);

	const options: Option[] = partners.map((p) => ({
		label: p.heading,
		value: p.id,
	}));

	return (
		<div className={`w-[201px] flex flex-col gap-1 z-20`}>
			{isAuthPage ? (
				<>
					<p className="text-sm text-[#032c28]">Поиск</p>
					<div className="border-t border-[#032c28]"></div>
				</>
			) : (
				<SearchInputField placeholder="Поиск" options={options} handleChange={handleChange} />
			)}
		</div>
	);
}
function CitySelectionModal({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) {
	const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const { setCity } = useCity();
	const filteredCities = cities
		? cities.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase()))
		: [];

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await getPromocodeRegions();
				setCities(response);
			} catch (error) {
				console.error(error);
				setCities(citiesInModal);
			}
		};
		fetchCities();
	}, []);

	return (
		<ModalWindow isOpen={isOpen} onClose={closeModal}>
			<CustomCard customColor="white">
				<div className="flex flex-col items-center">
					<h2 className="text-lg font-bold text-black">Выберите регион</h2>
					<input
						type="text"
						placeholder="Введите название региона"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border p-2 w-full rounded mt-2 text-black"
					/>
					<ul className="w-full overflow-auto mt-4 " style={{ maxHeight: 500 }}>
						{filteredCities.length > 0 ? (
							filteredCities.map((city, index) => (
								<li
									key={index}
									className="cursor-pointer p-2 hover:bg-gray-200 text-black"
									onClick={() => {
										setCity(city.name, city.id.toString());
										closeModal();
									}}
								>
									{city.name}
								</li>
							))
						) : (
							<p className="text-gray-500 text-center mt-2">Такого региона нет</p>
						)}
					</ul>
				</div>
			</CustomCard>
		</ModalWindow>
	);
}
