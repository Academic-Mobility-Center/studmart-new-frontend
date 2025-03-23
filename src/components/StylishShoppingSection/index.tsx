import BrightStar from "../../../public/icons/ContentLayoutWidget/BrightStar";
import Star from "../../../public/icons/ContentLayoutWidget/Star";
import FavoriteCategoriesSection from "../FavoriteCategoriesSection";
// import GoldenAppleShop from "../MainSectionsShops/GoldenAppleShop";
// import ChocolateDiscount from "../MainSectionsShops/ChocolateDiscount";
// import CosmeticsDiscount from "../MainSectionsShops/CosmeticsDiscount";
// import StylishWidgetSection from "../StylishWidgetSection";
import "./style.css";
// import BrightStar from "../../icons/MainSectionShops/BrightStar"
// import Star from "../../icons/MainSectionShops/Star";

function StylishShoppingSection() {
  return (
    <div className="beauty-health-container2">
      <FavoriteCategoriesSection />
      <div className="promo-card-container2">
        <div className="flex-column-centered">
          
          <div className="flex-column-container">
            <BrightStar className="svg-container" />
          </div>
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container">
              <Star className="svg-container" />
          </div>
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container">
                <Star className="svg-container" />
          </div>
        </div>
      </div>
      {/* <div className="promo-card-container2">
        <div className="flex-column-centered">
          <div className="flex-column-container bg-1">
            <BrightStar className="svg-container" />
          </div>
          <GoldenAppleShop />
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container bg-2">
            <Star className="svg-container" />
          </div>
          <ChocolateDiscount />
        </div>
        <div className="flex-column-centered">
          <div className="flex-column-container bg-3">
            <Star className="svg-container" />
          </div>
          <CosmeticsDiscount />
        </div>
      </div>
      <StylishWidgetSection /> */}
    </div>
  );
}

export default StylishShoppingSection;
