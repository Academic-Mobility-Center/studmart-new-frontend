"use client";
import { Button } from "@mui/base";
import "./style.css";
import React, { useEffect, useState } from 'react';
import { PromoCard } from "../promo-card/PromoCard";
import { getPromocodePartners, getPromocodePartnersByRegionId } from "@/lib/api/promocodes";
import PromoCardType from "@/types/PromoCard";
import { transformPromos } from "@/app/home/context";
import { useCity } from "@/context/CityContext";
interface StylishWidgetSectionProps {
  selectedCategoryId: number | null;
}


function StylishWidgetSection({ selectedCategoryId }: StylishWidgetSectionProps) {
  const [visibleRows, setVisibleRows] = useState(4);
  const fixedCardsPerRow = 3;
  const regularCardsPerRow = 4;
  const initialVisibleCards = 16; 
  const {regionId} = useCity()
  console.log(regionId)
  const [partners, setPartners] = useState<PromoCardType[]>([])
  useEffect(() => {
    const fetchPromoCards = async () => {
      try {
        let promoCardsArray;
        
        if (regionId) {
          promoCardsArray = await getPromocodePartnersByRegionId(regionId);
        } else {
          promoCardsArray = await getPromocodePartners();
        }
  
        console.log("promoCardsArray", promoCardsArray);
        
        if (promoCardsArray) {
          const transformed = transformPromos(promoCardsArray);
          setPartners(transformed);
        } else {
          setPartners([]);
        }
      } catch (error) {
        console.error("Error fetching promocodes:", error);
        setPartners([]);
      }
    };
  
    fetchPromoCards();  
  }, [regionId]);
  const filteredCards = selectedCategoryId !== null 
  ? partners.filter(card => card.categoryId === selectedCategoryId)
  : partners;
  const fixedCards = filteredCards.filter(card => card.isFixed);
  const regularCards = filteredCards.filter(card => !card.isFixed);
  const totalRows = Math.ceil(regularCards.length / regularCardsPerRow);

  const showLoadMore = regularCards.length > initialVisibleCards && 
                      visibleRows < totalRows;

  const renderPromoCardsRow = (cards: PromoCardType[]) => (
    <div className="promo-card-container">
        {cards.map((card) => (
          <PromoCard
            id={card.id}
            key={card.id}
            imageUrl={`https://files.studmart-dev.inxan.ru/Partners/${card.id}`}
            heading={card.heading}
            description={card.subtitle}
            discount={card.discount}
            categoryId={card.categoryId}
          />
        ))}
    </div>
  );
  // const chunks = Array.from(
  //   { length: totalRows },
  //   (_, i) => filteredCards.slice(i * cardsPerRow, (i + 1) * cardsPerRow)
  // );
  const regularChunks = Array.from(
    { length: totalRows },
    (_, i) => regularCards.slice(i * regularCardsPerRow, (i + 1) * regularCardsPerRow)
  );

  const fixedChunks = Array.from(
    { length: Math.ceil(fixedCards.length / fixedCardsPerRow) },
    (_, i) => fixedCards.slice(i * fixedCardsPerRow, (i + 1) * fixedCardsPerRow)
  );
  
  const loadMore = () => {
    setVisibleRows(prev => prev + 1);
  };
  const renderFixedCards = (cards: PromoCardType[]) => (
    <div className="fixed-cards-row">
      {cards.map((card) => (
        <PromoCard
          id={card.id}
          key={`fixed-${card.id}`}
          width={384}
          height={246}
          heading={card.heading}
          description={card.subtitle}
          discount={card.discount}
          categoryId={card.categoryId}
          imageUrl={`https://files.studmart-dev.inxan.ru/Partners/${card.id}`}
        />
      ))}
    </div>
  );
  return (
    <>
          {fixedChunks.map((chunk, index) => (
        <div key={`fixed-chunk-${index}`} className="fixed-cards-container">
          {renderFixedCards(chunk)}
        </div>
      ))}
          {/* {fixedCards.length > 0 && (
        <div className="promo-card-container">
          {fixedCards.map((card) => (
            <PromoCard
              id={card.id}
              key={`fixed-${card.id}`}
              width={384}
              height={246}
              heading={card.heading}
              description={card.subtitle}
              discount={card.discount}
              categoryId={card.categoryId}
              imageUrl={`https://files.studmart-dev.inxan.ru/Partners/${card.id}`}
            />
          ))}
        </div>
          )} */}
          {/* <div className="promo-card-container2">
        <PromoCard
          id={"2"}
          width={384} 
          height={246}
          heading= "Золотое Яблоко"
          discount="10"
          description= "Магазин косметики"
          imageUrl="/icons/home/golden-apple.svg"
        />
        <PromoCard 
          id={"1"}
          width={384} 
          height={246}
          heading= "Шоколадница"
          discount="15"
          description= "Сеть кофеен"
          imageUrl="/icons/home/chocolate.svg"
        />
        <PromoCard 
          id={"3"}
          width={384} 
          height={246}
          heading= "Рив Гош"
          discount="15"
          description= "Магазин косметики"
          imageUrl="/icons/home/cosmetic.svg"
        />
      </div> */}
      <div className="vertical-center-column">
        <div className="hierarchical-text-container">
          <div className="hierarchical-content-container">
            {regularChunks.slice(0, visibleRows).map((chunk, i) => (
              <React.Fragment key={`chunk-${i}`}>
                {renderPromoCardsRow(chunk)}
              </React.Fragment>
            ))}
          </div>
        </div>
    
        {showLoadMore && (
          <Button 
            className="promo-button" 
            onClick={loadMore}
          >
            Посмотреть еще
          </Button>
        )}
      </div>
    </>

  );
}

export default StylishWidgetSection;
