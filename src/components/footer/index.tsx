import LogoSvg from "../../../public/icons/footer/LogoSvg";
import NavigationSection from "../NavigationSection";
import LogoTelegramSvg from "../../../public/icons/footer/LogoTelegramSvg";
import LogoVKSvg from "../../../public/icons/footer/LogoVKSvg";
import ContactInfoSection from "../ContactInfoSection";
import "./style.css";

function Footer() {
  return (
    <div 
      className="contact-info-section1"
    >
      <div 
        className="contact-info-navigation-container"
      >
        <div 
          className="contact-info-section2"
        >
          <LogoSvg className="image-container3" />
        </div>
        <div 
          className="contact-info-section"
        >
          <div 
            className="contact-info-section3"
          >
            <p className="contact-title-text-style">Контакты</p>
            <ContactInfoSection />
            <div 
              className="contact-info-container1"
            >
              <div 
                className="vertical-centered-image-container"
              >
                <LogoVKSvg className="image-container1" />
              </div>
              <LogoTelegramSvg className="image-container2" />
            </div>
          </div>          
          {/* <ContactSection /> */}
        </div>
        <div 
          className="sidebar-navigation1"
        >
          <NavigationSection />
        </div>
      </div>
      <div 
        className="privacy-policy-section"
      >
        <p className="privacy-policy-heading">Политика конфиденциальности</p>
        <p className="privacy-policy-text">
          Политика управления
          <br />
          персональными данными и cookies
        </p>
      </div>
    </div>
  );
}

export default Footer;