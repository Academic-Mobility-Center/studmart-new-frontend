import { useState } from "react";
import FavoriteCategoriesSection from "../FavoriteCategoriesSection";
import StylishWidgetSection from "../StylishWidgetSection";
import "./style.css";
// import { PromoCard } from "../promo-card/PromoCard";


function StylishShoppingSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <div className="beauty-health-container2">
      <FavoriteCategoriesSection 
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <StylishWidgetSection 
        selectedCategoryId={selectedCategoryId}
      />
    </div>
  );
}

export default StylishShoppingSection;
