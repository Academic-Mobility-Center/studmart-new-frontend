import { Button } from "@mui/base";
import LinesSvg from "../../../public/icons/ContentLayoutWidget/LinesSvg";
import SmileSvg from "../../../public/icons/ContentLayoutWidget/SmileSvg";
import "./style.css";

function ImageGalleryWidget() {
  return (
    <div className="student-discount-section">
      <div className="student-discount-offer-container">
        <div className="student-discount-offer-container1">
          <p className="exclusive-discount-message">
            Получай эксклюзивные скидки у партнеров,
            <br />
            ведь ты студент!
          </p>
          <Button className="exclusive-discount-button">Получить доступ</Button>
        </div>
      </div>
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
