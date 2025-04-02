"use client";
import NewHeader from "@/components/new-header/NewHeader";
import ContentLayoutWidget from "@/components/main-page/ContentLayoutWidget/ContentLayoutWidget";
import NewFooter from "@/components/new-footer/NewFooter";
import "./style.css"
export default function Home() {
    return (
        <div className="main-content">
            <div className="content">
                <NewHeader/>
                <ContentLayoutWidget/>
                <NewFooter/>
            </div>
        </div>
    );
}