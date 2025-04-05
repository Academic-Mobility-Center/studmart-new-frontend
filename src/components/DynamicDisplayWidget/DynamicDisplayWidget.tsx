import ImageGalleryWidget from "../ImageGalleryWidget/ImageGalleryWidget";
import StylishShoppingSection from "../StylishShoppingSection";
import "./style.css";

function DynamicDisplayWidget() {
  return (
    <div className="exclusive-discounts-section">
      <ImageGalleryWidget isAuthenticated/>
      <StylishShoppingSection />
    </div>
  );
}

export default DynamicDisplayWidget;
