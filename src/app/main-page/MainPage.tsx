import ContentLayoutWidget from "@/components/main-page/ContentLayoutWidget/ContentLayoutWidget"
import "./style.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
export default function MainPage(){
    return(
        <div className="main-content">
            <div className="content">
                <Header/>
                <ContentLayoutWidget/>
                <Footer/>
            </div>
        </div>
    )
};