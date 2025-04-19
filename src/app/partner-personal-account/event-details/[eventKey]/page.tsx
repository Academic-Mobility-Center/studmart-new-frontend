"use client";

import React from "react";
import { StatisticProvider } from "../../statistics/context";
import EventDetailsPageContent from "@/components/event-details-content/EventDetailsPageContent";

export default function EventDetailsPage() {
  return (
    <StatisticProvider>
      <EventDetailsPageContent />
    </StatisticProvider>
  );
}
