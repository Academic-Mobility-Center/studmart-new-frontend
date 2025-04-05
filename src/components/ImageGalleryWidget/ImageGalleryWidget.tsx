import { Button } from "@mui/base";
import LinesSvg from "../../../public/icons/ContentLayoutWidget/LinesSvg";
import SmileSvg from "../../../public/icons/ContentLayoutWidget/SmileSvg";
import "./style.css";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
interface Props {
  isAuthenticated: boolean;
}

function ImageGalleryWidget({isAuthenticated}: Props) {
  const { isAuthenticated: authStatus } = useAuth();

  return (
    <div className="student-discount-section">
      <div className="student-discount-offer-container">
        <div className="student-discount-offer-container1">
          <p className="exclusive-discount-message">
            Получай эксклюзивные скидки у партнеров,
            <br />
            ведь ты студент!
          </p>
          {/* <div className="button-container" style={{ height: authStatus ? '0' : 'auto' }}>
            {!authStatus && (
              <Link href="/registration" passHref>
                <Button 
                  className="exclusive-discount-button"
                  style={{ visibility: authStatus ? 'hidden' : 'visible' }}
                >
                  Получить доступ
                </Button>
              </Link>
            )}
          </div> */}
          <Link href={!isAuthenticated ? "#" : "registration"}>
            <Button className="exclusive-discount-button">Получить доступ</Button>
          </Link>
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
