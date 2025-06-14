'use client';

import { useEffect, useState } from 'react';

import { ClipLoader } from 'react-spinners';

import { PartnerWithIdType } from '@/app/(partner)/partner-personal-account/context';
import { loaderStyle } from '@/app/context';
import { useAuth } from '@/context/AuthContext';
import { useCity } from '@/context/CityContext';
import {
	getPromocodeById,
	getPromocodeDiscountByDiscountIdAndStudentId,
	getPromocodePartnerByIdAndRegionId,
} from '@/lib/api/promocodes';

import PersonalPromocode from '../../../types/PersonalPromocode';
import DiscountBox from '../offer-page-elements/discount-box/DiscountBox';
import { DiscountModal } from '../offer-page-elements/discount-modal/DiscountModal';
import PartnerInfo from './PartnerInfo/PartnerInfo';
import styles from './PartnerOfferContent.module.scss';

interface Discount {
	id: string;
	name: string;
	description: string;
	size: number;
	promocodeValue: string;
	partner: {
		id: string;
		companyName: string;
		subtitle: string;
		maxDiscount: number;
		isFixed: boolean;
	};
	hasAllRegions: boolean;
	regions: [];
}

interface Props {
	imageUrl: string;
	partnerId: string;
	isAuth: boolean;
	role: string | null;
}

interface EmployeePromocode {
	id: string;
	name: string;
	description: string;
	size: number;
	promocodeValue: string;
	partner: {
		id: string;
		companyName: string;
		subtitle: string;
		maxDiscount: number;
		isFixed: boolean;
	};
	hasAllRegions: boolean;
	regions: [];
}

type UnifiedPromocode = PersonalPromocode | EmployeePromocode;

const PartnerOfferContent = ({ imageUrl, partnerId }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [personalPromocodes, setPersonalPromocodes] = useState<UnifiedPromocode[]>([]);
	const [selectedPromo, setSelectedPromo] = useState<PersonalPromocode | undefined>(undefined);
	const [partnerData, setPartnerData] = useState<PartnerWithIdType | null>(null);
	const { regionId } = useCity();
	const [discountsIds, setDiscountsIds] = useState<string[]>([]);
	const { id, role, isAuthenticated: isAuth } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const partnerInfo = await getPromocodePartnerByIdAndRegionId(partnerId, regionId, id ?? '');
				setPartnerData(partnerInfo);
			} catch (error) {
				console.log(error);
			}
		};
		if (id) fetchData();
	}, [partnerId, regionId, id]);

	useEffect(() => {
		if (partnerData?.discounts) {
			const ids = partnerData.discounts.map((d: Discount) => String(d.id));
			setDiscountsIds(ids);
		}
	}, [partnerData]);

	useEffect(() => {
		const fetchDiscounts = async () => {
			if (!discountsIds.length) return;
			try {
				const results: PersonalPromocode[] = [];
				for (const discountId of discountsIds) {
					try {
						let promocode: PersonalPromocode;
						if (role === 'Employee') {
							promocode = await getPromocodeById(discountId);
						} else {
							promocode = await getPromocodeDiscountByDiscountIdAndStudentId(discountId, id ?? '');
						}
						results.push(promocode);
					} catch (error) {
						console.error(`Ошибка при получении промокода для discountId: ${discountId}`, error);
					}
				}
				setPersonalPromocodes(results);
			} catch (error) {
				console.error('Ошибка при получении промокодов:', error);
			}
		};
		if (id) fetchDiscounts();
	}, [discountsIds, id, role]);

	const openModal = (promo: UnifiedPromocode) => {
		if (role === 'Student' && 'discount' in promo) {
			setSelectedPromo(promo);
			setIsModalOpen(true);
		}
	};
	const closeModal = () => setIsModalOpen(false);
	if (!partnerData) {
		return (
			<div className={'flex justify-center items-center h-screen bg-white'}>
				<ClipLoader size={50} color="#36d7b7" />
			</div>
		);
	}
	return (
		<div className={styles['container']}>
			<PartnerInfo imageUrl={imageUrl} partnerId={partnerId} {...partnerData} />

			<div className={styles['discounts-wrapper']}>
				{personalPromocodes.map((promo, index) => {
					const isEmployee = !('discount' in promo);
					const name = isEmployee ? promo.name : promo.discount.name;
					const description = isEmployee ? promo.description : promo.discount.description;
					return (
						<DiscountBox
							key={index}
							title={name}
							description={description}
							onClick={() => openModal(promo)}
							isAuth={isAuth}
							role={role}
						/>
					);
				})}
			</div>
			<DiscountModal isOpen={isModalOpen} closeModal={closeModal} promoCode={selectedPromo} />
		</div>
	);
};

export default PartnerOfferContent;
