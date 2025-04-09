import { useState } from "react";
import FavoriteCategoriesSection from "../FavoriteCategoriesSection";
import StylishWidgetSection from "../StylishWidgetSection";
import "./style.css";
import { PromoCard } from "../promo-card/PromoCard";


function StylishShoppingSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <div className="beauty-health-container2">
      <FavoriteCategoriesSection 
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <div className="promo-card-container2">
        <PromoCard
          id={2}
          width={384} 
          height={246}
          heading= "Золотое Яблоко"
          discount="10"
          description= "Магазин косметики"
          imageUrl="/icons/home/golden-apple.svg"
        />
        <PromoCard 
          id={1}
          width={384} 
          height={246}
          heading= "Шоколадница"
          discount="15"
          description= "Сеть кофеен"
          imageUrl="/icons/home/chocolate.svg"
        />
        <PromoCard 
          id={3}
          width={384} 
          height={246}
          heading= "Рив Гош"
          discount="15"
          description= "Магазин косметики"
          imageUrl="/icons/home/cosmetic.svg"
        />
      </div>
      <StylishWidgetSection 
        selectedCategoryId={selectedCategoryId}
      />
    </div>
  );
}

export default StylishShoppingSection;
