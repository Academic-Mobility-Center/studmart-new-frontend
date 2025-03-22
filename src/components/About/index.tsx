import Girl from "../../../public/icons/About/Girl"
import Layout from "../../../public/icons/About/Layout"
import "./style.css"

export default function About(){
    return(
        <div className="loyalty-program-info-container">
        <p className="loyalty-program-heading-style">Про Студмарт</p>
        <div className="loyalty-program-info-container1">
          {/* <LoyaltySystemPresentation /> */}
          <div className="image-container-flex-row">
            <Layout className="image-container"/>
            <Girl className="image-container-with-blend-mode"/>
          </div>
        </div>
      </div>
    )
}