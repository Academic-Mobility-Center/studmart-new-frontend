import { redirect } from "next/navigation";

export default function StatisticsIndexPage() {
  redirect("/partner-personal-account/statistics/users");
}