"use client";
import NewHeader from "@/components/new-header/NewHeader";
import NewFooter from "@/components/new-footer/NewFooter";
import "./style.css"
import { useAuth } from "@/context/AuthContext";
import ServiceAudience from "@/components/ServiceAudience";
import About from "@/components/about";
import ImageGalleryWidget from "@/components/ImageGalleryWidget/ImageGalleryWidget";
import StylishShoppingSection from "@/components/StylishShoppingSection";
import { ClipLoader } from "react-spinners";

export default function Home() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div className="loader-container"> <ClipLoader size={50} color="#36d7b7" /> </div>;
    }
    return (
      <div className="main-content">
          <div className="content">
              <NewHeader isAuthenticated={isAuthenticated} />
              <div className="student-discount-portal">
                  <div className="exclusive-discounts-section">
                      <ImageGalleryWidget isAuthenticated={isAuthenticated}/>
                      <StylishShoppingSection />
                  </div>                    
                  {!isAuthenticated && (
                    <>
                      <ServiceAudience isAuthenticated={isAuthenticated}/>
                      <About isAuthenticated={isAuthenticated}/>
                    </>
                  )}
              </div>                
              <NewFooter isAuthenticated={isAuthenticated}/>
          </div>
      </div>
    );
}