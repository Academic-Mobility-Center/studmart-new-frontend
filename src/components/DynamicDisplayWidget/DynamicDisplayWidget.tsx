import ImageGalleryWidget from "../ImageGalleryWidget/ImageGalleryWidget";
// import StylishShoppingSection from "../StylishShoppingSection";
import "./style.css";

function DynamicDisplayWidget() {
  return (
    <div className="exclusive-discounts-section">
      <ImageGalleryWidget />
      {/* <StylishShoppingSection /> */}
    </div>
  );
}

export default DynamicDisplayWidget;
