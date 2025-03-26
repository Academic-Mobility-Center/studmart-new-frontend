import LoginForm from "../forms/login/LoginForm";
import NewHeader from "../new-header/NewHeader";
export default function AuthorizationPage(){
    return(
        <div className="min-w-[1600px] bg-[#f8f8f8] flex flex-col items-center h-screen">
            <NewHeader />
            <div className="flex flex-col items-center min-w-[1280px] pb-[105px]">
                <LoginForm />
            </div>
        </div>
    )
}