import LogoTelegramSvg from "../../../public/icons/footer/LogoTelegramSvg";
import LogoVKSvg from "../../../public/icons/footer/LogoVKSvg";
import ContactInfoSection from "../ContactInfoSection";
import "./style.css";

function ContactSection() {
  return (
    <div className="contact-info-section3">
      <p className="contact-title-text-style">Контакты</p>
      <ContactInfoSection />
      <div className="contact-info-container1">
        <div className="vertical-centered-image-container">
          <LogoVKSvg className="image-container1" />
        </div>
        <LogoTelegramSvg className="image-container2" />
      </div>
    </div>
  );
}

export default ContactSection;
