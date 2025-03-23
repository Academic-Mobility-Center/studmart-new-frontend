import BrightStar from "../../../public/icons/ContentLayoutWidget/BrightStar";
import Star from "../../../public/icons/ContentLayoutWidget/Star";
import BigCategory from "../big-category";
import FavoriteCategoriesSection from "../FavoriteCategoriesSection";
import StylishWidgetSection from "../StylishWidgetSection";
import "./style.css";


function StylishShoppingSection() {
  return (
    <div className="beauty-health-container2">
      <FavoriteCategoriesSection />
      <div className="promo-card-container2">
        <div className="flex-column-centered">
          <div className="flex-column-container bg-svg-1">
            <BrightStar className="svg-container" />
          </div>
          <BigCategory 
            heading="Золотое Яблоко"
            description="Магазин косметики"
            discount="10"
          />
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container bg-svg-2">
              <Star className="svg-container" />
          </div>
          <BigCategory 
            heading="Шоколадница" 
            description="Сеть кофеен" 
            discount="15"
          />
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container bg-svg-3">
            <Star className="svg-container" />
          </div>
          <BigCategory
            heading="Рив Гош"
            description="Магазин косметики"
            discount="5"
          />
        </div>
      </div>
      <StylishWidgetSection/>
    </div>
  );
}

export default StylishShoppingSection;
