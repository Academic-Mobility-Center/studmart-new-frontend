import DynamicDisplayWidget from "@/components/DynamicDisplayWidget/DynamicDisplayWidget";
import ServiceAudience from "@/components/ServiceAudience";
import About from "@/components/about";
export default function ContentLayoutWidget() {
    return(
        <div className="student-discount-portal">
            <DynamicDisplayWidget/>
            <ServiceAudience/>
            <About/>
        </div>
    )
}