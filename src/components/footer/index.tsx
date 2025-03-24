import LogoSvg from "../../../public/icons/footer/LogoSvg";
import LogoTelegramSvg from "../../../public/icons/footer/LogoTelegramSvg";
import LogoVKSvg from "../../../public/icons/footer/LogoVKSvg";
import "./style.css";

function Footer() {
  return (
    <div className="contact-info-section1">
      <div className="contact-info-navigation-container">
        <div className="contact-info-section2">
          <LogoSvg className="image-container3" />
        </div>
        <div className="contact-info-section">
          <div className="contact-info-section3">
            <p className="contact-title-text-style">Контакты</p>
            <div className="contact-info-container">
              <a className="flex-row-with-text"
                // href="mailto:info@studmart.ru" 
                // className="email-link-style"
              >
                info@studmart.ru
              </a>
              <a className="flex-row-with-text">
                support@studmart.ru
              </a>
              <p className="flex-row-with-text">+7 (495) 147-10-69</p>
              <p className="flex-row-with-text">+7 919 944-43-78</p>

            </div>
            <div className="contact-info-container1">
              <div className="vertical-centered-image-container">
                <LogoVKSvg className="image-container1" />
              </div>
              <LogoTelegramSvg className="image-container2" />
            </div>
          </div>          
        </div>
        <div className="sidebar-navigation1">
          <div className="contact-info-section3">
            <p className="contact-title-text-style">Навигация</p>
            <div className="contact-info-container">
              <p className="flex-row-with-text">Главная страница</p>
              <p className="flex-row-with-text">О сервисе</p>
              <p className="flex-row-with-text">Партнерам</p>
              <p className="flex-row-with-text">Вход</p>
            </div>
          </div>
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

export default Footer;