import LogoSvg from "../../../public/icons/footer/LogoSvg";
import ContactSection from "../ContactSection";
import NavigationSection from "../NavigationSection";
import "./style.css";

function PrivacyGuardian() {
  return (
    <div className="contact-info-section1">
      <div className="contact-info-navigation-container">
        <div className="contact-info-section2">
          <LogoSvg className="image-container3" />
        </div>
        <div className="contact-info-section">
          <ContactSection />
        </div>
        <div className="sidebar-navigation1">
          <NavigationSection />
        </div>
      </div>
      <div className="privacy-policy-section">
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

export default PrivacyGuardian;
