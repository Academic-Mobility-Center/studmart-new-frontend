"use client";
import { Button } from "@mui/base";
import "./style.css";
import React, { useState } from 'react';
import { PromoCard } from "../promo-card/PromoCard";
interface StylishWidgetSectionProps {
  selectedCategoryId: number | null;
}

function StylishWidgetSection({ selectedCategoryId }: StylishWidgetSectionProps) {
  const [visibleRows, setVisibleRows] = useState(4);
  const cardsPerRow = 4;
  const initialVisibleCards = 16; 
  const [promoCardsData, setPromoCardsData] = useState([])
  // Сюда фетч запрос на карточки
  // useEffect(() => {},[])
  const [promoCards] = useState([
    {
      id: 1,
      heading: "Самокат",
      discount: "10",
      description: "Сервис доставки",
      imageUrl: "/icons/home/delivery.svg",
      categoryId: 3
    },
    {
      id: 2,
      heading: "Шоколадница",
      discount: "15",
      description: "Сеть кофеен",
      imageUrl: "/icons/home/chocolate.svg",
      categoryId: 3
    },
    {
      id: 3,
      heading: "Золотое яблоко",
      discount: "10",
      description: "Магазин косметики",
      imageUrl: "/icons/home/golden-apple.svg",
      categoryId: 2
    },
    {
      id: 4,
      heading: "Рив Гош",
      discount: "15",
      description: "Магазин косметики",
      imageUrl: "/icons/home/cosmetic.svg",
      categoryId: 2
    },
    {
      id: 5,
      heading: "Самокат",
      discount: "10",
      description: "Сервис доставки",
      imageUrl: "/icons/home/delivery.svg",
      categoryId: 3
    },
    {
      id: 6,
      heading: "Шоколадница",
      discount: "15",
      description: "Сеть кофеен",
      imageUrl: "/icons/home/chocolate.svg",
      categoryId: 3
    },
    {
      id: 7,
      heading: "Золотое яблоко",
      discount: "10",
      description: "Магазин косметики",
      imageUrl: "/icons/home/golden-apple.svg",
      categoryId: 2
    },
    {
      id: 8,
      heading: "Рив Гош",
      discount: "15",
      description: "Магазин косметики",
      imageUrl: "/icons/home/cosmetic.svg",
      categoryId: 2
    },
    {
      id: 9,
      heading: "Самокат",
      discount: "10",
      description: "Сервис доставки",
      imageUrl: "/icons/home/delivery.svg",
      categoryId: 3
    },
    {
      id: 10,
      heading: "Шоколадница",
      discount: "15",
      description: "Сеть кофеен",
      imageUrl: "/icons/home/chocolate.svg",
      categoryId: 3
    },
    {
      id: 11,
      heading: "Золотое яблоко",
      discount: "10",
      description: "Магазин косметики",
      imageUrl: "/icons/home/golden-apple.svg",
      categoryId: 2
    },
    {
      id: 12,
      heading: "Рив Гош",
      discount: "15",
      description: "Магазин косметики",
      imageUrl: "/icons/home/cosmetic.svg",
      categoryId: 2
    },
    {
      id: 13,
      heading: "Самокат",
      discount: "10",
      description: "Сервис доставки",
      imageUrl: "/icons/home/delivery.svg",
      categoryId: 3
    },
    {
      id: 14,
      heading: "Шоколадница",
      discount: "15",
      description: "Сеть кофеен",
      imageUrl: "/icons/home/chocolate.svg",
      categoryId: 3
    },
    {
      id: 15,
      heading: "Золотое яблоко",
      discount: "10",
      description: "Магазин косметики",
      imageUrl: "/icons/home/golden-apple.svg",
      categoryId: 2
    },
    {
      id: 16,
      heading: "Рив Гош",
      discount: "15",
      description: "Магазин косметики",
      imageUrl: "/icons/home/cosmetic.svg",
      categoryId: 2
    },
    {
      id: 17,
      heading: "Самокат",
      discount: "10",
      description: "Сервис доставки",
      imageUrl: "/icons/home/delivery.svg",
      categoryId: 3
    },
    {
      id: 18,
      heading: "Шоколадница",
      discount: "15",
      description: "Сеть кофеен",
      imageUrl: "/icons/home/chocolate.svg",
      categoryId: 3
    },
    {
      id: 19,
      heading: "Золотое яблоко",
      discount: "10",
      description: "Магазин косметики",
      imageUrl: "/icons/home/golden-apple.svg",
      categoryId: 2
    },
    {
      id: 20,
      heading: "Рив Гош",
      discount: "15",
      description: "Магазин косметики",
      imageUrl: "/icons/home/cosmetic.svg",
      categoryId: 2
    }
  ]);

  const filteredCards = selectedCategoryId !== null 
    ? promoCards.filter(card => card.categoryId === selectedCategoryId)
    : promoCards;

  const totalRows = Math.ceil(filteredCards.length / cardsPerRow);

  const showLoadMore = filteredCards.length > initialVisibleCards && 
                      visibleRows < totalRows;

  const renderPromoCardsRow = (cards: typeof promoCards) => (
    <div className="promo-card-container">
        {cards.map((card) => (
          <PromoCard
            id={card.id}
            key={card.id}
            imageUrl={card.imageUrl}
            heading={card.heading}
            description={card.description}
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
