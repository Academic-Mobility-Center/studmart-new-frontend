"use client"
import { redirect } from "next/navigation";
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
export default function StatisticsIndexPage() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "Employee") {
        router.replace("/student-personal-account");
    }
}, [role, router]);
  redirect("/partner-personal-account/statistics/users");
}
