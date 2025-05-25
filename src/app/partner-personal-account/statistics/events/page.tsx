"use client";
import { useStatistic, regionOptions, universityOptions } from "../context";
import StatisticEvents from "@/components/forms/statistics-form/StatisticEvents";
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
const EventsPage = () => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "Employee") {
        router.replace("/student-personal-account");
    }
}, [role, router]);
const { formData, setFormData } = useStatistic();

  return (
    <StatisticEvents
      universityOptions={universityOptions}
      regionOptions={regionOptions}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default EventsPage;
