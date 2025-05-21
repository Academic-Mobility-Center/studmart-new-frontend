import React, {useState, useEffect} from 'react';
import PromoCardsDescriprion from '../promo-card-description';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import {  
  getFavouritesPartners, 
  addToFavouritePartner, 
  deleteFavouritePartner
} from "@/lib/api/promocodes";
type PromoCardProps = {
  id: string;
  imageUrl: string;
  heading: string;
  description: string;
  discount: string;
  categoryId?: number;
  width?: number;
  height?: number;
};
type ApiResponse = {
  ignoredError?: boolean;
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
  interface FavouriteItem{
    id: string;
    companyName: string;
    subTitle: string;
    maxDiscount: string;
    isFixed: boolean;
    category: null;
  }
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);
  const userId = "81dd5999-455b-4eb2-af1d-15feb026655d";
  const handleClick = () => {
    router.prefetch(`/partner-offer/${id}`);
    router.push(`/partner-offer/${id}`);
  };
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favourites = await getFavouritesPartners(userId);
        const found = favourites.some((partner: FavouriteItem) => partner.id === id);
        setIsFavourite(found);
      } catch (error) {
        console.error("Ошибка при получении избранных партнёров:", error);
      }
    };

    fetchFavourites();
  }, [id]);
  const handleStarClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newValue = !isFavourite; // сохраняем целевое состояние
    setIsFavourite(newValue); // обновляем сразу для UI
  
    try {
      if (newValue) {
        const result: ApiResponse = await addToFavouritePartner(id, userId);
        if (result.ignoredError) {
          // игнорируем ошибку
        }
      } else {
        const result: ApiResponse = await deleteFavouritePartner(id, userId);
        if (result.ignoredError) {
          // игнорируем ошибку
        }
      }
    } catch (error) {
      console.error("Ошибка при обновлении избранного:", error);
      setIsFavourite(!newValue); // откат при ошибке
    }
  };
  
  return (
    <div
    className="flex-none rounded-[20px] border border-black/20 
    overflow-hidden box-border transition-transform duration-200 hover:scale-[1.02] cursor-pointer
    flex flex-col"
    style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleClick}
    >
      <StylishWrapper imageUrl={imageUrl} isFavourite={isFavourite} onStarClick={handleStarClick}/>
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
  isFavourite: boolean;
  onStarClick: (e: React.MouseEvent) => void;
};

const StylishWrapper: React.FC<StylishWrapperProps> = ({ imageUrl, isFavourite, onStarClick }) => {
  return (
<div
  className="w-full rounded-t-[20px] px-[10px] pt-[10px] flex justify-end items-start"
  style={{
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '125px',
    flex: '2 1 auto'
  }}
>
  {/* Обёртка фиксированного размера */}
  <div
    className="cursor-pointer"
    style={{
      width: 32,
      height: 32,
      flex: '0 0 auto', // Не даёт уменьшать элемент в flex-контейнере
    }}
    onClick={onStarClick}
  >
    {isFavourite ? <Image src="icons/home/yellowStar.svg" width={32} height={32} alt=''/> : <Image src="icons/home/whiteStar.svg" width={32} height={32} alt=''/>}
  </div>
</div>

  );
};

