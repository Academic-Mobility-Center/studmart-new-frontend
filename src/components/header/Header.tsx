import "./style.css";
import StudmartIcon from "../../../public/icons/Header/StudmartIcon"
import LocationIcon from "../../../public/icons/Header/LocationIcon"
import AccountCircleIcon from "../../../public/icons/Header/AccounCircleIcon";
import BalanceWallet from "../../../public/icons/Header/BalanceWallet";
export default function Header(){
    return(
        <div className="green-header-container">
            <div className="sidebar-section">
                <StudmartIcon className="image-container5"/>
                {/* <img src="/assets/image_d8aa048d.png" alt="" className="image-container5" /> */}
            </div>
            <div className="sidebar-navigation">
                <div className="horizontal-menu-container">
                    <div className="vertical-centered-text-container">
                        <p className="heading-text-bold">Предложения</p>
                    </div>
                    <div className="vertical-centered-box">
                        <p className="heading-text-bold">О сервисе</p>
                    </div>
                    <div className="partner-section2">
                        <p className="heading-text-bold">Партнерам</p>
                    </div>
                </div>
            </div>
            <div className="location-bar">
                <div className="location-container">
                    <LocationIcon className="svg-container" />
                    <p className="regional-label-text-style">Тюменская обл.</p>
                </div>            
                <div className="search-container">
                    <p className="search-heading-text-style">Поиск</p>
                    <div className="search-divider" />
                </div>
                <AccountCircleIcon className="svg-container"/>
                <BalanceWallet className="svg-container2" />
            </div>
        </div>
    )
};