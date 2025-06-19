'use client';

import { useEffect, useState } from 'react';

import { PartnerWithIdType } from '@/app/(partner)/partner-personal-account/context';
import Loader from '@/components/ui/Loader';

import {
	getPromocodeById,
	getPromocodeDiscountByDiscountIdAndStudentId,
	getPromocodePartnerByIdAndRegionId,
} from '@/lib/api/promocodes';

import { useAuth } from '@/context/AuthContext';
import { useCity } from '@/context/CityContext';
import PersonalPromocode from '@/types/PersonalPromocode';

import DiscountBox from './DiscountBox/DiscountBox';
import { DiscountModal } from './DiscountModal/DiscountModal';
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

	const [isLoadingPromocodes, setIsLoadingPromocodes] = useState(false);
	const [isLoadingPartner, setIsLoadingPartner] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoadingPartner(true);
			try {
				const partnerInfo = await getPromocodePartnerByIdAndRegionId(partnerId, regionId, id ?? '');
				setPartnerData(partnerInfo);
				setIsLoadingPartner(false);
			} catch (error) {
				console.log(error);
				setIsLoadingPartner(false);
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
			setIsLoadingPromocodes(true);
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
				setIsLoadingPromocodes(false);
			} catch (error) {
				console.error('Ошибка при получении промокодов:', error);
				setIsLoadingPromocodes(false);
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
	if (isLoadingPartner || isLoadingPromocodes) {
		return <Loader />;
	}
	return (
		<div className={styles['container']}>
			<PartnerInfo imageUrl={imageUrl} partnerId={partnerId} {...partnerData} />

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
			<DiscountModal isOpen={isModalOpen} closeModal={closeModal} promoCode={selectedPromo} />
		</div>
	);
};

export default PartnerOfferContent;
