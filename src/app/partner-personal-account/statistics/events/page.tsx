"use client";
import { useStatistic, regionOptions, universityOptions } from "../context";
import StatisticEvents from "@/components/forms/statistics-form/StatisticEvents";

const EventsPage = () => {
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
