"use client";
import { useStatistic } from "../context";
import StatisticUsers from "@/components/forms/statistics-form/StatisticUsers";
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
const UsersPage = () => {

  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (role && role !== "Employee") {
          router.replace("/student-personal-account");
      }
  }, [role, router]);
  const { formData, setFormData } = useStatistic();

  return <StatisticUsers formData={formData} setFormData={setFormData} />;
};

export default UsersPage;