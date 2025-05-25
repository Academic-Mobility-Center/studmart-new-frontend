"use client";

import React from "react";
import { StatisticProvider } from "../../statistics/context";
import EventDetailsPageContent from "@/components/event-details-content/EventDetailsPageContent";
import {useAuth} from "@/context/AuthContext"
import {useRouter} from "next/navigation"
import {useEffect} from "react"
export default function EventDetailsPage() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "Employee") {
        router.replace("/student-personal-account");
    }
}, [role, router]);
  return (
    <StatisticProvider>
      <EventDetailsPageContent />
    </StatisticProvider>
  );
}
