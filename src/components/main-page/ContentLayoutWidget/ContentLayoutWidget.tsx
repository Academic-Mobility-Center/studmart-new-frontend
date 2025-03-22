import DynamicDisplayWidget from "@/components/DynamicDisplayWidget/DynamicDisplayWidget";
import ServiceAudience from "@/components/ServiceAudience";
export default function ContentLayoutWidget() {
    return(
        <div className="student-discount-portal">
            <DynamicDisplayWidget/>
            <ServiceAudience/>
        </div>
    )
}