import ContentLayoutWidget from "@/components/main-page/ContentLayoutWidget/ContentLayoutWidget"
import "./style.css"
import Header from "@/components/header/Header"
import PrivacyGuardian from "@/components/PrivacyGuardian"
import Footer from "@/components/footer"
export default function MainPage(){
    return(
        <div className="main-content">
            <div className="content">
                <Header/>
                <ContentLayoutWidget/>
                <Footer/>
                {/* <PrivacyGuardian/> */}
            </div>
        </div>
    )
};