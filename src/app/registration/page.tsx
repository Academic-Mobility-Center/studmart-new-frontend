import NewHeader from "@/components/new-header/NewHeader";
import RegistraionForm from "@/components/registration";

export default function Registraion(){
    return(
        <div className="min-w-[1600px] bg-[#f8f8f8] flex flex-col items-center h-screen">
            <NewHeader />
            <div className="flex flex-col items-center min-w-[1280px] pb-[105px]">
                <RegistraionForm/>
            </div>
        </div>
)
}