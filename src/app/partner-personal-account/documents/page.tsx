"use client"
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
const DocumentsPage = () => {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (role && role !== "Employee") {
            router.replace("/student-personal-account");
        }
    }, [role, router]);
    return (<></>)
}

export default DocumentsPage;