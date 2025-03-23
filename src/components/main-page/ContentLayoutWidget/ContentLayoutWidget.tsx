import DynamicDisplayWidget from "@/components/DynamicDisplayWidget/DynamicDisplayWidget";
import MarketingContentBlock from "@/components/MarketingContentBlock";
import ServiceAudience from "@/components/ServiceAudience";
export default function ContentLayoutWidget() {
    return(
        <div className="student-discount-portal">
            <DynamicDisplayWidget/>
            <ServiceAudience/>
            <MarketingContentBlock/>
        </div>
    )
}