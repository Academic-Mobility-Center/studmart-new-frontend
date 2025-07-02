'use client';

import { ChangeEvent, FC, useMemo, useState } from 'react';

import Link from 'next/link';

import ButtonCustom from '@/components/ui/ButtonCustom';
import CustomCard from '@/components/ui/CustomCard';
import ModalWindow from '@/components/ui/ModalWindow';
import InputTextField from '@/components/ui/inputs/InputTextField';

import { usePartnersCardsQuery } from '@/hooks/query/usePartnersCardsQuery';

import styles from './SearchPartnerModal.module.css';

interface ISearchPartnerModalProps {
	isOpen?: boolean;
	onClose: () => void;
}

const SearchPartnerModal: FC<ISearchPartnerModalProps> = ({ isOpen = false, onClose }) => {
	const { allPartnersCards: partners } = usePartnersCardsQuery(null, false);
	const [search, setSearch] = useState('');

	const filteredPartners = useMemo(() => {
		if (!search) return partners;
		return partners.filter((partner) =>
			partner.heading.toLowerCase().includes(search.toLowerCase()),
		);
	}, [partners, search]);

	const handleChangeSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearch(e.target.value);
	};

	return (
		<ModalWindow onClose={onClose} isOpen={isOpen}>
			<CustomCard customColor="brown" className={styles.card}>
				<h1 className={styles.heading}>Поиск скидок у партнеров</h1>
				<InputTextField
					value={search}
					className={styles.search}
					autoComplete="off"
					name="searchPartner"
					placeholder="Поиск..."
					onChange={handleChangeSearch}
				/>
				<ul className={styles.list}>
					{filteredPartners.map((partner, index) => {
						return (
							<li key={index + '_searchPartner'} className={styles.item}>
								<Link href={`/partner-offer/${partner.id}`} onClick={onClose}>
									<ButtonCustom customType="white">{partner.heading}</ButtonCustom>
								</Link>
							</li>
						);
					})}
				</ul>
				<ButtonCustom onClick={onClose}>Закрыть</ButtonCustom>
			</CustomCard>
		</ModalWindow>
	);
};

export default SearchPartnerModal;
