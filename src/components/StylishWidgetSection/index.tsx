"use client";
import { Button } from "@mui/base";
import "./style.css";
import React, { useState } from 'react';
import { PromoCard } from "../promo-card/PromoCard";

function StylishWidgetCollection({ rows, renderPromoCardsRow }: { rows: number, renderPromoCardsRow: () => React.JSX.Element }) {
  const promoCardRows = [];
  for (let i = 0; i < rows; i++) {
    promoCardRows.push(
      <div key={i}>{renderPromoCardsRow()}</div>
    );
  }
  return (
    <>
      <div className="hierarchical-text-container">
        <div className="hierarchical-content-container">
          {promoCardRows}
        </div>
      </div>
    </>

  );
}

const renderPromoCardsRow = () => (
  <div className="promo-card-container">
    <PromoCard
      heading="Самокат"
      discount="10"
      description="Сервис доставки"
      imageUrl="/icons/home/delivery.svg"
    />
    <PromoCard
      heading="Шоколадница"
      discount="15"
      description="Сеть кофеен"
      imageUrl="/icons/home/chocolate.svg"
    />
    <PromoCard
      heading="Золотое яблоко"
      discount="10"
      description="Магазин косметики"
      imageUrl="/icons/home/golden-apple.svg"
    />
    <PromoCard
      heading="Рив Гош"
      discount="5"
      description="Магазин косметики"
      imageUrl="/icons/home/cosmetic.svg"
    />
  </div>
);

function StylishWidgetSection() {
  const [rows, setRows] = useState(4); 

  const addRow = () => {
    setRows(rows + 1);
  };

  return (
    <div className="vertical-center-column">
      <StylishWidgetCollection 
        rows={rows} 
        renderPromoCardsRow={renderPromoCardsRow}
      />
      <Button className="promo-button" onClick={addRow} disabled={rows === 7}>Посмотреть еще</Button>
    </div>
  );
}

export default StylishWidgetSection;
