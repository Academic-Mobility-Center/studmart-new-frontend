"use client";
import { Button } from "@mui/base";
import StylishWidgetCollection from "../StylishWidgetCollection";
import "./style.css";
import StylishService from "../PromoCardsContent/StylishService";
import FashionHub from "../PromoCardsContent/FashionHub";
import SweetTreatsPage from "../PromoCardsContent/SweetTreatsPage";
import StylishAppleMarket from "../PromoCardsContent/StylishAppleMarket";
import React, { useState } from 'react';

const renderPromoCardsRow = () => (
  <div className="promo-card-container">
    <StylishService />
    <SweetTreatsPage />
    <StylishAppleMarket />
    <FashionHub />
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
