"use client"
import { useRouter } from "next/navigation";
import LoginForm from "../forms/login/LoginForm";
import NewHeader from "../new-header/NewHeader";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function AuthorizationPage(){
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.push('/');
      }
    }, [isAuthenticated, router]);
    if (isLoading || isAuthenticated) {
      return <div>Загрузка...</div>;
    }
    return(
        <div className="min-w-[1600px] bg-[#f8f8f8] flex flex-col items-center h-screen">
            <NewHeader isAuthenticated={isAuthenticated}/>
            <div className="flex flex-col items-center min-w-[1280px] pb-[105px]">
                <LoginForm />
            </div>
        </div>
    )
}