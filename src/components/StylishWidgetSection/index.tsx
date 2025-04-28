"use client";
import { Button } from "@mui/base";
import "./style.css";
import React, { useEffect, useState } from 'react';
import { PromoCard } from "../promo-card/PromoCard";
import { getPromocodePartners } from "@/lib/api/promocodes";
import PromoCardType from "@/types/PromoCard";
import { transformPromos } from "@/app/home/context";
interface StylishWidgetSectionProps {
  selectedCategoryId: number | null;
}


function StylishWidgetSection({ selectedCategoryId }: StylishWidgetSectionProps) {
  const [visibleRows, setVisibleRows] = useState(4);
  const cardsPerRow = 4;
  const initialVisibleCards = 16; 

  const [partners, setPartners] = useState<PromoCardType[]>([])
  useEffect(() => {
    const fetchPromoCards = async () => {
      const promoCardsArray = await getPromocodePartners();
      console.log("promoCardsArray", promoCardsArray)
      if (promoCardsArray) {
        const transformed = transformPromos(promoCardsArray);
        setPartners(transformed);
      } else {
        setPartners([]);
      }
    };
    fetchPromoCards();  
  }, []);
  const filteredCards = selectedCategoryId !== null 
  ? partners.filter(card => card.categoryId === selectedCategoryId)
  : partners;
  const totalRows = Math.ceil(filteredCards.length / cardsPerRow);

  const showLoadMore = filteredCards.length > initialVisibleCards && 
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
  const chunks = Array.from(
    { length: totalRows },
    (_, i) => filteredCards.slice(i * cardsPerRow, (i + 1) * cardsPerRow)
  );

  const loadMore = () => {
    setVisibleRows(prev => prev + 1);
  };

  return (
    <div className="vertical-center-column">
    <div className="hierarchical-text-container">
      <div className="hierarchical-content-container">
        {chunks.slice(0, visibleRows).map((chunk, i) => (
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
  );
}

export default StylishWidgetSection;
