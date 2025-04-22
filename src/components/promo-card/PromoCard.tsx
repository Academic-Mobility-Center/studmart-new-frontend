import React from 'react';
import PromoCardsDescriprion from '../promo-card-description';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
type PromoCardProps = {
  id: number;
  imageUrl: string;
  heading: string;
  description: string;
  discount: string;
  categoryId?: number;
  width?: number;
  height?: number;
};

export const PromoCard: React.FC<PromoCardProps> = ({
  imageUrl,
  heading,
  description,
  discount,
  id,
  width= 282,
  height = 203
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.prefetch(`/partner-offer/${id}`);
    router.push(`/partner-offer/${id}`);
  };
  return (
    <div
    className="flex-none rounded-[20px] border border-black/20 
    overflow-hidden box-border transition-transform duration-200 hover:scale-[1.02] cursor-pointer
    flex flex-col"
    style={{ width: `${width}px`, height: `${height}px` }}
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
      className="w-full rounded-t-[20px] px-[10px] pt-[10px] flex justify-end items-start"
      style={{ 
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '125px',
        flex: '2 1 auto',
      }}
    >
      <Image src="/icons/home/star.svg" alt="icon" className="w-8 h-8" />
    </div>
  );
};