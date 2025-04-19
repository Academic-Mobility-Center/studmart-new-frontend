"use client";
import { useStatistic } from "../context";
import StatisticUsers from "@/components/forms/statistics-form/StatisticUsers";

const UsersPage = () => {
  const { formData, setFormData } = useStatistic();

  return <StatisticUsers formData={formData} setFormData={setFormData} />;
};

export default UsersPage;