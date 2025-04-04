import React from 'react';
import PromoCardsDescriprion from '../promo-card-description';
import { useRouter } from 'next/navigation';
type PromoCardProps = {
  id: number;
  imageUrl: string;
  heading: string;
  description: string;
  discount: string;
  categoryId: number;
};

export const PromoCard: React.FC<PromoCardProps> = ({
  imageUrl,
  heading,
  description,
  discount,
  categoryId,
  id,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.prefetch(`/partner-offer/${id}`);
    router.push(`/partner-offer/${id}`);
  };
  return (
    <div
      className="flex-none w-[282px] h-[203px] 
      rounded-[20px] border border-black/20 
      overflow-hidden box-border transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
      onClick={handleClick}
    >
      <StylishWrapper imageUrl={imageUrl} />
      <PromoCardsDescriprion 
        heading={heading} 
        description={description} 
        discount={discount} 
      />
    </div>
  );
};

type StylishWrapperProps = {
  imageUrl: string;
};

const StylishWrapper: React.FC<StylishWrapperProps> = ({ imageUrl }) => {
  return (
    <div
      className="w-full h-[125px] rounded-t-[20px] px-[10px] pt-[10px] flex justify-end items-start"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <img src="/icons/home/star.svg" alt="icon" className="w-8 h-8" />
    </div>
  );
};