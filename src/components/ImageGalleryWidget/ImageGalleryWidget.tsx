import LinesSvg from "../../../public/icons/ContentLayoutWidget/LinesSvg";
import SmileSvg from "../../../public/icons/ContentLayoutWidget/SmileSvg";
import StudentDiscountBlock from "../StudentDiscountBlock/StudentDiscountBlock";
import "./style.css";

function ImageGalleryWidget() {
  return (
    <div className="student-discount-section">
      <StudentDiscountBlock />
      <div className="partner-discount-section">
          <SmileSvg className="image-container-outer" />
      </div>
      <div className="student-discount-offer">
          <LinesSvg className="image-container-style"/>
      </div>
    </div>
  );
}

export default ImageGalleryWidget;
