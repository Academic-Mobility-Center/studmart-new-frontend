"use client";

import { redirect } from "next/navigation";

export default function AccountRootPage() {
  redirect("/student-personal-account/profile");
}